import { React, useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const ProfessionalAffiliationsCertificates = () => {

    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalEntries, setTotalEntries] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteAlert, setDeleteAlert] = useState(false);

    const [createAlert, setCreateAlert] = useState(false);
    const [updateAlert, setUpdateAlert] = useState(false);
    const [editableForm, setEditableForm] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        description: ''
    });
    const [formMode, setFormMode] = useState('create'); // create or edit
    //const [rawApiResponse, setRawApiResponse] = useState(null);
    //const [showRawResponse, setShowRawResponse] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [apiStatus, setApiStatus] = useState(null);
    const navigate = useNavigate();

    const handleEntriesPerPageChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1);
        // Clear search when changing entries to avoid conflicts
        if (searchTerm) {
            setSearchTerm("");
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        // Reset to first page when searching
        setCurrentPage(1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEdit = (certificate) => {
        setFormData({
            id: certificate.id,
            name: certificate.name,
            description: certificate.description
        });
        setFormMode('edit');
        document.querySelector('.dashboard-content-table').style.display = 'none';
        document.querySelector('.sidebar-listing-form').style.display = 'block';
    };

    const handleDelete = async (id) => {
        setDeleteAlert(true);
        setTimeout(() => setDeleteAlert(false), 3000);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            
            let parsedToken;
            try {
                parsedToken = JSON.parse(token);
            } catch (e) {
                //console.error("Token parsing error:", e);
                setError("Invalid token format");
                navigate('/login');
                return;
            }
            
            await axios.delete(`http://3.8.140.227:8000/api/professional-certificate/${id}`, {
                headers: {
                    'Authorization': `Bearer ${parsedToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            setDeleteAlert(true);
            setTimeout(() => setDeleteAlert(false), 3000);
            fetchCertificates();
        } catch (error) {
            console.error("Delete error:", error);
            if (error.response && error.response.data && error.response.data.message === 'Unauthenticated.') {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                const errorMessage = error.response?.data?.message || 'Failed to delete certificate';
                alert(errorMessage);
            }
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            
            let parsedToken;
            try {
                parsedToken = JSON.parse(token);
            } catch (e) {
                //console.error("Token parsing error:", e);
                setError("Invalid token format");
                navigate('/login');
                return;
            }
            
            const headers = {
                'Authorization': `Bearer ${parsedToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            
            if (formMode === 'create') {
                await axios.post(`http://3.8.140.227:8000/api/professional-certificate`, formData, { headers });
                setCreateAlert(true);
                setTimeout(() => setCreateAlert(false), 3000);
            } else {
                await axios.put(`http://3.8.140.227:8000/api/professional-certificate/${formData.id}`, formData, { headers });
                setUpdateAlert(true);
                setTimeout(() => setUpdateAlert(false), 3000);
            }
            
            setFormData({
                id: null,
                name: '',
                description: ''
            });
            setFormMode('create');
            fetchCertificates();
            document.querySelector('.sidebar-listing-form').style.display = 'none';
            document.querySelector('.dashboard-content-table').style.display = 'block';
        } catch (error) {
            console.error("Form submit error:", error);
            if (error.response && error.response.data && error.response.data.message === 'Unauthenticated.') {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                const errorMessage = error.response?.data?.message || 'Failed to submit form';
                alert(errorMessage);
            }
        }
    };

    // Apply search filter only for local filtering
    const filteredCertificates = searchTerm
        ? certificates.filter((certificate) => {
            return (
                certificate?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                certificate?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                certificate?.id?.toString().includes(searchTerm)
            );
        }) 
        : certificates;

    // Function to test API connection
    const testApiConnection = async () => {
        try {
            setApiStatus("testing");
            const response = await axios.get("http://3.8.140.227:8000/api/health-check", {
                timeout: 5000
            });
            if (response.status === 200) {
                setApiStatus("connected");
                return true;
            } else {
                setApiStatus("disconnected");
                return false;
            }
        } catch (error) {
            //console.error("API connection test failed:", error);
            setApiStatus("disconnected");
            return false;
        }
    };

    // Function to refresh token
    const refreshToken = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return null;
            }
            
            let parsedToken;
            try {
                parsedToken = JSON.parse(token);
            } catch (e) {
                //console.error("Token parsing error:", e);
                navigate('/login');
                return null;
            }
            
            const response = await axios.post(`http://3.8.140.227:8000/api/refresh-token`, {}, {
                headers: {
                    'Authorization': `Bearer ${parsedToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data && response.data.token) {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                return response.data.token;
            }
            
            return null;
        } catch (error) {
            //console.error("Token refresh failed:", error);
            localStorage.removeItem('token');
            navigate('/login');
            return null;
        }
    };

    const fetchCertificates = async (retry = 0) => {
        setLoading(true);
        setError(null);
        try {
            // First check API connection
            if (retry > 0) {
                const isConnected = await testApiConnection();
                if (!isConnected) {
                    throw new Error("API server is not reachable. Please check your internet connection.");
                }
            }
            
            let token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            
            let parsedToken;
            try {
                parsedToken = JSON.parse(token);
            } catch (e) {
                //console.error("Token parsing error:", e);
                setError("Invalid token format");
                navigate('/login');
                return;
            }
            
            //console.log("Fetching certificates with token:", parsedToken);
            //console.log(`Fetching page ${currentPage} with ${entriesPerPage} entries per page`);
            
            const response = await axios.get(`http://3.8.140.227:8000/api/professional-certificate`, {
                params: {
                    page: currentPage,
                    per_page: entriesPerPage
                },
                headers: {
                    'Authorization': `Bearer ${parsedToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                }
            });

            // Handle different possible API response formats
            if (response.data) {
                if (Array.isArray(response.data)) {
                    // If response.data is directly an array
                    setCertificates(response.data.slice(0, entriesPerPage));
                    setTotalPages(Math.ceil(response.data.length / entriesPerPage));
                    setTotalEntries(response.data.length);
                } 
                
                else if (response.data.data && Array.isArray(response.data.data)) {
                    // If response.data.data is an array (standard format)
                    setCertificates(response.data.data);
                    setTotalPages(response.data.meta?.total_pages || response.data.last_page || Math.ceil(response.data.total / entriesPerPage) || 1);
                    setTotalEntries(response.data.meta?.total_entries || response.data.total || response.data.data.length);
                } 
                
                else if (typeof response.data === 'object') {
                    // If it's some other object format, try to extract data
                    const possibleDataArray = Object.values(response.data).find(val => Array.isArray(val));
                    if (possibleDataArray) {
                        setCertificates(possibleDataArray.slice(0, entriesPerPage));
                        setTotalPages(Math.ceil(possibleDataArray.length / entriesPerPage));
                        setTotalEntries(possibleDataArray.length);
                    } 
                    
                    else {
                        // If we can't find an array, try to convert the object to an array
                        const dataArray = Object.entries(response.data).map(([key, value]) => {
                            if (typeof value === 'object') {
                                return { id: key, ...value };
                            }
                            return null;
                        }).filter(Boolean);
                        
                        if (dataArray.length > 0) {
                            setCertificates(dataArray.slice(0, entriesPerPage));
                            setTotalPages(Math.ceil(dataArray.length / entriesPerPage));
                            setTotalEntries(dataArray.length);
                        } 
                        
                        else {
                            throw new Error("Could not extract certificate data from response");
                        }
                    }
                } else {
                    throw new Error("Unexpected response format");
                }
            } else {
                throw new Error("No data in response");
            }
        } catch (error) {
            //console.error("Fetch error:", error);
            if (error.response) {
                // Store raw error response for debugging
                setRawApiResponse(error.response.data);
                
                // Try token refresh if unauthorized
                if (error.response.status === 401 && retry === 0) {
                    const newToken = await refreshToken();
                    if (newToken) {
                        // Retry with new token
                        return fetchCertificates(retry + 1);
                    }
                }
            }
            
            if (error.response && error.response.data && error.response.data.message === 'Unauthenticated.') {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch certificates';
                //console.error("Error message:", errorMessage);
                setError(errorMessage);
                
                // Retry logic for network issues
                if (retry < 2 && (!error.response || error.response.status >= 500)) {
                    setRetryCount(retry + 1);
                    setTimeout(() => fetchCertificates(retry + 1), 1000 * (retry + 1));
                } else {
                    setCertificates([]);
                }
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCertificates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, entriesPerPage, navigate]);

    // Function to format JSON for display
    const formatJSON = (json) => {
        try {
            return JSON.stringify(json, null, 2);
        } catch (e) {
            return "Unable to format JSON";
        }
    };

    const handleToggleRawResponse = () => {
        setShowRawResponse(!showRawResponse);
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    
        const toggleSidebar = () => {
            setIsSidebarOpen(!isSidebarOpen);
        }

    return (
        <>
        <ToastContainer position="top-right" autoClose={3000} />
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
                        </div>  

                        <div className="dashboard-content-table">
                            {deleteAlert && (
                                <div className="alert alert-success">Certificate deleted successfully!</div>
                            )}
                            {createAlert && (
                                <div className="alert alert-success">Certificate created successfully!</div>
                            )}
                            {updateAlert && (
                                <div className="alert alert-success">Certificate updated successfully!</div>
                            )}
                            {error && (
                                <div className="alert alert-danger">
                                    <p>{error}</p>
                                    <button 
                                        className="btn btn-sm btn-info me-2" 
                                        onClick={() => fetchCertificates()}
                                    >
                                        Retry
                                    </button>
                                    <button 
                                        className="btn btn-sm btn-warning me-2" 
                                        onClick={testApiConnection}
                                    >
                                        Test API Connection
                                    </button>
                                    <button 
                                        className="btn btn-sm btn-primary me-2" 
                                        onClick={refreshToken}
                                    >
                                        Refresh Token
                                    </button>
                                    <button 
                                        className="btn btn-sm btn-secondary" 
                                        onClick={handleToggleRawResponse}
                                    >
                                        {showRawResponse ? 'Hide' : 'Show'} Raw Response
                                    </button>
                                </div>
                            )}
                            
                            {apiStatus === "testing" && (
                                <div className="alert alert-info">
                                    Testing API connection...
                                </div>
                            )}
                            {apiStatus === "connected" && (
                                <div className="alert alert-success">
                                    API connection successful!
                                </div>
                            )}
                            {apiStatus === "disconnected" && (
                                <div className="alert alert-danger">
                                    API connection failed. Please check your internet connection.
                                </div>
                            )}
                            
                            {/* {showRawResponse && (
                                <div className="mb-3 p-3 border rounded bg-light">
                                    <h5>Raw API Response:</h5>
                                    <pre style={{ maxHeight: '300px', overflow: 'auto' }}>
                                        {formatJSON(rawApiResponse)}
                                    </pre>
                                </div>
                            )} */}
                            
                            {retryCount > 0 && (
                                <div className="alert alert-info">
                                    Retrying... Attempt {retryCount}/2
                                </div>
                            )}
                            
                            <Row>
                                <div className="d-flex justify-content-between align-items-center listing-header">
                                    <h1 className="dashboard-content-title mb-0 h3 fw-bold text-capitalize headingFont">Professional Affiliations Certificates</h1>
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
                                        className="form-select ms-2 d-inline-block w-auto"
                                        value={entriesPerPage}
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                    </select>
                                </Col>
                                <Col xxl={3} xl={3} lg={3} md={3} sm={12} className="text-end border rounded-3">
                                    <input 
                                        type="text" 
                                        placeholder="Search..." 
                                        value={searchTerm} 
                                        onChange={handleSearchChange}
                                        id="professionalAffiliationsCertificatesSearch"
                                        name="professionalAffiliationsCertificatesSearch"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <div className="table-main-div">         
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>name</th>
                                        <th>description</th>
                                        <th>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="4" className="text-center">Loading...</td>
                                        </tr>
                                    ) : error ? (
                                        <tr>
                                            <td colSpan="4" className="text-center text-danger">{error}</td>
                                        </tr>
                                    ) : filteredCertificates.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="text-center">No certificates found</td>
                                        </tr>
                                    ) : (filteredCertificates.map((certificate, index) => (
                                            <tr key={certificate?.id || index}>
                                                <td>{certificate?.id}</td>
                                                <td>{certificate?.name}</td>
                                                <td>{certificate?.description}</td>
                                                <td>
                                                    <button className="btn btn-success me-2" onClick={() => handleEdit(certificate)}><FaEdit /></button>
                                                    <button className="btn btn-danger" onClick={() => handleDelete(certificate.id) && setDeleteAlert(true)}><FaTrash /></button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                            </div>
                            
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    {!searchTerm ? (
                                        <>Showing {certificates.length > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0} to {Math.min(currentPage * entriesPerPage, totalEntries)} of {totalEntries} entries</>
                                    ) : (
                                        <>Showing {filteredCertificates.length} filtered results</>
                                    )}
                                </div>
                                <div>
                                    <button 
                                        onClick={() => setCurrentPage(currentPage - 1)} 
                                        disabled={currentPage === 1} 
                                        className="btn btn-previous"
                                    >
                                        Previous
                                    </button>
                                    <span> Page {currentPage} of {totalPages || 1} </span>
                                    <button 
                                        onClick={() => setCurrentPage(currentPage + 1)} 
                                        disabled={currentPage >= totalPages} 
                                        className="btn btn-next"
                                    >
                                        Next
                                    </button>
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
                                            <h2 className="dashboard-all-listing-create-form-title mb-0 h5 fw-bold default-font text-capitalize">create Professional Affiliations Certificates</h2>
                                        </div>
                                    </Row>
                                    <hr />

                                    <div className="dashboard-all-listing-create-form-body">
                                        <form onSubmit={handleFormSubmit}>
                                            <Row>
                                                <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="name" className="form-label text-capitalize fw-bold small">name <sup className="text-danger">*</sup></label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            id="name" 
                                                            name="name" 
                                                            value={formData.name}
                                                            onChange={handleInputChange}
                                                            required 
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="description" className="form-label text-capitalize fw-bold small">Description</label>
                                                        <textarea 
                                                            className="form-control" 
                                                            id="description" 
                                                            name="description" 
                                                            value={formData.description}
                                                            onChange={handleInputChange}
                                                            rows="3"
                                                        ></textarea>
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                                <div className="form-group my-2">
                                                    <input 
                                                        type="submit" 
                                                        className="text-white rounded-0 bg-jetGreen border-0 py-2 px-3" 
                                                        value={formMode === 'create' ? 'Create' : 'Update'} 
                                                    />
                                                </div>
                                            </Col>
                                        </form>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </Row>
            </Container>
        </>
    );
};

export default ProfessionalAffiliationsCertificates;