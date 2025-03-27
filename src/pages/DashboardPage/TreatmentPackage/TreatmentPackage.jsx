import React, { useState, useCallback, useEffect  } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { FaEdit, FaTrash } from "react-icons/fa";
import './TreatmentPackage.css';
import DashboardHeader from "../DashboardHeader/DashboardHeader";

const TreatmentPackage = () => {
    const [entries, setEntries] = useState([5]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [search, setSearch] = useState('');

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);
    const totalPages = Math.ceil(entries.length / entriesPerPage);

    const [showModalPopUp, setShowModalPopUp] = useState(false);
    const handleCloseModalPopUp = () => setShowModalPopUp(false);
    const handleShowModalPopUp = () => setShowModalPopUp(true);

    const [retailPrice, setRetailPrice] = useState();
    const [selectedPriceType, setSelectedPriceType] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState(0);

    const [totalDuration, setTotalDuration] = useState({ hours: 0, minutes: 0 });

    const [selectedTreatments, setSelectedTreatments] = useState([]);

    const calculateTotalDuration = () => {
        const totalMinutes = selectedTreatments.reduce((total, treatment) => {
            const [hours, minutes] = treatment.duration.split('h').map(part => parseInt(part));
            return total + (hours * 60) + minutes;
        }, 0);

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return { hours, minutes };
    };

    useEffect(() => {
        const calculateTotalDuration = () => {
            const hours = selectedTreatments.reduce((total, treatment) => total + treatment.duration.split('h')[0], 0);
            const minutes = selectedTreatments.reduce((total, treatment) => total + parseInt(treatment.duration.split('h')[1].split('min')[0]), 0);
            setTotalDuration({ hours, minutes });
        };

        calculateTotalDuration();
    }, []);

    const handleEntriesPerPageChange = useCallback((event) => {
        setEntriesPerPage(parseInt(event.target.value));
    }, []);

    const handleSearch = useCallback((value) => {
        setSearch(value);
    }, []);
    
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
                return [...prevSelected, treatment];
            } else {
                return prevSelected.filter(item => item.id !== treatment.id);
            }
        });
    };

    // Calculate total price
    const totalPrice = selectedTreatments.reduce((total, treatment) => total + treatment.price, 0);

  return (
    <>
        <Container fluid className="dashboard-page-main">
                <Row>
                    <div className="dashboard-page-section w-100 h-auto d-flex justify-content-between align-items-start pb-5" onClick={(e) => e.stopPropagation()}>
                        <Sidebar />

                        <div className="dashboard-content">
                            <div className="dashboard-content-body">
                                <DashboardHeader />

                                <div className="dashboard-content-breadcrumbs w-100 h-auto d-block py-3 px-2 position-relative bg-green25 mb-3 rounded">
                                    <Breadcrumb />
                                </div>
                                {/* breadcrumb end */}

                                <div className="dashboard-content-table">
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
                                            <select id="entriesPerPage" onChange={handleEntriesPerPageChange} value={entriesPerPage}>
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                            </select>
                                        </Col>
                                        <Col xxl={3} xl={3} lg={3} md={3} sm={12} className="text-end border rounded-2">
                                            <input 
                                                type="text" 
                                                placeholder="Search..." 
                                                onChange={(e) => handleSearch(e.target.value)} 
                                                value={search}
                                            />
                                        </Col>
                                    </Row>
                                    
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
                                            {currentEntries.map((entry, index) => (
                                                <tr key={index}>
                                                    <td>{entry.id}</td>
                                                    <td>{entry.name}</td>
                                                    <td>{entry.category}</td>
                                                    <td>{entry.priceType}</td>
                                                    <td>{entry.availableFor}</td>
                                                    <td>{entry.status}</td>
                                                    <td>
                                                        <button className="btn btn-success"><FaEdit /></button>
                                                        <button className="btn btn-danger"><FaTrash /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="d-flex justify-content-between align-items-center pagination-controls">
                                        <div>
                                            Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, entries.length)} of {entries.length} entries
                                        </div>
                                        <div>
                                            <button onClick={handlePreviousPage} disabled={currentPage === 1} className="btn btn-previous">Previous</button>
                                            <span className="pagination-controls-page-number">Page {currentPage} of {totalPages}</span>
                                            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-next">Next</button>
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
                                            <form>
                                                <Row>
                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="name" className="form-label text-capitalize fw-bold small">name <sup className="text-danger">*</sup></label>
                                                            <input type="text" className="form-control" id="name" name="name" required />
                                                        </div>
                                                    </Col>
                                                    
                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="status" className="form-label text-capitalize fw-bold small">status <sup className="text-danger">*</sup></label>
                                                            <select name="status" id="status" className="form-control text-capitalize" required>
                                                                <option value="">active</option>
                                                                <option value="1">inactive</option>
                                                            </select>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="status" className="form-label text-capitalize fw-bold small">treatment Category</label>
                                                            <select name="status" id="status" className="form-control text-capitalize" required>
                                                                <option value=""></option>
                                                                <option value=""></option>
                                                            </select>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="description" className="form-label text-capitalize fw-bold small">Description</label>
                                                            <textarea className="form-control" id="description" name="description" required></textarea>
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
                                                                        {[
                                                                            { id: 1, name: 'jameson stokes - service', duration: '5h 30min', price: 380 },
                                                                            { id: 2, name: 'Jameson Stokes - Ocean Yates', duration: '1h 15min', price: 75 }
                                                                        ].map(treatment => (
                                                                            <li key={treatment.id} className='d-flex flex-column'>
                                                                                <label htmlFor={`treatmentName-${treatment.id}`} className='form-label text-capitalize fw-bold small'></label>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    className="form-control" 
                                                                                    id={`treatmentName-${treatment.id}`} 
                                                                                    placeholder="treatment name" 
                                                                                    name="treatmentName" 
                                                                                    onChange={(e) => handleCheckboxChange(treatment, e.target.checked)}
                                                                                />
                                                                                <h6 className='text-capitalize fw-bold default-font'>{treatment.name}</h6>
                                                                                <small className='text-capitalize fw-normal default-font'>  
                                                                                    <span id="selected-treatment-duration">{treatment.duration}</span> - 
                                                                                    <span id="selected-treatment-price">&pound; {treatment.price}</span>
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
                                                                                {calculateTotalDuration().hours}h {calculateTotalDuration().minutes}min
                                                                            </span>
                                                                        </label>
                                                                    </li>
                                                                </ul>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <h5 className="text-capitalize h6 fw-bold default-font pt-3 text-end">Total Time: {calculateTotalDuration().hours}h {calculateTotalDuration().minutes}min | Total Price: &pound; {totalPrice}</h5>
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
                                                                <option value="Treatment Pricing">Treatment pricing</option>
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
                                                                value={retailPrice} 
                                                                readOnly={selectedPriceType !== 'Custom Pricing'} 
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
                                                                value={discountPercentage}
                                                                onChange={(e) => setDiscountPercentage(e.target.value)}
                                                            />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <h4 className="text-capitalize fw-bold default-font pt-3 h5">Availability</h4>
                                                    </Col>


                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="status" className="form-label text-capitalize fw-bold small">Available for  </label>
                                                            <select name="status" id="status" className="form-control text-capitalize" required>
                                                                <option value="">all genders</option>
                                                                <option value="">females only</option>
                                                                <option value="">males only</option>
                                                                <option value="">unisex</option>
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
                            </div>
                            {/* content body end */}
                        </div>
                        {/* dashboard content end */}
                    </div>
                    {/* dashboard page section end */}
                </Row>
            </Container>
        </>
    );
};

export default TreatmentPackage;