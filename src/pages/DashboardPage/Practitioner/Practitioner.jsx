import { React, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const Practitioner = () => {

    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [entries, setEntries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleEntriesPerPageChange = (event) => {
        setEntriesPerPage(Number(event.target.value));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredEntries = entries.filter(entry => 
        entry.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);
    const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);


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
                                    <select id="entriesPerPage" onChange={handleEntriesPerPageChange} value={entriesPerPage}>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                    </select>
                                </Col>
                                <Col className="text-end">
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
                                        <th>id</th>
                                        <th>name</th>
                                        <th>qualification</th>
                                        <th>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentEntries.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{entry.id}</td>
                                            <td>{entry.name}</td>
                                            <td>{entry.qualification}</td>
                                            <td>
                                                <button className="btn btn-success"><FaEdit /></button>
                                                <button className="btn btn-danger"><FaTrash /></button>
                                            </td>
                                        </tr>
                                    ))}
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
                                        <h2 className="dashboard-all-listing-create-form-title mb-0 h5 fw-bold default-font text-capitalize">create Practitioner</h2>
                                    </div>
                                </Row>
                                <hr />

                                <div className="dashboard-all-listing-create-form-body">
                                    <form>
                                        <Row>
                                            <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                <div className="form-group my-2">
                                                    <label htmlFor="practitionerName" className="form-label text-capitalize fw-bold small">name <sup className="text-danger">*</sup></label>
                                                    <input type="text" className="form-control" id="practitionerName" name="practitionerName" required />
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                <div className="form-group my-2">
                                                    <label htmlFor="practitionerQualification" className="form-label text-capitalize fw-bold small">qualification and level <sup className="text-danger">*</sup></label>
                                                    <input type="text" className="form-control" id="practitionerQualification" name="practitionerQualification" required />
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                <div className="form-group my-2">
                                                    <label htmlFor="practitionerCertificate" className="form-label text-capitalize fw-bold small">certificate</label>
                                                    <input type="text" className="form-control" id="practitionerCertificate" name="practitionerCertificate" required />
                                                </div>
                                            </Col>
                                        </Row>
                                        
                                        <Row>
                                            <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                <div className="form-group my-2 d-flex align-items-flex-start">
                                                    <input type="checkbox" className="form-control" id="confirmBox" name="confirmBox" required />
                                                    <span htmlFor="confirmBox" className="form-label text-capitalize fw-normal small">I confirm that I have obtained consent from the practitioner listed on this business profile to display their professional affiliations publicly on Check a Treatment.</span>
                                                </div>
                                            </Col>
                                        </Row>
                                        
                                        <Row>
                                            <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                                <div className="form-group my-2">
                                                    <input type="submit" className="text-white rounded-0 bg-jetGreen border-0 py-2 px-3" value="Create" />
                                                </div>
                                            </Col>
                                        </Row>
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

export default Practitioner;
