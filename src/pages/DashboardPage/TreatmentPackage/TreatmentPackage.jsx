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
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [packageToDelete, setPackageToDelete] = useState(null);
    const [updateAlert, setUpdateAlert] = useState(false);
    const [error, setError] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

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
            console.log(response.data.packages);
            
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
                
                return total + (hours * 60) + minutes;
            } catch (error) {
                console.error("Error parsing duration:", error);
                return total;
            }
        }, 0);

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
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
        setSelectedTreatments(prevSelected => {
            if (isChecked) {
                // Store package details in localStorage when checkbox is checked
                storePackageDetails(treatment);
                return [...prevSelected, treatment];
            } else {
                // Remove package details from localStorage when checkbox is unchecked
                removePackageDetails(treatment.id);
                return prevSelected.filter(item => item.id !== treatment.id);
            }
        });
    };

    // Function to store package details in localStorage
    const storePackageDetails = (packageData) => {
        try {
            // Get existing stored packages or initialize empty array
            const storedPackages = JSON.parse(localStorage.getItem('selectedPackages')) || [];
            
            // Extract package details, ensuring we use the right properties
            // Check for different possible property paths
            const totalPrice = packageData.total_price || 
                               packageData.price || 
                               (packageData.packages && packageData.packages.total_price) || 
                               (packageData.package && packageData.package.total_price) || 
                               0;
                               
            const totalTime = packageData.total_time || 
                              packageData.duration || 
                              (packageData.packages && packageData.packages.total_time) || 
                              (packageData.package && packageData.package.total_time) || 
                              '0h 0min';
            
            const packageToStore = {
                id: packageData.id,
                total_price: totalPrice,
                total_time: totalTime,
                name: packageData.name || '',
                category: packageData.category || '',
                price_type: packageData.price_type || ''
            };
            
            // Add package if not already in storage
            if (!storedPackages.some(pkg => pkg.id === packageToStore.id)) {
                storedPackages.push(packageToStore);
                localStorage.setItem('selectedPackages', JSON.stringify(storedPackages));
                console.log(`Package ${packageToStore.id} stored in localStorage`, packageToStore);
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
            console.log(`Packages ${packageId} removed from localStorage`);
        } catch (error) {
            console.error("Error removing package from localStorage:", error);
        }
    };

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
            
            return total + price;
        }, 0);
    };
    
    const [totalPrice, setTotalPrice] = useState(0);
    
    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [selectedTreatments]);

    // show hide the editable form
    const [packageEditableForm, setPackageEditableForm] = useState(false);

    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    
        const toggleSidebar = () => {
            setIsSidebarOpen(!isSidebarOpen);
        }

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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Format the total_duration to match the format used in the API response
            const formattedTotalDuration = `${totalDuration.hours}h ${totalDuration.minutes}min`;
            
            // Extract IDs from selected treatments
            const selectedTreatmentIds = selectedTreatments.map(treatment => treatment.id);
            
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.post(`${$siteURL}/api/treatment-package`,
                {
                    ...treatmentPackageData,
                    services: selectedTreatmentIds, // Add the selected treatment IDs
                    total_duration: formattedTotalDuration,
                    total_price: totalPrice,
                    retail_price: selectedPriceType === 'Custom Pricing' ? treatmentPackageData.retail_price : totalPrice,
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
                                                onClick={() => {
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
                                            <button onClick={handlePreviousPage} disabled={currentPage === 1} className="btn btn-previous">Previous</button>
                                            <span className="pagination-controls-page-number">Page {currentPage} of {totalFilteredPages || 1}</span>
                                            <button onClick={handleNextPage} disabled={currentPage === totalFilteredPages || totalFilteredPages === 0} className="btn btn-next">Next</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="sidebar-listing-form">
                                    <div className="dashboard-all-listing-create-form">
                                        <Row>
                                            <div className="d-flex justify-content-flex-start align-items-center listing-header">
                                                <button 
                                                    className="btn bg-jetGreen all-listing-create-button all-listing-create-form-back-button text-capitalize d-flex align-items-center justify-content-center me-2" 
                                                    onClick={() => {
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
                                                                onChange={(e) => {
                                                                    setTreatmentPackageData({...treatmentPackageData, description: e.target.value});
                                                                }}
                                                            ></textarea>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <h4 className="text-capitalize fw-bold default-font pt-3 h5">Treatments</h4>
                                                        <p>Select which treatments to include in this package and how they should be sequenced when booked.</p>

                                                        <Button className="popup-button rounded-0" onClick={handleShowModalPopUp}>
                                                            Add Treatment
                                                        </Button>

                                                        <Modal show={showModalPopUp} onHide={handleCloseModalPopUp} size="lg"       aria-labelledby="contained-modal-title-vcenter" centered id="add-treatment-packages-modal">
                                                            <Modal.Header closeButton>
                                                                <Modal.Title><h5 className="text-capitalize fw-bold default-font mb-0">Add Treatment</h5></Modal.Title>
                                                            </Modal.Header>

                                                            <Modal.Body>
                                                                <div className="selected-treatments-package-details">
                                                                    <ul className="d-flex align-items-start justify-content-start ps-0 mb-0 flex-column gap-2">
                                                                        {treatmentPackages.length > 0 && treatmentPackages.map((showPackages, index) => {
                                                                            // Get stored package data from localStorage
                                                                            const storedPackages = JSON.parse(localStorage.getItem('selectedPackages')) || [];
                                                                            const storedPackage = storedPackages.find(pkg => pkg.id === showPackages.id);
                                                                            
                                                                            return (
                                                                            <li key={index} className='d-flex flex-column'>
                                                                                <label htmlFor={`treatmentName-${showPackages.id}`} className='form-label text-capitalize fw-bold small'></label>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    className="form-control" 
                                                                                    id={`treatmentName-${index}`} 
                                                                                    placeholder="treatment name" 
                                                                                    name="treatmentName"
                                                                                    checked={selectedTreatments.some(item => item.id === showPackages.id)}
                                                                                    onChange={(e) => handleCheckboxChange(showPackages, e.target.checked)}
                                                                                />
                                                                                <h6 className='text-capitalize fw-bold default-font'>
                                                                                        {showPackages?.name}
                                                                                </h6>
                                                                                <small className='text-capitalize fw-normal default-font'>  
                                                                                    <span id="selected-treatment-duration">
                                                                                        {storedPackage ? storedPackage.total_time : showPackages?.total_time}
                                                                                    </span> - 
                                                                                    <span id="selected-treatment-price">
                                                                                        &pound; {storedPackage ? storedPackage.total_price : showPackages?.total_price}
                                                                                    </span>
                                                                                </small>
                                                                            </li>
                                                                            );
                                                                        })}
                                                                    </ul>
                                                                </div>
                                                            </Modal.Body>
                                                            
                                                            <Modal.Footer className='d-flex flex-column gap-2 align-items-start justify-content-start price-and-duration-footer'>
                                                            
                                                                <ul className='d-flex flex-column gap-2 ps-0 mb-0'>
                                                                
                                                                    <li>
                                                                        <label htmlFor="TotalPrice" className='text-capitalize'>total price: 
                                                                            <span className='fw-bold selected-treatment-duration-total-price'>&pound;  {totalPrice}</span>
                                                                        </label>

                                                                        <label htmlFor="TotalDuration" className='text-capitalize'>Total Duration:  
                                                                            <span className='fw-bold selected-treatment-duration-total-duration'>
                                                                                {totalDuration.hours}h {totalDuration.minutes}min
                                                                             </span>
                                                                        </label>
                                                                    </li>
                                                                
                                                                </ul>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <h5 className="text-capitalize h6 fw-bold default-font pt-3 text-end">
                                                            Total Time: {totalDuration.hours}h {totalDuration.minutes}min | 
                                                            Total Price: &pound; {totalPrice}
                                                        </h5>
                                                    </Col>
                                                    
                                                    <div className="selected-treatments-package-details">
                                                        <ul className="d-flex align-items-start justify-content-start ps-0 mb-0 flex-column gap-2">
                                                            <li>
                                                            
                                                            </li>
                                                        </ul>
                                                    </div>

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
                                                                value={selectedPriceType === 'Custom Pricing' ? treatmentPackageData.total_price || '' : totalPrice} 
                                                                readOnly={selectedPriceType !== 'Custom Pricing'} 
                                                                onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    setTreatmentPackageData({...treatmentPackageData, total_price: value});
                                                                    setRetailPrice(value);
                                                                }}
                                                            />
                                                            <small>
                                                                {selectedPriceType === 'Free' ? 'This package is free' : selectedPriceType === 'Custom Pricing' ? 'Enter custom price' : selectedPriceType === 'Percentage Discount' ? 'Discounted price will be calculated' : 'Total price of selected services'}
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
                                                                onChange={(e) => {
                                                                    setTreatmentPackageData({...treatmentPackageData, discount_percentage: e.target.value});
                                                                    setDiscountPercentage(e.target.value);
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
                                                            <select name="availableFor" id="availableFor" className="form-control text-capitalize" required 
                                                                value={treatmentPackageData?.available_for}
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
                                                        <input type="submit" className="bg-jetGreen text-white border-0 py-2 px-3" onClick={handleSubmit} value="Create" />
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