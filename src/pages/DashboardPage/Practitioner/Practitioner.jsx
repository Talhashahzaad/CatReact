import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import './Practitioner.css';
import axios from 'axios';

const Practitioner = () => {
    const [practitionerListingData, setPractitionerListingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalEntries, setTotalEntries] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [createAlert, setCreateAlert] = useState(false);
    const [updateAlert, setUpdateAlert] = useState(false);
    const [practitionerToDelete, setPractitionerToDelete] = useState(null);
    const [editableForm, setEditableForm] = useState(false);
    const navigate = useNavigate();

    // Fetch data with token
    const fetchPractitionerData = async () => {
        setLoading(true);
        setError(null);

        try {
            //const token = JSON.parse(localStorage.getItem("token"));
            const token = (localStorage.getItem("token"));
            if (!token) {
                navigate('/login');
                return;
            }

            const parsedToken = JSON.parse(token);
            const response = await axios.get(`http://3.8.140.227:8000/api/practitioner?page=${currentPage}&per_page=${entriesPerPage}`,
            //const response = await axios.get(`http://3.8.140.227:8000/api/practitioner`,
                {
                    headers: {
                        'Authorization': `Bearer ${parsedToken}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                    }
                }
            );

            if (response.data) {
                setPractitionerListingData(response.data);
                setTotalPages(response.data.last_page || 1);
                setTotalEntries(response.data.total || 0);
            } else {
                setError('Invalid data format received from server');
            }

            } catch (error) {
                console.error('Error fetching data:', error);
                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate('/login');
                }
                setError(error.message || 'Failed to fetch practitioner data');
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchPractitionerData();
    }, [currentPage, entriesPerPage]);

    const handleEntriesPerPageChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredEntries = practitionerListingData.filter(practitioner => 
        practitioner.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        practitioner.qualification?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // We are calculating total pages and entries here
    const totalFilteredEntries = filteredEntries.length;
    const totalFilteredPages = Math.ceil(totalFilteredEntries / entriesPerPage);

    // Calculate pagination
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredEntries.sort((a, b) => b.id - a.id).slice(indexOfFirstEntry, indexOfLastEntry);

    const [practitionerData, setPractitionerData] = useState({
        name: '',
        qualification: '',
        certificate: '',
        confirmBox: false
    });

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        setPractitionerData({
            ...practitionerData,
            confirmBox: e.target.checked
        });
        if(e.target.checked){
            setError('');
        }
    };

    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handlePractitionerDataChange = (e) => {
        const { name, value, type, checked } = e.target;

        setPractitionerData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const resetForm = () => {
        setPractitionerData({
            name: '',
            qualification: '',
            certificate: '',
            confirmBox: false
        });
        setIsChecked(false);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isChecked) {
            setError('Please confirm by checking the box');
            return;
        }

        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.post('http://3.8.140.227:8000/api/practitioner', 
                practitionerData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                setCreateAlert(true);
                document.querySelector('.sidebar-listing-form').style.display = 'none';
                document.querySelector('.dashboard-content-table').style.display = 'block';
                resetForm();
                fetchPractitionerData();
            }
        } catch (error) {
            setCreateAlert(false);
        }
    };
    
    useEffect(() => {
        if (responseMessage) {
            const timer = setTimeout(() => {
                window.location.href = '/dashboard/practitioner';
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [responseMessage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalFilteredPages) {
            setCurrentPage(currentPage + 1);
        }
    };


    // We are handling the delete functionality here
    const handleDelete = async (id) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            await axios.delete(`http://3.8.140.227:8000/api/practitioner/${id}`, {
                headers: {  
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setDeleteAlert(false);
            fetchPractitionerData();
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Error deleting practitioner');
            setDeleteAlert(false);
        }
    };


    // We are handling the update functionality here
    const handleUpdatePractitioner = async (e) => {
        e.preventDefault();
        
        if (!isChecked || !practitionerData.confirmBox) {
            setError('Please confirm the consent checkbox');
            return;
        }

        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.put(
                `http://3.8.140.227:8000/api/practitioner/${practitionerData.id}`, 
                {
                    name: practitionerData.name || '',
                    qualification: practitionerData.qualification || '',
                    certificate: practitionerData.certificate || '',
                    confirmBox: practitionerData.confirmBox || false
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Handle successful response
            setResponseMessage('Practitioner updated successfully');
            setUpdateAlert(true);
            document.querySelector('.sidebar-editable-form').style.display = 'none';
            document.querySelector('.dashboard-content-table').style.display = 'block';
            fetchPractitionerData();
            
        } catch (error) {
            console.error('Error updating practitioner:', error);
            setError('Failed to update practitioner');
        }
    };

    return (
        <>
            <Container fluid className="dashboard-page-main">
                <Row>
                    <div className="dashboard-page-section w-100 h-auto d-flex justify-content-between align-items-start py-5" onClick={(e) => e.stopPropagation()}>
                        <Sidebar />

                    <div className="dashboard-content">
                        <div className="dashboard-content-body">
                            <div className="dashboard-content-breadcrumbs w-100 h-auto d-block py-3 px-2 position-relative bg-jetGreen mb-3 rounded">
                                <Breadcrumb />
                            </div>
                        </div>  
                        
                            <div className="dashboard-content-table">
                                <Row>
                                    <div className="d-flex justify-content-between align-items-center listing-header">
                                    <h1 className="dashboard-content-title mb-0 h3 fw-bold text-capitalize headingFont">Practitioner</h1>
                                    <button 
                                        className="btn bg-jetGreen all-listing-create-button d-flex align-items-center justify-content-center" 
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
                                            className={`setEntriesPerPage ${entriesPerPage}`} 
                                            defaultValue={entriesPerPage}
                                            name="entriesPerPage"
                                        >
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                        </select>
                                        
                                    </Col>
                                    <Col xxl={3} xl={3} lg={3} md={3} sm={12} className="text-end">
                                        <input 
                                            type="text" 
                                            placeholder="Search..." 
                                            value={searchTerm}
                                            onChange={handleSearchChange} 
                                            id="practitionerSearch"
                                            name="practitionerSearch"
                                        />
                                    </Col>
                                </Row>

                            
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase">id</th>
                                            <th className="text-capitalize">name</th>
                                            <th className="text-capitalize">qualification</th>
                                            <th className="text-capitalize">certificate</th>
                                            <th className="text-capitalize">action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="5" className="text-center">Loading...</td>
                                            </tr>
                                        ) : error ? (
                                            <tr>
                                                <td colSpan="5" className="text-center">Error: {error}</td>
                                            </tr>
                                        ) : filteredEntries.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center">No Practitioner Data Found</td>
                                            </tr>
                                        ) : (currentEntries.map((practitioner, index) => ( 
                                            <tr key={practitioner.id || practitionerListingData[index].user_id}>
                                                <td>{practitioner.id}</td>
                                                <td>{practitioner.name}</td>
                                                <td>{practitioner.qualification}</td>
                                                <td>{practitioner.certificate}</td>
                                                <td>
                                                    <button 
                                                        className="btn btn-success" 
                                                        onClick={() => {
                                                            setPractitionerData({
                                                                id: practitioner.id,
                                                                name: practitioner.name,
                                                                qualification: practitioner.qualification,
                                                                certificate: practitioner.certificate,
                                                                confirmBox: false
                                                            });
                                                            setIsChecked(false);
                                                            setError('');
                                                            document.querySelector('.sidebar-editable-form').style.display = 'block';
                                                            document.querySelector('.dashboard-content-table').style.display = 'none';
                                                        }}
                                                    >
                                                        <FaEdit />
                                                    </button>

                                                    <button 
                                                        className="btn btn-danger" 
                                                        onClick={() => {
                                                            setPractitionerToDelete(practitioner.id);
                                                            setDeleteAlert(true);
                                                        }}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        )))}
                                    </tbody>
                                </table>
                            
                            
                                <div className="d-flex justify-content-between align-items-center">
                                    <div> 
                                        {totalFilteredPages > 0 ? (
                                            `Showing ${indexOfFirstEntry + 1} to ${Math.min(indexOfLastEntry, totalFilteredEntries)} of ${totalFilteredEntries} entries`
                                        ) : (
                                            'Showing 0 to 0 of 0 entries'
                                        )}
                                    </div>
                                    <div>
                                        {currentPage > 1 && (
                                            <button 
                                                onClick={handlePreviousPage}
                                                className="btn btn-previous"
                                            >
                                                Previous
                                            </button>
                                        )}
                                        <span> Page {currentPage} of {totalFilteredPages} </span>
                                        {currentPage < totalFilteredPages && (
                                            <button 
                                                onClick={handleNextPage}
                                                className="btn btn-next"
                                            >
                                                Next
                                            </button>
                                        )}
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
                                        <h2 className="dashboard-all-listing-create-form-title mb-0 h5 fw-bold default-font text-capitalize">create Practitioner</h2>
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
                                                        value={practitionerData.name}
                                                        onChange={handlePractitionerDataChange}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                <div className="form-group my-2">
                                                    <label htmlFor="qualification" className="form-label text-capitalize fw-bold small">qualification and level <sup className="text-danger">*</sup></label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="qualification" 
                                                        name="qualification" 
                                                        required 
                                                        value={practitionerData.qualification || ''}
                                                        onChange={handlePractitionerDataChange}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                <div className="form-group my-2">
                                                    <label htmlFor="certificate" className="form-label text-capitalize fw-bold small">certificate</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="certificate" 
                                                        name="certificate" 
                                                        required 
                                                        value={practitionerData.certificate || ''}
                                                        onChange={handlePractitionerDataChange}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        
                                        <Row>
                                            <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                <div className="form-group my-2 d-flex align-items-flex-start">
                                                    <input type="checkbox" 
                                                        checked={isChecked} 
                                                        onChange={handleCheckboxChange} 
                                                        className="form-control" 
                                                        id="confirmBox" 
                                                        name="confirmBox" 
                                                        required 
                                                    />
                                                    {error && <span className="text-danger">{error}</span>}
                                                    <span htmlFor="confirmBox" className="form-label text-capitalize fw-normal small">I confirm that I have obtained consent from the practitioner listed on this business profile to display their professional affiliations publicly on Check a Treatment.</span>
                                                </div>
                                            </Col>
                                        </Row>
                                        
                                        <Row>
                                            <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                                <div className="form-group my-2">
                                                    <input 
                                                    type="submit" 
                                                    className="text-white rounded-0 bg-jetGreen border-0 py-2 px-3" 
                                                    value="Create" 
                                                    onClick={handleSubmit}
                                                    />  
                                                </div>
                                            </Col>
                                        </Row>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* sidebar listing form end here */}







                        {/* sidebar editable form start here */}
                        <div className={`sidebar-editable-form`} style={{display: editableForm ? 'block' : 'none'}}>
                            <div className="dashboard-all-listing-editable-form">
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
                                        <h2 className="dashboard-all-listing-create-form-title mb-0 h5 fw-bold default-font text-capitalize">update Practitioner</h2>
                                    </div>
                                </Row>
                                <hr />

                                <div className="dashboard-all-listing-editable-form-body">
                                    <form onSubmit={handleUpdatePractitioner}>
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
                                                        value={practitionerData.name}
                                                        onChange={handlePractitionerDataChange}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                <div className="form-group my-2">
                                                    <label htmlFor="qualification" className="form-label text-capitalize fw-bold small">qualification and level <sup className="text-danger">*</sup></label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="qualification" 
                                                        name="qualification" 
                                                        required 
                                                        value={practitionerData.qualification}
                                                        onChange={handlePractitionerDataChange}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                <div className="form-group my-2">
                                                    <label htmlFor="certificate" className="form-label text-capitalize fw-bold small">certificate</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="certificate" 
                                                        name="certificate" 
                                                        required 
                                                        value={practitionerData.certificate}
                                                        onChange={handlePractitionerDataChange}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        
                                        <Row>
                                            <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                <div className="form-group my-2 d-flex align-items-flex-start">
                                                    <input type="checkbox" 
                                                        checked={isChecked} 
                                                        onChange={handleCheckboxChange} 
                                                        className="form-control" 
                                                        id="confirmBox" 
                                                        name="confirmBox" 
                                                        value={practitionerData.confirmBox}
                                                        required 
                                                    />
                                                    {error && <span className="text-danger">{error}</span>}
                                                    <span htmlFor="confirmBoxUpdate" className="form-label text-capitalize fw-normal small">I confirm that I have obtained consent from the practitioner listed on this business profile to display their professional affiliations publicly on Check a Treatment.</span>
                                                </div>
                                            </Col>
                                        </Row>
                                        
                                        <Row>
                                            <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                                <div className="form-group my-2">
                                                    <input 
                                                    type="submit" 
                                                    className="text-white rounded-0 bg-jetGreen border-0 py-2 px-3" 
                                                    value="Update" 
                                                    onClick={handleUpdatePractitioner}
                                                    />  
                                                </div>
                                            </Col>
                                        </Row>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* sidebar editable form end here */}
                        </div>
                    </div>
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
                                onClick={() => handleDelete(practitionerToDelete)} 
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

            <div className="alert-container position-relative">
                <div className="alert-box create-alert-box">
                    <Alert show={createAlert} variant="success">
                        <Alert.Heading className="text-center h4"><FaCheckCircle className="anchorGreen" /> Practitioner created successfully!</Alert.Heading>
                        <hr />
                        <div className="d-flex justify-content-center align-items-center">
                            <Button onClick={() => setCreateAlert(false)} variant="outline-success text-white mx-1">Okay</Button>
                        </div>
                    </Alert>
                </div>
            </div>

            <div className="alert-container position-relative">
                <div className="alert-box update-alert-box">
                    <Alert show={updateAlert} variant="success">
                        <Alert.Heading className="text-center h4"><FaCheckCircle className="anchorGreen" /> Practitioner updated successfully!</Alert.Heading>
                        <hr />
                        <div className="d-flex justify-content-center align-items-center">
                            <Button onClick={() => setUpdateAlert(false)} variant="outline-success text-white mx-1">Okay</Button>
                        </div>
                    </Alert>
                </div>
            </div>
        </>
    );
};

export default Practitioner;
