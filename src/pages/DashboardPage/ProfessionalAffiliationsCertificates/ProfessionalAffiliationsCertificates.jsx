import { React, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { FaEdit, FaTrash } from 'react-icons/fa';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from "../DashboardHeader/DashboardHeader";

const ProfessionalAffiliationsCertificates = () => {

    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [entries, setEntries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [totalEntries, setTotalEntries] = useState(0);
    const navigate = useNavigate();

    const handleEntriesPerPageChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredEntries = entries.filter(entry => 
        entry.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate page numbers
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredEntries.sort((a, b) => b.id - a.id).slice(indexOfFirstEntry, indexOfLastEntry);

    // We are fetching the data from API and displaying it in the table
    // const certificates = async () => {
    //     setLoading(true);
    //     setError(null);

    //     const token = (localStorage.getItem("token"));
    //     if (!token) {
    //         navigate('/login');
    //         return;
    //     }

    //     const parsedToken = JSON.parse(token);
    //     try {
    //         const response = await axios.get(`http://localhost:8000/api/professional-certificate?page=${currentPage}&per_page=${entriesPerPage}`,
    //         {
    //             headers: {
    //                 'Authorization': `Bearer ${parsedToken}`,
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'Access-Control-Allow-Origin': '*',
    //                 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    //             }
    //         });

    //         if (response.data) {
    //             setEntries(response.data);
    //             setTotalPages(response.data.last_page || 1);
    //             setTotalEntries(response.data.total || 0);
    //         } else {
    //             setError('Invalid data format received from server');
    //         }
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error('Error fetching certificates:', error);
    //         if (error.response?.status === 401) {
    //             localStorage.removeItem("token");
    //             navigate('/login');
    //         }
    //         setError(error.message || 'Failed to fetch certificates');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     certificates();
    // }, [currentPage, entriesPerPage]);


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
                        </div>  

                        <div className="dashboard-content-table">
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
                                        className={`setEntriesPerPage ${entriesPerPage}`}
                                        defaultValue={entriesPerPage}
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                    </select>
                                </Col>
                                <Col xxl={3} xl={3} lg={3} md={3} sm={12} className="text-end">
                                    <input 
                                        type="text" 
                                        placeholder="Search..." 
                                        value={searchTerm} 
                                        onChange={handleSearchChange}
                                        id="professionalAffiliationsCertificatesSearch"
                                        name="professionalAffiliationsCertificatesSearch"
                                    />
                                </Col>
                            </Row>

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
                                    {/* {currentEntries.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{entry.id}</td>
                                            <td>{entry.name}</td>
                                            <td>{entry.description}</td>
                                            <td>
                                                <button className="btn btn-success"><FaEdit /></button>
                                                <button className="btn btn-danger"><FaTrash /></button>
                                            </td>
                                        </tr>
                                    ))} */}

                                    <tr>
                                        <td>1</td>
                                        <td>Rahul</td>
                                        <td>Software Engineer</td>
                                        <td>
                                            <button className="btn btn-success"><FaEdit /></button>
                                            <button className="btn btn-danger"><FaTrash /></button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>2</td>
                                        <td>Talha</td>
                                        <td>AWS Certified</td>
                                        <td>
                                            <button className="btn btn-success"><FaEdit /></button>
                                            <button className="btn btn-danger"><FaTrash /></button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>3</td>
                                        <td>Aman</td>
                                        <td>Project Manager</td>
                                        <td>
                                            <button className="btn btn-success"><FaEdit /></button>
                                            <button className="btn btn-danger"><FaTrash /></button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>4</td>
                                        <td>Sunil</td>
                                        <td>Graphic Designer</td>
                                        <td>
                                            <button className="btn btn-success"><FaEdit /></button>
                                            <button className="btn btn-danger"><FaTrash /></button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>5</td>
                                        <td>Raj Kumar</td>
                                        <td>Software Developer</td>
                                        <td>
                                            <button className="btn btn-success"><FaEdit /></button>
                                            <button className="btn btn-danger"><FaTrash /></button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>6</td>
                                        <td>Raj Singh</td>
                                        <td>Software Developer</td>
                                        <td>
                                            <button className="btn btn-success"><FaEdit /></button>
                                            <button className="btn btn-danger"><FaTrash /></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredEntries.length)} of {filteredEntries.length} entries
                                </div>
                                <div>
                                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="btn btn-previous">Previous</button>
                                    <span> Page {currentPage} of {totalPages} </span>
                                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="btn btn-next">Next</button>
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
                                        <form>
                                            <Row>
                                                <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="name" className="form-label text-capitalize fw-bold small">name <sup className="text-danger">*</sup></label>
                                                        <input type="text" className="form-control" id="name" name="name" required />
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="Description" className="form-label text-capitalize fw-bold small">Description</label>
                                                        <textarea type="text" className="form-control" id="Description" name="Description" rows="3"></textarea>
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                                <div className="form-group my-2">
                                                    <input type="submit" className="text-white rounded-0 bg-jetGreen border-0 py-2 px-3" value="Create" />
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