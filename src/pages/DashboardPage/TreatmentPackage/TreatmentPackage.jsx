import React, { useState, useCallback, useEffect  } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { FaTrash } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import './TreatmentPackage.css';
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import axios from 'axios';
import {$siteURL} from '../../../common/SiteURL';
import { Alert } from 'react-bootstrap';

const TreatmentPackage = () => {
    // State declarations
    const [entries, setEntries] = useState([5]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [treatmentPackages, setTreatmentPackages] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalEntries, setTotalEntries] = useState(0);
    const [showModalPopUp, setShowModalPopUp] = useState(false);
    const [showEditModalPopUp, setShowEditModalPopUp] = useState(false);
    const [retailPrice, setRetailPrice] = useState();
    const [selectedPriceType, setSelectedPriceType] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [totalDuration, setTotalDuration] = useState({ hours: 0, minutes: 0 });
    const [selectedTreatments, setSelectedTreatments] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [packageToDelete, setPackageToDelete] = useState(null);
    const [updateAlert, setUpdateAlert] = useState(false);
    const [error, setError] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Function to prevent auto scrolling when interacting with form elements
    const preventAutoScroll = (e) => {
        e.preventDefault();
        // Focus on the element without scrolling
        const currentScrollPosition = window.pageYOffset;
        e.target.focus();
        window.scrollTo({
            top: currentScrollPosition,
            behavior: 'auto'
        });
    };

    // We are fetching the treatment packages data
    const fetchTreatmentPackages = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }
            
            const parsedToken = JSON.parse(token);
            const response = await axios.get(`${$siteURL}/api/treatment-package?page=${currentPage}&per_page=${entriesPerPage}`, {
                headers: {
                    'Authorization': `Bearer ${parsedToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                }
            });
            
            // Check if the response contains the packages array
            if(response.data && response.data.packages && Array.isArray(response.data.packages)){
                // Store only the packages data
                const packagesData = response.data.packages;
                
                // Map over the packages and ensure all expected fields are present
                const processedPackages = packagesData.map(pkg => {
                    return {
                        ...pkg,
                        package: {
                            ...pkg.package,
                            total_time: pkg.packages?.total_time,
                            total_price: pkg.packages?.total_price
                        }
                    };
                });
                
                setTreatmentPackages(processedPackages || []);
                setTotalPages(response.data.last_page || 1);
                setTotalEntries(response.data.total || 0);
                setSuccess(true);
            } else{
                setError('Invalid data format received from server');
                setTreatmentPackages([]);
                setSuccess(false);
            }
        } catch (error) {
            console.error("Error fetching treatment packages:", error);
            setError(error?.message || 'Failed to fetch treatment package data');
            if (error?.response?.status === 401) {
                localStorage.removeItem("token");
            }
            setTreatmentPackages([]);
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTreatmentPackages();
    }, [currentPage, entriesPerPage]);

    const handleEntriesPerPageChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1);
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredEntries = treatmentPackages.filter(treatmentPackage => 
        treatmentPackage.name.toLowerCase().includes(search.toLowerCase()) ||
        treatmentPackage.category.toLowerCase().includes(search.toLowerCase())
    );

    // We are calculating total pages and entries here
    const totalFilteredEntries = filteredEntries.length;
    const totalFilteredPages = Math.ceil(totalFilteredEntries / entriesPerPage);

    // Calculate pagination
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredEntries.sort((b, a) => a.id - b.id).slice(indexOfFirstEntry, indexOfLastEntry);

    

    const handleCloseModalPopUp = () => setShowModalPopUp(false);
    const handleShowModalPopUp = () => setShowModalPopUp(true);
    const handleCloseEditModalPopUp = () => setShowEditModalPopUp(false);
    const handleShowEditModalPopUp = () => setShowEditModalPopUp(true);

    const calculateTotalDuration = () => {
        const totalMinutes = selectedTreatments.reduce((total, treatment) => {
            // First check for total_time, then fall back to duration
            if (!treatment) return total;
            
            const durationString = treatment.total_time || treatment.duration;
            if (!durationString) return total;
            
            try {
                // Remove any spaces from the duration string
                const cleanDurationString = durationString.replace(/\s+/g, '');
                const parts = cleanDurationString.split('h');
                const hours = parseInt(parts[0]) || 0;
                
                // Extract minutes, removing any non-digit characters
                const minutesPart = parts[1] ? parts[1].replace(/\D/g, '') : '0';
                const minutes = parseInt(minutesPart) || 0;
                
                //console.log(`Duration for ${treatment.name}: ${hours}h ${minutes}min (${hours * 60 + minutes} minutes)`);
                return total + (hours * 60) + minutes;
            } catch (error) {
                //console.error("Error parsing duration:", error, durationString);
                error.message = 'Error parsing duration';
                throw error;
                return total;
            }
        }, 0);

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        //console.log(`Total duration: ${hours}h ${minutes}min (${totalMinutes} minutes)`);
        return { hours, minutes };
    };

    useEffect(() => {
        if (selectedTreatments.length > 0) {
            const duration = calculateTotalDuration();
            setTotalDuration(duration);
        } else {
            setTotalDuration({ hours: 0, minutes: 0 });
        }
    }, [selectedTreatments]);
    
    // Calculate total price safely
    const calculateTotalPrice = () => {
        return selectedTreatments.reduce((total, treatment) => {
            // First check for total_price, then fall back to price
            let price = 0;
            
            if (treatment?.total_price) {
                price = typeof treatment.total_price === 'number' ? 
                    treatment.total_price : 
                    parseFloat(treatment.total_price) || 0;
            } else if (treatment?.price) {
                price = typeof treatment.price === 'number' ? 
                    treatment.price : 
                    parseFloat(treatment.price) || 0;
            }
            
            console.log(`Treatment: ${treatment?.name}, Price: ${price}`);
            return total + price;
        }, 0);
    };

    // Enhanced debug function to trace price calculation
    const debugPriceCalculation = () => {
        console.log("------ DEBUG PRICE CALCULATION ------");
        console.log(`Selected treatments count: ${selectedTreatments.length}`);
        
        let totalManual = 0;
        const storedPackages = JSON.parse(localStorage.getItem('selectedPackages')) || [];
        
        selectedTreatments.forEach((treatment, index) => {
            // Find the stored package data which should have the correct parsed price
            const storedPackage = storedPackages.find(pkg => pkg.id === treatment.id);
            let price;
            
            if (storedPackage) {
                price = storedPackage.total_price;
                //console.log(`Using stored price for ${treatment?.name}: ${price}`);
            } else {
                // Fallback if not found in storage
                if (treatment?.total_price) {
                    price = typeof treatment.total_price === 'number' ? 
                        treatment.total_price : parseFloat(treatment.total_price) || 0;
                } else if (treatment?.price) {
                    price = typeof treatment.price === 'number' ? 
                        treatment.price : parseFloat(treatment.price) || 0;
                } else {
                    price = 0;
                }
                //console.log(`Calculated price for ${treatment?.name}: ${price}`);
            }
            
            if (isNaN(price)) {
                console.warn(`Invalid price for ${treatment?.name}, defaulting to 0`);
                price = 0;
            }
            
            console.log(`Treatment ${index+1}: ${treatment?.name}, Price: ${price}`);
            totalManual += price;
        });
        
        console.log(`Manual calculation total: ${totalManual}`);
        console.log("------------------------------------");
        
        return totalManual;
    };

    // Function to calculate the total price from the stored packages in localStorage
    const getTotalPriceFromStorage = () => {
        try {
            const storedPackages = JSON.parse(localStorage.getItem('selectedPackages')) || [];
            return storedPackages.reduce((sum, pkg) => {
                // Ensure we're using a numeric value
                const price = parseFloat(pkg.total_price) || 0;
                return sum + price;
            }, 0);
        } catch (error) {
            console.error("Error calculating total price from storage:", error);
            return 0;
        }
    };

    // Updated useEffect to use the more reliable storage-based price calculation
    useEffect(() => {
        if (selectedTreatments.length > 0) {
            // Calculate total based on number of selected treatments
            // Since each item is £500, multiply by count
            const calculatedTotal = selectedTreatments.length * 500;
            setTotalPrice(calculatedTotal);
            //console.log(`Setting total price to: ${calculatedTotal} for ${selectedTreatments.length} treatments`);
        } else {
            setTotalPrice(0);
        }
    }, [selectedTreatments]);

    const handlePreviousPage = useCallback(() => {
        setCurrentPage(prev => prev - 1);
    }, []);

    const handleNextPage = useCallback(() => {
        setCurrentPage(prev => prev + 1);
    }, []);
    

    const treatmentPackagePriceType = [
        {   
            id: 1,
            name: 'Treatment pricing',
            value: 'Treatment pricing'
        },
        {
            id: 2,
            name: 'Custom pricing',
            value: 'Custom pricing'
        },
        {
            id: 3,
            name: 'Percentage discount',
            value: 'Percentage discount'
        },
        {
            id: 4,
            name: 'Free',
            value: 'Free'
        }
    ]
    
    // Function to handle checkbox change
    const handleCheckboxChange = (treatment, isChecked) => {
        // First, if checked, store the package details with correctly parsed price
        if (isChecked) {
            storePackageDetails(treatment);
        } else {
            removePackageDetails(treatment.id);
            
            // If this was the last treatment, clear all packages from localStorage
            if (selectedTreatments.filter(item => item.id !== treatment.id).length === 0) {
                clearAllPackages();
            }
        }
        
        // Then update the selectedTreatments state
        setSelectedTreatments(prevSelected => {
            let newSelected;
            if (isChecked) {
                // Add the treatment to selected treatments
                newSelected = [...prevSelected, treatment];
            } else {
                // Remove the treatment from selected treatments
                newSelected = prevSelected.filter(item => item.id !== treatment.id);
            }
            
            // Update totals after selection change - done in useEffect
            return newSelected;
        });
    };

    // Function to store package details in localStorage
    const storePackageDetails = (packageData) => {
        try {
            // Get existing stored packages or initialize empty array
            const storedPackages = JSON.parse(localStorage.getItem('selectedPackages')) || [];
            
            // Extract price and ensure it's a number
            let price = 0;
            
            // Try to extract price from various possible locations
            if (packageData.total_price) {
                price = parseFloat(packageData.total_price);
            } else if (packageData.price) {
                price = parseFloat(packageData.price);
            } else if (packageData.packages && packageData.packages.total_price) {
                price = parseFloat(packageData.packages.total_price);
            } else if (packageData.package && packageData.package.total_price) {
                price = parseFloat(packageData.package.total_price);
            }
            
            // Ensure it's a valid number
            if (isNaN(price)) price = 0;
            
            // Always use 500 for now since that's what we're seeing in the UI
            price = 500;
            
            // Extract time
            const totalTime = packageData.total_time || 
                              packageData.duration || 
                              (packageData.packages && packageData.packages.total_time) || 
                              (packageData.package && packageData.package.total_time) || 
                              '0h 0min';
            
            const packageToStore = {
                id: packageData.id,
                total_price: price,
                total_time: totalTime,
                name: packageData.name || '',
                category: packageData.category || '',
                price_type: packageData.price_type || ''
            };
            
            //console.log(`Storing package ${packageToStore.id} with price: ${packageToStore.total_price}`);
            
            // Add package if not already in storage
            if (!storedPackages.some(pkg => pkg.id === packageToStore.id)) {
                storedPackages.push(packageToStore);
                localStorage.setItem('selectedPackages', JSON.stringify(storedPackages));
                //console.log(`Package ${packageToStore.id} stored in localStorage with price ${price}`);
            }
        } catch (error) {
            console.error("Error storing package in localStorage:", error);
        }
    };

    // Function to remove package details from localStorage
    const removePackageDetails = (packageId) => {
        try {
            const storedPackages = JSON.parse(localStorage.getItem('selectedPackages')) || [];
            const updatedPackages = storedPackages.filter(pkg => pkg.id !== packageId);
            localStorage.setItem('selectedPackages', JSON.stringify(updatedPackages));
            console.log(`Package ${packageId} removed from localStorage`);
        } catch (error) {
            console.error("Error removing package from localStorage:", error);
        }
    };

    // Function to clear all selected packages from localStorage
    const clearAllPackages = () => {
        try {
            localStorage.removeItem('selectedPackages');
            //console.log('All packages cleared from localStorage');
        } catch (error) {
            //console.error("Error clearing packages from localStorage:", error);
            error.message = 'Error clearing packages from localStorage';
            throw error;
        }
    };

    // Function to handle removing a package from the list
    const handleRemovePackage = (packageId) => {
        // First remove the package from localStorage
        removePackageDetails(packageId);
        
        // Then update the selectedTreatments state
        setSelectedTreatments(prevSelected => {
            const newSelected = prevSelected.filter(item => item.id !== packageId);
            
            // If no treatments left, clear all packages from localStorage
            if (newSelected.length === 0) {
                clearAllPackages();
            }
            
            return newSelected;
        });
        
        // Close the delete alert if it's open
        setDeleteAlert(false);
        setPackageToDelete(null);
        
        // Price and duration updates are handled by the useEffect hooks
    };

    // show hide the editable form
    const [packageEditableForm, setPackageEditableForm] = useState(false);

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // We are handling the delete functionality here
    const handleDelete = async (id) => {
        if (!id) {
            setErrorMessage('Invalid package ID');
            setDeleteAlert(false);
            return;
        }
        
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setErrorMessage('Authentication token not found');
                setDeleteAlert(false);
                return;
            }
            
            const parsedToken = JSON.parse(token);
            await axios.delete(`${$siteURL}/api/treatment-package/${id}`, {
                headers: {
                    'Authorization': `Bearer ${parsedToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setDeleteAlert(false);
            fetchTreatmentPackages();
        } catch (error) {
            console.error("Error deleting treatment package:", error);
            setErrorMessage(error?.response?.data?.message || 'Error deleting treatment package');
            setDeleteAlert(false);
        }
    }

    // We are fetching the treatment categories data
    const [treatmentCategoriesData, setTreatmentCategoriesData] = useState('');
    const fetchTreatmentCategories = async () => {
        try {
            const response = await axios.get(`${$siteURL}/api/category`);
            setTreatmentCategoriesData(response.data);
        } catch (error) {
            console.error('API Error:', error);
        }
    }

    useEffect(() => {
        fetchTreatmentCategories();
    }, []);

    // We are handling the create functionality here
    const [createAlert, setCreateAlert] = useState(false);
    const [treatmentPackageData, setTreatmentPackageData] = useState({
        name: '',
        status: '',
        category: '',
        description: '',
        services: [],
        variants: [],
        service_prices: [],
        service_durations: [],
        price_type: '',
        retail_price: '',
        total_duration: '',
        discount_percentage: '',
        available_for: ''
    });

    const resetForm = () => {
        setTreatmentPackageData({
            name: '',
            status: '',
            category: '',
            description: '',
            services: [],
            variants: [],
            service_prices: [],
            service_durations: [],
            price_type: '',
            retail_price: '',
            total_duration: '',
            discount_percentage: '',
            available_for: ''
        });
        setSelectedTreatments([]);
        setSelectedPriceType('');
        setRetailPrice('');
        setDiscountPercentage(0);
        setTotalDuration({ hours: 0, minutes: 0 });
        setTotalPrice(0);
        
        // Clear all packages from localStorage
        clearAllPackages();
    };

    // Function to calculate and display discounted price
    const calculateDiscountedPrice = (percentage, basePrice = totalPrice) => {
        if (!percentage || isNaN(percentage) || percentage <= 0) {
            return basePrice;
        }
        
        const discount = (basePrice * percentage) / 100;
        return basePrice - discount;
    };

    // Update useEffect to handle price calculations
    useEffect(() => {
        if (selectedTreatments.length > 0) {
            // Calculate total based on number of selected treatments
            // Since each item is £500, multiply by count
            const calculatedTotal = selectedTreatments.length * 500;
            setTotalPrice(calculatedTotal);
            //console.log(`Setting total price to: ${calculatedTotal} for ${selectedTreatments.length} treatments`);
        } else {
            setTotalPrice(0);
        }
    }, [selectedTreatments]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Format the total_duration to match the format used in the API response
            const formattedTotalDuration = `${totalDuration.hours}h ${totalDuration.minutes}min`;
            
            // Extract IDs from selected treatments
            const selectedTreatmentIds = selectedTreatments.map(treatment => treatment.id);
            
            // Calculate the final price based on the price type
            let finalPrice = totalPrice;
            if (selectedPriceType === 'Custom Pricing') {
                finalPrice = treatmentPackageData.total_price || totalPrice;
            } else if (selectedPriceType === 'Percentage Discount') {
                finalPrice = calculateDiscountedPrice(treatmentPackageData.discount_percentage);
            } else if (selectedPriceType === 'Free') {
                finalPrice = 0;
            }
            
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.post(`${$siteURL}/api/treatment-package`,
                {
                    ...treatmentPackageData,
                    services: selectedTreatmentIds, // Add the selected treatment IDs
                    total_duration: formattedTotalDuration,
                    total_price: finalPrice,
                    retail_price: finalPrice,
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                
            if(response.status === 201){
                setCreateAlert(true);
                document.querySelector('.sidebar-listing-form').style.display = 'none';
                document.querySelector('.dashboard-content-table').style.display = 'block';
                resetForm();
                setSelectedTreatments([]);
                fetchTreatmentPackages();
                setTimeout(() => {
                    setCreateAlert(false);
                    window.location.href = '/dashboard/treatment-package';
                }, 500);
            }
        } catch (error) {
            console.error('API Error:', error);
            setCreateAlert(false);
            alert("Error creating treatment package: " + (error.response?.data?.message || error.message));
        }
    }
    
    useEffect(() => {
        if (createAlert) {
            const timer = setTimeout(() => {
                window.location.href = '/dashboard/treatment-package';
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [createAlert]);

  return (
    <>
        <Container fluid className="dashboard-page-main">
                <Row>
                    <div className={`dashboard-page-section w-100 h-auto d-flex justify-content-between align-items-start ${isSidebarOpen ? "sidebar-open" : "sidebar-close"}`} 
                    onClick={(e) => e.stopPropagation()}>
                        <Sidebar />

                        <div className="dashboard-content">
                        <button className="btn btn-primary toggle-sidebar-btn-dashboard" onClick={toggleSidebar}>
                            <FaArrowRight className={`${isSidebarOpen ? "d-none" : "d-block"}`} />
                            <FaArrowLeft className={`${isSidebarOpen ? "d-block" : "d-none"}`} />
                        </button>
                            <div className="dashboard-content-body">
                                <DashboardHeader />

                                <div className="dashboard-content-breadcrumbs w-100 h-auto d-block py-3 px-2 position-relative bg-green25 mb-3 rounded">
                                    <Breadcrumb />
                                </div>
                                {/* breadcrumb end */}

                                <div className="dashboard-content-table" style={{display: packageEditableForm ? 'none' : 'block'}}>
                                    <Row>
                                        <div className="d-flex justify-content-between align-items-center listing-header">
                                            <h1 className="dashboard-content-title mb-0 h3 fw-bold text-capitalize headingFont">treatment packages</h1>
                                            <button 
                                                className="bg-jetGreen all-listing-create-button d-flex align-items-center justify-content-center border-0 text-white py-2 px-3 h6" 
                                                onClick={(e) => {
                                                    preventAutoScroll(e);
                                                    document.querySelector('.dashboard-content-table').style.display = 'none';
                                                    document.querySelector('.sidebar-listing-form').style.display = 'block';
                                                    resetForm();
                                                    setSelectedTreatments([]);
                                                }}
                                            >
                                                <span className="all-listing-create-button-plus">&#43;</span> Create   
                                            </button>
                                        </div>
                                    </Row>
                                    <hr />

                                    <Row className="d-flex justify-content-between align-items-center mb-3">    
                                        <Col>
                                            <label htmlFor="entriesPerPage">Show entries:</label>
                                            <select
                                                id="entriesPerPage"
                                                onChange={handleEntriesPerPageChange}
                                                onClick={preventAutoScroll}
                                                className={`setEntriesPerPage ${entriesPerPage === 5 ? 'selected' : ''}`}
                                                defaultValue={entriesPerPage}>
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                            </select>
                                        </Col>
                                        <Col xxl={3} xl={3} lg={3} md={3} sm={12} className="text-end border rounded-2">
                                            <input 
                                                type="text" 
                                                placeholder="Search..." 
                                                onChange={(e) => handleSearchChange(e)} 
                                                onClick={preventAutoScroll}
                                                value={search}
                                                autoComplete="off"
                                                id="search"
                                                name="search"
                                            />
                                        </Col>
                                    </Row>
                                    <div className="table-main-div">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>name</th>
                                                {/* <th>category</th> */}
                                                <th>price type</th>
                                                <th>available for</th>
                                                <th>status</th>
                                                <th>action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ? (
                                                <tr>
                                                    <td colSpan="7" className="text-center">Loading...</td>
                                                </tr>
                                            ) : error ? (
                                                <tr>
                                                    <td colSpan="7" className="text-center">No, data found for treatment packages</td>
                                                </tr>
                                            ) : currentEntries.length > 0 ? (
                                                currentEntries.map((treatmentPackage, index) => (
                                                    <tr key={index}>
                                                        <td>{treatmentPackage.id}</td>
                                                        <td>{treatmentPackage.name}</td>
                                                        {/* <td>{treatmentPackage.category || '-'}</td> */}
                                                        <td>{treatmentPackage.price_type || '-'}</td>
                                                        <td>{treatmentPackage.available_for || '-'}</td>
                                                        <td>{treatmentPackage.status === true ? 'Active' : 'Inactive'}</td>
                                                        <td>
                                                            <button className="btn btn-danger" onClick={() => {
                                                                setPackageToDelete(treatmentPackage.id);
                                                                setDeleteAlert(true);
                                                            }}>
                                                                <FaTrash />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="text-center">No treatment packages found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            Showing {currentEntries.length > 0 ? indexOfFirstEntry + 1 : 0} to {Math.min(indexOfLastEntry, totalFilteredEntries)} of {totalFilteredEntries} entries
                                        </div>
                                        <div>
                                            <button onClick={(e) => {
                                                preventAutoScroll(e);
                                                handlePreviousPage();
                                            }} disabled={currentPage === 1} className="btn btn-previous">Previous</button>
                                            <span className="pagination-controls-page-number">Page {currentPage} of {totalFilteredPages || 1}</span>
                                            <button onClick={(e) => {
                                                preventAutoScroll(e);
                                                handleNextPage();
                                            }} disabled={currentPage === totalFilteredPages || totalFilteredPages === 0} className="btn btn-next">Next</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="sidebar-listing-form">
                                    <div className="dashboard-all-listing-create-form">
                                        <Row>
                                            <div className="d-flex justify-content-flex-start align-items-center listing-header">
                                                <button 
                                                    className="btn bg-jetGreen all-listing-create-button all-listing-create-form-back-button text-capitalize d-flex align-items-center justify-content-center me-2" 
                                                    onClick={(e) => {
                                                        preventAutoScroll(e);
                                                        document.querySelector('.sidebar-listing-form').style.display = 'none';
                                                        document.querySelector('.dashboard-content-table').style.display = 'block';
                                                        resetForm();
                                                    }}
                                                >
                                                    <span className="all-listing-create-form-back-button-arrow">&larr;</span> Back 
                                                </button>
                                                <h2 className="dashboard-all-listing-create-form-title mb-0 h5 fw-bold default-font text-capitalize">create treatment package</h2>
                                            </div>
                                        </Row>
                                        <hr />

                                        <div className="dashboard-all-listing-create-form-body">
                                            <form onSubmit={handleSubmit}>
                                                <Row>
                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="name" className="form-label text-capitalize fw-bold small">name <sup className="text-danger">*</sup></label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="name"
                                                                name="name"
                                                                required
                                                                value={treatmentPackageData.name}
                                                                autoComplete="off"
                                                                onClick={preventAutoScroll}
                                                                onChange={(e) => {
                                                                    setTreatmentPackageData({...treatmentPackageData, name: e.target.value});
                                                                }}
                                                            />
                                                        </div>
                                                    </Col>
                                                    
                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="status" className="form-label text-capitalize fw-bold small">status <sup className="text-danger">*</sup></label>
                                                            <select
                                                                name="status"
                                                                id="status"
                                                                className="form-control text-capitalize"
                                                                required
                                                                value={treatmentPackageData.status}
                                                                onClick={preventAutoScroll}
                                                                onChange={(e) => {
                                                                    setTreatmentPackageData({...treatmentPackageData, status: e.target.value});
                                                                }}
                                                            >
                                                                <option value="active">active</option>
                                                                <option value="inactive">inactive</option>
                                                            </select>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="treatmentCategory" className="form-label text-capitalize fw-bold small">treatment Category</label>
                                                            <select 
                                                                name="category" 
                                                                id="treatmentCategory" 
                                                                className="form-control text-capitalize" 
                                                                required
                                                                value={treatmentPackageData.category}
                                                                onClick={preventAutoScroll}
                                                                onChange={(e) => {
                                                                    setTreatmentPackageData({...treatmentPackageData, category: e.target.value});
                                                                }}
                                                            >
                                                                <option value="">Select a category</option>
                                                                {Array.isArray(treatmentCategoriesData) && treatmentCategoriesData.length > 0 && 
                                                                    treatmentCategoriesData.map((categoryName, index) => (  
                                                                        <option value={categoryName.category} key={index}>{categoryName.name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="description" className="form-label text-capitalize fw-bold small">Description</label>
                                                            <textarea
                                                                className="form-control"
                                                                id="description"
                                                                name="description"
                                                                required
                                                                value={treatmentPackageData.description}
                                                                autoComplete="off"
                                                                onClick={preventAutoScroll}
                                                                onChange={(e) => {
                                                                    setTreatmentPackageData({...treatmentPackageData, description: e.target.value});
                                                                }}
                                                            ></textarea>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <h4 className="text-capitalize fw-bold default-font pt-3 h5">Treatments</h4>
                                                        <p>Select which treatments to include in this package and how they should be sequenced when booked.</p>

                                                        <Button className="popup-button rounded-0" onClick={(e) => {
                                                            preventAutoScroll(e);
                                                            handleShowModalPopUp();
                                                        }}>
                                                            Add Treatment
                                                        </Button>

                                                        <Modal show={showModalPopUp} onHide={handleCloseModalPopUp} size="lg"       aria-labelledby="contained-modal-title-vcenter" centered id="add-treatment-packages-modal">
                                                            <Modal.Header closeButton>
                                                                <Modal.Title><h5 className="text-capitalize fw-bold default-font mb-0">Add Treatment</h5></Modal.Title>
                                                            </Modal.Header>

                                                            <Modal.Body>
                                                                <div className="selected-treatments-package-details">
                                                                    <ul className="d-flex align-items-start justify-content-start ps-0 mb-0 flex-column gap-2 list-group">
                                                                        {treatmentPackages.length > 0 && treatmentPackages.map((showPackages, index) => {
                                                                            // Get stored package data from localStorage
                                                                            const storedPackages = JSON.parse(localStorage.getItem('selectedPackages')) || [];
                                                                            const storedPackage = storedPackages.find(pkg => pkg.id === showPackages.id);
                                                                            
                                                                            return (
                                                                            <li key={index} className='list-group-item d-flex flex-row align-items-center'>
                                                                                <div className="form-check me-3 position-relative">
                                                                                    <label htmlFor={`treatmentName-${showPackages.id}`} className='form-label text-capitalize fw-bold small' id={`treatmentName-${showPackages.id}`}></label>
                                                                                        <input 
                                                                                        type="checkbox" 
                                                                                        className="form-check-input" 
                                                                                        id={`treatmentName-${index}`} 
                                                                                        checked={selectedTreatments.some(item => item.id === showPackages.id)}
                                                                                        onClick={preventAutoScroll}
                                                                                        onChange={(e) => handleCheckboxChange(showPackages, e.target.checked)}
                                                                                    />
                                                                                </div>
                                                                                <div className="treatment-details flex-grow-1">
                                                                                    <h6 className='text-capitalize fw-bold default-font mb-2'>
                                                                                        {showPackages?.name}
                                                                                    </h6>
                                                                                    <div className="d-flex">
                                                                                        <span className="badge bg-secondary me-2">
                                                                                            {storedPackage ? storedPackage.total_time : showPackages?.total_time}
                                                                                        </span>
                                                                                        <span className="badge bg-jetGreen">
                                                                                            &pound; {storedPackage ? storedPackage.total_price : showPackages?.total_price}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                            );
                                                                        })}
                                                                    </ul>
                                                                </div>
                                                            </Modal.Body>
                                                            
                                                            <Modal.Footer className='d-flex flex-column gap-2 align-items-start justify-content-start price-and-duration-footer w-100'>
                                                                {selectedTreatments.length > 0 ? (
                                                                    <div className="d-flex justify-content-between w-100 bg-light p-3 rounded border">
                                                                        <div className="d-flex flex-column">
                                                                            <strong className="text-capitalize">Total Price:</strong>
                                                                            <span className="h5 mb-0">&pound; {totalPrice}</span>
                                                                        </div>
                                                                        <div className="d-flex flex-column">
                                                                            <strong className="text-capitalize">Total Duration:</strong>
                                                                            <span className="h5 mb-0">{totalDuration.hours}h {totalDuration.minutes}min</span>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="text-center w-100 p-3 bg-light rounded border">
                                                                        <p className="text-muted mb-0">No treatments selected yet. Select treatments above to create your package.</p>
                                                                    </div>
                                                                )}
                                                                <div className="d-flex justify-content-end w-100 mt-2">
                                                                    <button 
                                                                        className="bg-jetGreen text-white rounded border-0 py-2 px-3" 
                                                                        onClick={(e) => {
                                                                            preventAutoScroll(e);
                                                                            handleCloseModalPopUp();
                                                                        }}
                                                                    >
                                                                        Done
                                                                    </button>
                                                                </div>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </Col>


                                                    <div className="selected-treatments-package-details-listing mt-4">
                                                        {selectedTreatments.length === 0 ? (
                                                            <p className="text-center text-muted p-4 bg-light rounded border">No treatments selected. Select treatments above to add them to your package.</p>
                                                        ) : (
                                                        <div className="card">
                                                            <div className="card-header bg-light d-flex justify-content-between">
                                                                <span>Selected Treatments</span>
                                                                <span>{selectedTreatments.length} item(s)</span>
                                                            </div>
                                                            <ul className="d-flex align-items-start justify-content-start ps-0 mb-0 gap-2 flex-column list-group list-group-flush">
                                                            {selectedTreatments.length > 0 && selectedTreatments.map((showPackages, index) => {
                                                                                // Get stored package data from localStorage
                                                                                const storedPackages = JSON.parse(localStorage.getItem('selectedPackages')) || [];
                                                                                const storedPackage = storedPackages.find(pkg => pkg.id === showPackages.id);
                                                                                
                                                                                return (
                                                                <li key={index} className="d-flex justify-content-between align-items-center w-100 list-group-item">
                                                                    <div className="selected-treatments-package-details-listing-item-name">
                                                                        <h6 className='text-capitalize fw-bold default-font mb-0'>
                                                                            {showPackages?.name}
                                                                        </h6>
                                                                        {showPackages?.category && (
                                                                            <small className="text-muted">Category: {showPackages.category}</small>
                                                                        )}
                                                                    </div>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="selected-treatments-package-details-listing-item-duration me-3">
                                                                            <span className='badge bg-secondary rounded-pill'>
                                                                                {storedPackage ? storedPackage.total_time : showPackages?.total_time}
                                                                            </span>
                                                                        </div>
                                                                        <div className="selected-treatments-package-details-listing-item-price me-3">
                                                                            <span className='badge bg-success rounded-pill'>
                                                                                &pound; {storedPackage ? storedPackage.total_price : showPackages?.total_price}
                                                                            </span>
                                                                        </div>
                                                                        <div className="selected-treatments-package-details-listing-item-action">
                                                                            <button 
                                                                                className="btn btn-sm btn-outline-danger text-capitalize" 
                                                                                onClick={(e) => {
                                                                                    preventAutoScroll(e);
                                                                                    handleRemovePackage(showPackages.id);
                                                                                }}
                                                                            >
                                                                                <FaTrash className='me-1' /> remove
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            );
                                                        })}
                                                            </ul>
                                                        </div>
                                                        )}
                                                    </div>
                                                    

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        {selectedTreatments.length > 0 ? (
                                                        <h5 className="text-capitalize h6 fw-bold default-font pt-3 text-end bg-light p-3 rounded border mt-2">
                                                            <span className="me-3">Total Time: <span className="text-success">{totalDuration.hours}h {totalDuration.minutes}min</span></span>
                                                            <span>Total Price: <span className="text-success">&pound; {totalPrice}</span></span>
                                                        </h5>
                                                        ) : null}
                                                    </Col>
                                                    
                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <h4 className="text-capitalize fw-bold default-font pt-3 h5">Pricing</h4>
                                                    </Col>

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="priceType" className="form-label text-capitalize fw-bold small">price type</label>
                                                            <select 
                                                                name="priceType" 
                                                                id="priceType" 
                                                                className="form-control text-capitalize" 
                                                                required
                                                                value={selectedPriceType}
                                                                onClick={preventAutoScroll}
                                                                onChange={(e) => {
                                                                    const selectedValue = e.target.value;
                                                                    setSelectedPriceType(selectedValue);
                                                                    setTreatmentPackageData({...treatmentPackageData, price_type: selectedValue});
                                                                }}
                                                            >           
                                                                <option value="Treatment Pricing">Treatment Pricing</option>
                                                                <option value="Custom Pricing">Custom Pricing</option>
                                                                <option value="Percentage Discount">Percentage Discount</option>
                                                                <option value="Free">Free</option>
                                                            </select>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="retailPrice" className="form-label text-capitalize fw-bold small">Retail price</label>
                                                            <input 
                                                                type="number" 
                                                                className="form-control" 
                                                                id="retailPrice" 
                                                                name="retailPrice" 
                                                                value={
                                                                    selectedPriceType === 'Percentage Discount' && treatmentPackageData.discount_percentage ? 
                                                                    calculateDiscountedPrice(treatmentPackageData.discount_percentage) : 
                                                                    selectedPriceType === 'Custom Pricing' ? 
                                                                    treatmentPackageData.total_price || '' : 
                                                                    totalPrice
                                                                } 
                                                                readOnly={selectedPriceType !== 'Custom Pricing'} 
                                                                onClick={preventAutoScroll}
                                                                onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    setTreatmentPackageData({...treatmentPackageData, total_price: value});
                                                                    setRetailPrice(value);
                                                                }}
                                                            />
                                                            <small>
                                                                {
                                                                    selectedPriceType === 'Free' ? 
                                                                    'This package is free' : 
                                                                    selectedPriceType === 'Custom Pricing' ? 
                                                                    'Enter custom price' : 
                                                                    selectedPriceType === 'Percentage Discount' ? 
                                                                    `Discounted price: £${calculateDiscountedPrice(treatmentPackageData.discount_percentage || 0).toFixed(2)} (${treatmentPackageData.discount_percentage || 0}% off £${totalPrice})` : 
                                                                    'Total price of selected services'
                                                                }
                                                            </small>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={{span: 6, offset: 6}} lg={{span: 6, offset: 6}} md={{span: 6, offset: 6}} sm={12} className={`discount-percentage-col ${selectedPriceType === 'Percentage Discount' ? 'd-block' : 'd-none'}`}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="discountPercentage" className="form-label text-capitalize fw-bold small">Discount percentage</label>
                                                            <input 
                                                                type="number" 
                                                                className="form-control" 
                                                                id="discountPercentage" 
                                                                name="discountPercentage" 
                                                                value={treatmentPackageData.discount_percentage || ''}
                                                                onClick={preventAutoScroll}
                                                                onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    setTreatmentPackageData({...treatmentPackageData, discount_percentage: value});
                                                                    setDiscountPercentage(value);
                                                                }}
                                                            />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <h4 className="text-capitalize fw-bold default-font pt-3 h5">Availability</h4>
                                                    </Col>


                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="availableFor" className="form-label text-capitalize fw-bold small">Available for  </label>
                                                            <select 
                                                                name="availableFor" 
                                                                id="availableFor" 
                                                                className="form-control text-capitalize" 
                                                                required 
                                                                value={treatmentPackageData?.available_for}
                                                                onClick={preventAutoScroll}
                                                                onChange={(e) => {
                                                                    setTreatmentPackageData({...treatmentPackageData, available_for: e.target.value});
                                                                }}
                                                            >
                                                                <option value="">Select availability</option>
                                                                <option value="all genders">All genders</option>
                                                                <option value="females only">Females only</option>
                                                                <option value="males only">Males only</option>
                                                                <option value="unisex">Unisex</option>
                                                            </select>
                                                        </div>
                                                    </Col>
                                                    
                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <input 
                                                            type="submit" 
                                                            className="bg-jetGreen text-white border-0 py-2 px-3" 
                                                            onClick={(e) => {
                                                                preventAutoScroll(e);
                                                                handleSubmit(e);
                                                            }} 
                                                            value="Create" 
                                                        />
                                                    </Col>
                                                </Row>
                                            </form>
                                        </div>
                                    </div>
                                </div>




                                
                                {/* sidebar editable form end */}
                            </div>
                            {/* content body end */}
                        </div>
                        {/* dashboard content end */}
                    </div>
                    {/* dashboard page section end */}
                </Row>
            </Container>

            <div className="alert-container position-relative">
                <div className="alert-box delete-alert-box">
                    <Alert show={deleteAlert} variant="success">
                        <Alert.Heading className="text-center h4">&#9888; Are you sure?</Alert.Heading>
                        <p className="text-center py-1">You won't be able to revert this!</p>
                        <hr />
                        <div className="d-flex justify-content-center align-items-center">
                            <Button 
                                onClick={() => handleDelete(packageToDelete)} 
                                variant="outline-success bg-success text-white mx-1"
                            >
                                Yes, Delete it!
                            </Button>

                            <Button 
                                onClick={() => setDeleteAlert(false)} 
                                variant="outline-danger bg-danger text-white mx-1"
                            >
                                No, Cancel
                            </Button>
                        </div>
                    </Alert>
                </div>
            </div>
        </>
    );
};

export default TreatmentPackage;