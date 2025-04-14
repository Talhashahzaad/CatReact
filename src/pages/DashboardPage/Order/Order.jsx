import {React, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "../Dashboard.css";
import axios from "axios";
import { $siteURL } from "../../../common/SiteURL";


const Order = () =>{
    const [entries, setEntries] = useState([5]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);
    const totalPages = Math.ceil(entries.length / entriesPerPage);
    
    const handleEntriesPerPageChange = (event) => {
        setEntriesPerPage(parseInt(event.target.value));
    };

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const [profileInfo, setProfileInfo] = useState(null);

    useEffect(() => {
        const fetchProfileInfo = async () => {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.get(`${$siteURL}/api/user-profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setProfileInfo(response.data);
        };
        fetchProfileInfo();
    }, []);

    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    
        const toggleSidebar = () => {
            setIsSidebarOpen(!isSidebarOpen);
        }

    return(
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
                            <div className="dashboard-sidebar-header-top">
                                    <div className="dash-profile-picture d-flex justify-content-flex-end align-items-center text-end float-end">
                                    <figure className="mb-0">
                                        <img src={`${$siteURL}${profileInfo?.user?.avatar}`} alt="Profile" />
                                    </figure>
                                    <div className="d-flex flex-column ms-2 text-white">
                                        {profileInfo && (
                                            <p className="text-capitalize text-dark mb-0">hi, {profileInfo.user.name}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-content-breadcrumbs w-100 h-auto d-block py-3 px-2 position-relative bg-green25 mb-3 rounded">
                                <Breadcrumb />
                            </div>

                            <h1 className="dashboard-content-title mb-0 h3 fw-bold text-capitalize headingFont">order</h1>
                            <hr />

                            <div className="dashboard-content-table">
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
                                        <tr key="">
                                            <th>id</th>
                                            <th>user name</th>
                                            <th>package</th>
                                            <th>paid</th>
                                            <th>paid in</th>
                                            <th>payment method</th>
                                            <th>payment status</th>
                                            <th>action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Map through entries data to display rows */}
                                        {currentEntries.map((entry, index) => (
                                            <tr key={index}>
                                                <td>{entry.id}</td>
                                                <td>{entry.user_name}</td>
                                                <td>{entry.package}</td>
                                                <td>{entry.paid}</td>
                                                <td>{entry.paid_in}</td>
                                                <td>{entry.payment_method}</td>
                                                <td>{entry.payment_status}</td>
                                                <td>
                                                    <button className="btn btn-success"><FaEdit /></button>
                                                    <button className="btn btn-danger"><FaTrash /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* Pagination controls */}
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
                        </div>
                    </div>
                </div>
                </Row>
            </Container>
        </>
    )
}

export default Order;