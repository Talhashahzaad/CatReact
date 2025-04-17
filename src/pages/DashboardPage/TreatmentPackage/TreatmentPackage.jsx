import React, { useState, useCallback, useEffect  } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { FaEdit, FaTrash } from "react-icons/fa";
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
            
            if(response.data && Array.isArray(response.data.packages)){
                setTreatmentPackages(response.data.packages || []);
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

    const calculateTotalDuration = () => {
        const totalMinutes = selectedTreatments.reduce((total, treatment) => {
            if (!treatment || !treatment.duration) return total;
            
            try {
                const parts = treatment.duration.split('h');
                const hours = parseInt(parts[0]) || 0;
                const minutes = parseInt(parts[1]) || 0;
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
        if (!treatment) return;
        
        try {
            setSelectedTreatments(prevSelected => {
                if (isChecked) {
                    // Ensure the treatment has all required properties before adding
                    const safetreatment = {
                        ...treatment,
                        duration: treatment.duration || '0h0',
                        price: treatment.price || 0,
                        id: treatment.id
                    };
                    return [...prevSelected, safetreatment];
                } else {
                    return prevSelected.filter(item => item.id !== treatment.id);
                }
            });
        } catch (error) {
            console.error("Error in handleCheckboxChange:", error);
        }
    };

    // Calculate total price safely
    const totalPrice = selectedTreatments.reduce((total, treatment) => 
        total + (treatment && typeof treatment.price === 'number' ? treatment.price : 0), 0);


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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.post(`${$siteURL}/api/treatment-package`,
                treatmentPackageData, {
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
                    // Reset form data
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
                    fetchTreatmentPackages();
                }
        } catch (error) {
            console.error('API Error:', error);
            setCreateAlert(false);
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

// We are handling the update functionality here
const handlePackageDataChange = (e) => {
    const { name, status, category, description, services, variants, service_prices, service_durations, price_type, retail_price, total_duration, discount_percentage, available_for } = e.target;

    setTreatmentPackageData(prevData => ({
            ...prevData,
            [name]: name,
            [status]: status,
            [category]: category,
            [description]: description,
            [services]: services,
            [variants]: variants,
            [service_prices]: service_prices,
            [service_durations]: service_durations,
            [price_type]: price_type,
            [retail_price]: retail_price,
            [total_duration]: total_duration,
            [discount_percentage]: discount_percentage,
            [available_for]: available_for
        }));
    }

    const handlePackageDataUpdate = async (e) => {
        e.preventDefault();

        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.put(`${$siteURL}/api/treatment-package/${treatmentPackageData.id}`, 
                {
                    name: treatmentPackageData.name,
                    status: treatmentPackageData.status,
                    category: treatmentPackageData.category,
                    description: treatmentPackageData.description,
                    services: treatmentPackageData.services,
                    variants: treatmentPackageData.variants,
                    service_prices: treatmentPackageData.service_prices,
                    service_durations: treatmentPackageData.service_durations,
                    price_type: treatmentPackageData.price_type,
                    retail_price: treatmentPackageData.retail_price,
                    total_duration: treatmentPackageData.total_duration,
                    discount_percentage: treatmentPackageData.discount_percentage,
                },
                {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if(response.status === 200){
                setUpdateAlert(true);
                document.querySelector('.sidebar-editable-form').style.display = 'none';
                document.querySelector('.dashboard-content-table').style.display = 'block';
                fetchTreatmentPackages();
            }
        } catch (error) {
            console.error('API Error:', error);
        }
    }






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
                                                <th>category</th>
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
                                                        <td>{treatmentPackage.category || '-'}</td>
                                                        <td>{treatmentPackage.price_type || '-'}</td>
                                                        <td>{treatmentPackage.available_for || '-'}</td>
                                                        <td>{treatmentPackage.status === true ? 'Active' : 'Inactive'}</td>
                                                        <td>
                                                            <button className="btn btn-success" onClick={() => {
                                                                document.querySelector('.dashboard-content-table').style.display = 'none';
                                                                document.querySelector('.sidebar-editable-form').style.display = 'block';
                                                            }}>
                                                                <FaEdit />
                                                            </button>
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
                                                            <select name="treatmentCategory" id="treatmentCategory" className="form-control text-capitalize" required>
                                                                <option value="">Select a category</option>
                                                                {Array.isArray(treatmentCategoriesData) && treatmentCategoriesData.length > 0 && 
                                                                    treatmentCategoriesData.map((categoryName, index) => (  
                                                                        <option value={categoryName.id} key={index}>{categoryName.name}</option>
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
                                                                        {currentEntries.map(treatmentPackage => (
                                                                            <li key={treatmentPackage.id} className='d-flex flex-column'>
                                                                                <label htmlFor={`treatmentName-${treatmentPackage.id}`} className='form-label text-capitalize fw-bold small'></label>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    className="form-control" 
                                                                                    id={`treatmentName-${treatmentPackage.id}`} 
                                                                                    placeholder="treatment name" 
                                                                                    name="treatmentName" 
                                                                                    onChange={(e) => handleCheckboxChange(treatmentPackage, e.target.checked)}
                                                                                />
                                                                                <h6 className='text-capitalize fw-bold default-font'>
                                                                                    {treatmentPackage?.package_service_variants?.treatment_name || treatmentPackage.name || 'Unnamed Treatment'}
                                                                                </h6>
                                                                                <small className='text-capitalize fw-normal default-font'>  
                                                                                    <span id="selected-treatment-duration">
                                                                                        {treatmentPackage?.package_service_variants?.duration || '0h0'}
                                                                                    </span> - 
                                                                                    <span id="selected-treatment-price">
                                                                                        &pound; {treatmentPackage?.package_service_variants?.price || 0}
                                                                                    </span>
                                                                                </small>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </Modal.Body>
                                                            
                                                            <Modal.Footer className='d-flex flex-column gap-2 align-items-start justify-content-start price-and-duration-footer'>
                                                                <ul className='d-flex flex-column gap-2 ps-0 mb-0'>
                                                                    <li>
                                                                        <label htmlFor="TotalPrice" className='text-capitalize'>total price: 
                                                                            <span className='fw-bold selected-treatment-duration-total-price'>&pound; {totalPrice}</span>
                                                                        </label>
                                                                    </li>
                                                                    <li>
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
                                                        <h5 className="text-capitalize h6 fw-bold default-font pt-3 text-end">Total Time: {totalDuration.hours}h {totalDuration.minutes}min | Total Price: &pound; {totalPrice}</h5>
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
                                                                value={treatmentPackageData.price_type}
                                                                onChange={(e) => {
                                                                    setTreatmentPackageData({...treatmentPackageData, price_type: e.target.value});
                                                                }}

                                                            >
                                                                <option value="Treatment Pricing">{treatmentPackageData?.price_type}</option>
                                                                
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
                                                                value={treatmentPackageData?.retail_price} 
                                                                readOnly={treatmentPackageData?.price_type !== 'Custom Pricing'} 
                                                                onChange={(e) => {
                                                                    setTreatmentPackageData({...treatmentPackageData, retail_price: e.target.value});
                                                                }}
                                                            />
                                                            <small>
                                                                {treatmentPackageData === 'Free' ? 'This package is free' : 
                                                                treatmentPackageData === 'Custom Pricing' ? 'Enter custom price' : 
                                                                treatmentPackageData?.discount_percentage === 'Percentage Discount' ? 'Discounted price will be calculated' : 'Total price of selected services'}
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
                                                                value={treatmentPackageData?.discount_percentage}
                                                                onChange={(e) => {
                                                                    setTreatmentPackageData({...treatmentPackageData, discount_percentage: e.target.value});
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
                                                                <option value="">{treatmentPackageData?.available_for}</option>
                                                            </select>
                                                        </div>
                                                    </Col>
                                                    
                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <input type="submit" className="bg-jetGreen text-white border-0 py-2 px-3" value="Create" />
                                                    </Col>
                                                </Row>
                                            </form>
                                        </div>
                                    </div>
                                </div>




                                <div className="sidebar-editable-form" style={{display: packageEditableForm ? 'block' : 'none'}}>
                                    <div className="dashboard-all-listing-create-form">
                                        <Row>
                                            <div className="d-flex justify-content-flex-start align-items-center listing-header">
                                                <button 
                                                    className="btn bg-jetGreen all-listing-create-button all-listing-create-form-back-button text-capitalize d-flex align-items-center justify-content-center me-2" 
                                                    onClick={() => {
                                                        document.querySelector('.sidebar-editable-form').style.display = 'none';
                                                        document.querySelector('.dashboard-content-table').style.display = 'block';
                                                    }}
                                                >
                                                    <span className="all-listing-create-form-back-button-arrow">&larr;</span> Back 
                                                </button>
                                                <h2 className="dashboard-all-listing-create-form-title mb-0 h5 fw-bold default-font text-capitalize">update treatment package</h2>
                                            </div>
                                        </Row>
                                        <hr />

                                        <div className="dashboard-all-listing-create-form-body">
                                            <form onSubmit={handlePackageDataUpdate}>
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
                                                                autoComplete="off"
                                                                value={treatmentPackageData.name}
                                                                onChange={(e) => {
                                                                    setTreatmentPackageData({...treatmentPackageData, name: e.target.value});
                                                                }}
                                                            />
                                                        </div>
                                                    </Col>
                                                    
                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="status" className="form-label text-capitalize fw-bold small">status <sup className="text-danger">*</sup></label>
                                                            <select name="status"
                                                                id="status"
                                                                className="form-control text-capitalize"
                                                                required
                                                                value={treatmentPackageData.status}
                                                                onChange={(e) => {
                                                                    setTreatmentPackageData({...treatmentPackageData, status: e.target.value});
                                                                }}
                                                            >
                                                                <option value="active">{treatmentPackageData.status}</option>
                                                                <option value="inactive">inactive</option>
                                                            </select>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="treatmentCategory" className="form-label text-capitalize fw-bold small">treatment Category</label>
                                                            <select
                                                                name="treatmentCategory"
                                                                id="treatmentCategory"
                                                                className="form-control text-capitalize"
                                                                required
                                                                value={treatmentPackageData.category}
                                                                onChange={(e) => {
                                                                    setTreatmentPackageData({...treatmentPackageData, category: e.target.value});
                                                                }}
                                                            >
                                                                <option value={treatmentPackageData.category}>{treatmentPackageData.category}</option>
                                                                {Array.isArray(treatmentCategoriesData) && treatmentCategoriesData.length > 0 && 
                                                                    treatmentCategoriesData.map((categoryName, index) => (  
                                                                        <option value={categoryName.id} key={index}>{categoryName.name}</option>
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
                                                                        {currentEntries.map(treatmentPackage => (
                                                                            <li key={treatmentPackage.id} className='d-flex flex-column'>
                                                                                <label htmlFor={`treatmentName-${treatmentPackage.id}`} className='form-label text-capitalize fw-bold small'></label>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    className="form-control" 
                                                                                    id={`treatmentName-${treatmentPackage.id}`} 
                                                                                    placeholder="treatment name" 
                                                                                    name="treatmentName" 
                                                                                    onChange={(e) => handleCheckboxChange(treatmentPackage, e.target.checked)}
                                                                                />
                                                                                <h6 className='text-capitalize fw-bold default-font'>
                                                                                    {treatmentPackage?.package_service_variants?.treatment_name || treatmentPackage.name || 'Unnamed Treatment'}
                                                                                </h6>
                                                                                <small className='text-capitalize fw-normal default-font'>  
                                                                                    <span id="selected-treatment-duration">
                                                                                        {treatmentPackage?.package_service_variants?.duration || '0h0'}
                                                                                    </span> - 
                                                                                    <span id="selected-treatment-price">
                                                                                        &pound; {treatmentPackage?.package_service_variants?.price || 0}
                                                                                    </span>
                                                                                </small>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </Modal.Body>
                                                            
                                                            <Modal.Footer className='d-flex flex-column gap-2 align-items-start justify-content-start price-and-duration-footer'>
                                                                <ul className='d-flex flex-column gap-2 ps-0 mb-0'>
                                                                    <li>
                                                                        <label htmlFor="TotalPrice" className='text-capitalize'>total price: 
                                                                            <span className='fw-bold selected-treatment-duration-total-price'>&pound; {totalPrice}</span>
                                                                        </label>
                                                                    </li>
                                                                    <li>
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
                                                        <h5 className="text-capitalize h6 fw-bold default-font pt-3 text-end">Total Time: {totalDuration.hours}h {totalDuration.minutes}min | Total Price: &pound; {totalPrice}</h5>
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
                                                                onChange={(e) => setSelectedPriceType(e.target.value)}
                                                            >           
                                                                <option value="Treatment Pricing">{selectedPriceType}</option>
                                                                <option value="Custom Pricing">Custom pricing</option>
                                                                <option value="Percentage Discount">Percentage discount</option>
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
                                                                value={treatmentPackageData?.retail_price} 
                                                                readOnly={selectedPriceType !== 'Custom Pricing'} 
                                                                onChange={(e) => {
                                                                    setTreatmentPackageData({...treatmentPackageData, retail_price: e.target.value});
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
                                                                value={treatmentPackageData?.discount_percentage}
                                                                onChange={(e) => {
                                                                    setTreatmentPackageData({...treatmentPackageData, discount_percentage: e.target.value});
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
                                                                <option value="">{treatmentPackageData?.available_for}</option>
                                                                <option value="">all genders</option>
                                                                <option value="">females only</option>
                                                                <option value="">males only</option>
                                                                <option value="">unisex</option>
                                                            </select>
                                                        </div>
                                                    </Col>
                                                    
                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <input type="submit" className="bg-jetGreen text-white border-0 py-2 px-3" value="Update" onClick={handlePackageDataUpdate} />
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