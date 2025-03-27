import { React, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { FaEdit, FaTrash } from "react-icons/fa";
import DashboardHeader from "../DashboardHeader/DashboardHeader";


const Treatment = () => {
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


    const [pricingAndDurationVariants, setPricingAndDurationVariants] = useState([{}]);
    const [variantPriceTypes, setVariantPriceTypes] = useState(['free']);

    const handlePricingAndDurationAmount = (e, index) => {
        const newPriceTypes = [...variantPriceTypes];
        newPriceTypes[index] = e.target.value;
        setVariantPriceTypes(newPriceTypes);
      };
    
      const addVariant = (e) => {
        e.preventDefault();
        setPricingAndDurationVariants([...pricingAndDurationVariants, {}]);
        setVariantPriceTypes([...variantPriceTypes, 'free']);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', { pricingAndDurationVariants, variantPriceTypes });
      };

      const [durationOptions, setDurationOptions] = useState([
        { id: 0, name: "5 minutes" },
        { id: 1, name: "10 minutes" },
        { id: 2, name: "15 minutes" },
        { id: 3, name: "20 minutes" },
        { id: 4, name: "25 minutes" },
        { id: 5, name: "30 minutes" },
        { id: 6, name: "35 minutes" },
        { id: 7, name: "40 minutes" },
        { id: 8, name: "45 minutes" },
        { id: 9, name: "50 minutes" },
        { id: 10, name: "55 minutes" },
        { id: 11, name: "1 hour" },
        { id: 12, name: "1 hour 5 minutes" },
        { id: 13, name: "1 hour 10 minutes" },
        { id: 14, name: "1 hour 15 minutes" },
        { id: 15, name: "1 hour 20 minutes" },
        { id: 16, name: "1 hour 25 minutes" },
        { id: 17, name: "1 hour 30 minutes" },
        { id: 18, name: "1 hour 35 minutes" },
        { id: 19, name: "1 hour 40 minutes" },
        { id: 20, name: "1 hour 45 minutes" },
        { id: 21, name: "1 hour 50 minutes" },
        { id: 22, name: "1 hour 55 minutes" },
        { id: 23, name: "2 hours" },
        { id: 24, name: "2 hours 15 minutes" },
        { id: 25, name: "2 hours 30 minutes" },
        { id: 26, name: "2 hours 45 minutes" },
        { id: 27, name: "3 hours" },
        { id: 28, name: "3 hours 15 minutes" },
        { id: 29, name: "3 hours 30 minutes" },
        { id: 30, name: "3 hours 45 minutes" },
        { id: 31, name: "4 hours" },
        { id: 32, name: "4 hours 15 minutes" },
        { id: 33, name: "4 hours 30 minutes" },
        { id: 34, name: "4 hours 45 minutes" },
        { id: 35, name: "5 hours" },
        { id: 36, name: "5 hours 30 minutes" },
        { id: 37, name: "6 hours" },
        { id: 38, name: "6 hours 30 minutes" },
        { id: 39, name: "7 hours" },
        { id: 40, name: "7 hours 30 minutes" },
        { id: 41, name: "8 hours" },
        { id: 42, name: "9 hours" },
        { id: 43, name: "10 hours" },
        { id: 44, name: "11 hours" },
        { id: 45, name: "12 hours" },
    ]);

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
                                    <h1 className="dashboard-content-title mb-0 h3 fw-bold text-capitalize headingFont">Treatment</h1>
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
                                        value={searchTerm} 
                                        onChange={handleSearchChange} 
                                    />
                                </Col>
                            </Row>
                            

                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>name</th>
                                        <th>service type</th>
                                        <th>category</th>
                                        <th>status</th>
                                        <th>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentEntries.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{entry.id}</td>
                                            <td>{entry.name}</td>
                                            <td>{entry.serviceType}</td>
                                            <td>{entry.category}</td>
                                            <td>{entry.status}</td>
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
                                            <h2 className="dashboard-all-listing-create-form-title mb-0 h5 fw-bold default-font text-capitalize">create treatment</h2>
                                        </div>
                                    </Row>
                                    <hr />

                                    <div className="dashboard-all-listing-create-form-body">
                                        <form>
                                            <Row>
                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
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
                                                        <label htmlFor="serviceType" className="form-label text-capitalize fw-bold small">service type</label>
                                                        <input type="text" className="form-control" id="serviceType" name="serviceType" required />
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="treatmentCategory" className="form-label text-capitalize fw-bold small">treatment category <sup className="text-danger">*</sup></label>
                                                        <select name="treatmentCategory" id="treatmentCategory" className="form-control text-capitalize" required>
                                                            <option value="">active</option>
                                                            <option value="1">inactive</option>
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
                                                    <div className="form-group my-2">
                                                        <div className="pricing-and-duration">
                                                            <strong className="d-block">Pricing and duration</strong>
                                                            <hr />
                                                            
                                                            <div className="pricing-and-duration-form">
                                                            {pricingAndDurationVariants.map((variant, index) => (
                                                                <div className="pricing-and-duration-form-row mt-2">
                                                                    <ol className="d-flex align-items-center gap-3 ps-0 mb-0" >
                                                                        <li className="pricing-and-duration-hours" >
                                                                            <label htmlFor="duration" className="form-label text-capitalize fw-bold small">Duration <sup className="text-danger">*</sup></label>
                                                                            <select name={`duration-${index}`} id={`duration-${index}` } className="form-control text-capitalize" required>
                                                                                    {durationOptions.map((duration, index) => (
                                                                                        <option key={index} value={duration.id} className="text-capitalize">{duration.name}</option>
                                                                                    ))}
                                                                                </select>
                                                                        </li>
                                                                        <li className="pricing-and-duration-type">
                                                                            <label htmlFor={`priceType-${index}`} className="form-label text-capitalize fw-bold small">price type <sup className="text-danger">*</sup></label>   
                                                                            <select 
                                                                                name={`priceType-${index}`} 
                                                                                id={`priceType-${index}`} 
                                                                                className="form-control text-capitalize" 
                                                                                required
                                                                                value={variantPriceTypes[index]}
                                                                                onChange={(e) => handlePricingAndDurationAmount(e, index)}
                                                                                >
                                                                                <option value="free" className="text-capitalize">free</option>
                                                                                <option value="from" className="text-capitalize">from</option>
                                                                                <option value="fixed" className="text-capitalize">fixed</option>
                                                                            </select>
                                                                        </li>
                                                                        {variantPriceTypes[index] !== 'free' && (
                                                                            <li className="pricing-and-duration-amount">
                                                                                <label htmlFor={`pricingAmount-${index}`} className="form-label text-capitalize fw-bold small">price <sup className="text-danger">*</sup></label>    
                                                                                <input type="number" className="form-control" id={`pricingAmount-${index}`} name={`pricingAmount-${index}`} required />
                                                                            </li>
                                                                        )}
                                                                    </ol>
                                                                </div>
                                                                ))}
                                                                <div className="pricing-and-duration-form-button">
                                                                    <button className="btn bg-jetGreen mt-2 text-capitalize rounded-0 blackHoverEffect" onClick={addVariant}> &#43; Add variant</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                                    <div className="form-group my-2">
                                                        <input type="submit" className="text-white rounded-0 bg-jetGreen border-0 py-2 px-3" value="Create" onClick={handleSubmit} />
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

export default Treatment;