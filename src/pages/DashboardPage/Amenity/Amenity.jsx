import { React, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
//import { FaWheelchair, FaParking, FaWifi, MdPets, FaChild, FaPhone, FaFirstAid, FaPlug, FaToilet, FaRestroom, FaChair, FaCoffee} from "react-icons/fa";

//import { MdPets } from "react-icons/md";


const Amenity = () => {
    // const icons = [
    //     { id: 'wheelchair', icon: FaWheelchair, label: 'Wheelchair' },
    //     { id: 'parking', icon: FaParking, label: 'Parking' },
    //     { id: 'wifi', icon: FaWifi, label: 'Wifi' },
    //     { id: 'child', icon: FaChild, label: 'Child' },
    //     { id: 'phone', icon: FaPhone, label: 'Phone' },
    //     { id: 'first-aid', icon: FaFirstAid, label: 'First Aid' },
    //     { id: 'plug', icon: FaPlug, label: 'Plug' },
    //     { id: 'toilet', icon: FaToilet, label: 'Toilet' },
    //     { id: 'restroom', icon: FaRestroom, label: 'Restroom' },
    //     { id: 'chair', icon: FaChair, label: 'Chair' },
    //     { id: 'coffee', icon: FaCoffee, label: 'Coffee' },
    //     { id: 'pets', icon: MdPets, label: 'Pets' }
    //   ];

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

    // const [selectedIcon, setSelectedIcon] = useState('');
    // const filteredIcons = icons.filter(icon =>
    //     icon.label.toLowerCase().includes(searchTerm.toLowerCase())
    // );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedIcon) {
      onSelectIcon(selectedIcon);
    }
  };

  

    return (
        <>
            <Container>
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
                                    <h1 className="dashboard-content-title mb-0 h5 fw-bold default-font text-capitalize">all Amenities</h1>
                                    <button 
                                        className="btn bg-jetGreen text-white all-listing-create-button d-flex align-items-center justify-content-center" 
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
                                        <th>icon</th>
                                        <th>name</th>
                                        <th>slug</th>
                                        <th>status</th>
                                        <th>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentEntries.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{entry.id}</td>
                                            <td>{entry.icon}</td>
                                            <td>{entry.name}</td>
                                            <td>{entry.slug}</td>
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
                                            className="btn bg-jetGreen text-white all-listing-create-button all-listing-create-form-back-button text-capitalize d-flex align-items-center justify-content-center me-2" 
                                            onClick={() => {
                                                document.querySelector('.sidebar-listing-form').style.display = 'none';
                                                document.querySelector('.dashboard-content-table').style.display = 'block';
                                            }}
                                        >
                                            <span className="all-listing-create-form-back-button-arrow">&larr;</span> Back 
                                        </button>
                                        <h2 className="dashboard-all-listing-create-form-title mb-0 h5 fw-bold default-font text-capitalize">create amenities</h2>
                                    </div>
                                </Row>
                                <hr />

                                <div className="dashboard-all-listing-create-form-body">
                                    <form>
                                        <Row>
                                            {/* <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                <div className="form-group my-2">
                                                    <label htmlFor="amenityIcon" className="form-label text-capitalize fw-bold small">icons <sup className="text-danger">*</sup></label>
                                                    
                                                    <div className="icon-picker">
                                                        <div className="search-box">
                                                            <input
                                                                type="text"
                                                                placeholder="Search icons..."
                                                                value={searchTerm}
                                                                name="amenityIconSearch"
                                                                id="amenityIconSearch"
                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                                style={{ padding: '8px', marginBottom: '16px', width: '100%' }}
                                                            />
                                                            </div>

                                                            <div className="icons-grid" style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: 'repeat(8, 1fr)',
                                                            gap: '16px',
                                                            marginBottom: '16px'
                                                            }}>
                                                            {filteredIcons.map(({ id, icon: Icon, label }) => (
                                                                <button
                                                                key={id}
                                                                type="button"
                                                                name="amenityIcon"
                                                                id="amenityIcon"
                                                                onClick={() => setSelectedIcon(id)}
                                                                style={{
                                                                    padding: '12px',
                                                                    border: selectedIcon === id ? '2px solid #646cff' : '1px solid #ccc',
                                                                    borderRadius: '8px',
                                                                    background: 'var(--white)',
                                                                    cursor: 'pointer',
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'center',
                                                                    gap: '8px'
                                                                }}
                                                                >
                                                                <Icon size={24} />
                                                                <span style={{ fontSize: '12px' }}>{label}</span>
                                                                </button>
                                                            ))}
                                                            </div>

                                                            <button
                                                            type="submit"
                                                            disabled={!selectedIcon}
                                                            name="amenityIconSubmit"
                                                            id="amenityIconSubmit"
                                                            style={{
                                                                width: '100%',
                                                                padding: '8px',
                                                                backgroundColor: selectedIcon ? 'var(--jetGreen)' : '#ccc',
                                                                color: 'var(--white)',
                                                                border: 'none',
                                                                borderRadius: '0px',
                                                                cursor: selectedIcon ? 'pointer' : 'not-allowed'
                                                            }}
                                                            >
                                                            Select Icon
                                                        </button>
                                                    </div>
                                                </div>
                                            </Col> */}
                                        </Row>

                                        <Row>
                                            <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                <div className="form-group my-2">
                                                    <label htmlFor="amenityName" className="form-label text-capitalize fw-bold small">name <sup className="text-danger">*</sup></label>
                                                    <input type="text" className="form-control" id="amenityName" name="amenityName" required />
                                                </div>
                                            </Col>

                                            <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                <div className="form-group my-2">
                                                    <label htmlFor="amenityStatus" className="form-label text-capitalize fw-bold small">status <sup className="text-danger">*</sup></label>
                                                    <select className="form-control text-capitalize" id="amenityStatus" name="amenityStatus" required>
                                                        <option value="active">active</option>
                                                        <option value="inactive">inactive</option>
                                                    </select>
                                                </div>
                                            </Col>
                                        
                                            
                                        </Row>

                                        <Row>
                                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                <div className="form-group my-2">
                                                    <label htmlFor="amenityParent" className="form-label text-capitalize fw-bold small">parent amenity <sup className="text-danger">*</sup></label>
                                                    <input type="text" className="form-control" id="amenityParent" name="amenityParent" />
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                <div className="form-group my-2 d-flex flex-column align-items-start">
                                                    <label htmlFor="amenityDescription" className="form-label text-capitalize fw-bold small">Description</label>
                                                    <textarea className="form-control" id="amenityDescription" name="amenityDescription"></textarea>
                                                </div>
                                            </Col>
                                        </Row>
                                        
                                        <Row>
                                            <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                                <div className="form-group my-2">
                                                    <input type="submit" className="btn text-white rounded-0 bg-jetGreen" value="Create" />
                                                </div>
                                            </Col>
                                        </Row>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Amenity;