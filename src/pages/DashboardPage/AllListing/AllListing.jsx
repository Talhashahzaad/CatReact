import React, { useState, useRef, useCallback } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { FaEdit, FaTrash } from "react-icons/fa";
import defaultImage from "../../../images/defaultPicture.jpg";
import defaultThumbnailImage from "../../../images/defaultPicture.jpg";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';


const AllListing = () => {
    const [bodyPicture, setBodyPicture] = useState(defaultImage);
    const [thumbnailImage, setThumbnailImage] = useState(defaultThumbnailImage);
    const [description, setDescription] = useState('');
    const [entries, setEntries] = useState([5]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [search, setSearch] = useState('');
    //const wysiwygRef = useRef(null);

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);
    const totalPages = Math.ceil(entries.length / entriesPerPage);

    const [value, setValue] = useState('');
    

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

    const handleImageChange = useCallback((event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setBodyPicture(imageUrl);
        }
    }, []);

    const handleThumbnailImageChange = useCallback((event) => {
        const file = event.target.files[0];
        if (file) {
            const thumbnailImageUrl = URL.createObjectURL(file);
            setThumbnailImage(thumbnailImageUrl);
        }
    }, []);

    const handleDescriptionChange = useCallback((value) => {
        setDescription(value);
    }, []);

    // useEffect(() => {
    //     // Suppress the specific DOMNodeInserted warning
    //     const originalError = console.error;
    //     console.error = (...args) => {
    //         if (args[0]?.includes('DOMNodeInserted')) {
    //             return;
    //         }
    //         originalError.apply(console, args);
    //     };

    //     return () => {
    //         console.error = originalError;
    //     };
    // }, []);

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

                                <div className="dashboard-content-table">
                                    <Row>
                                        <div className="d-flex justify-content-between align-items-center listing-header">
                                            <h1 className="dashboard-content-title mb-0 h3 fw-bold text-capitalize headingFont">All Listing</h1>
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
                                                <th>image</th>
                                                <th>title</th>
                                                <th>category</th>
                                                <th>location</th>
                                                <th>status</th>
                                                <th>is featured</th>
                                                <th>is verified</th>
                                                <th>by</th>
                                                <th>action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentEntries.map((entry, index) => (
                                                <tr key={index}>
                                                    <td>{entry.id}</td>
                                                    <td><img src={entry.image} alt="" className="img-fluid" /></td>
                                                    <td>{entry.title}</td>
                                                    <td>{entry.category}</td>
                                                    <td>{entry.location}</td>
                                                    <td>{entry.status}</td>
                                                    <td>{entry.isFeatured ? <span className="badge bg-success">yes</span> : <span className="badge bg-danger">no</span>}</td>
                                                    <td>{entry.isVerified ? <span className="badge bg-success">yes</span> : <span className="badge bg-danger">no</span>}</td>
                                                    <td>{entry.by}</td>
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
                                                <h2 className="dashboard-all-listing-create-form-title mb-0 h5 fw-bold default-font text-capitalize">create listing</h2>
                                            </div>
                                        </Row>
                                        <hr />

                                        <div className="dashboard-all-listing-create-form-body">
                                            <form>
                                                <Row>
                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="bodyPicture" className="form-label text-capitalize fw-bold small">body picture <sup className="text-danger">*</sup></label>
                                                            <div className="dashboard-all-listing-create-form-body-row-image-upload position-relative">
                                                                <img src={bodyPicture} alt="" className="img-fluid all-listing-create-form-body-row-image-upload-img" />
                                                                <input 
                                                                    type="file" 
                                                                    className="position-absolute top-0 start-0 w-100 h-100 opacity-0 all-listing-create-form-body-row-image-upload-input" 
                                                                    title="Choose Your Image" 
                                                                    id="bodyPicture"
                                                                    name="bodyPicture"
                                                                    onChange={handleImageChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="thumbnailImage" className="form-label text-capitalize fw-bold small">background image <sup className="text-danger">*</sup></label>
                                                            <div className="dashboard-all-listing-create-form-body-row-image-upload position-relative">
                                                                <img src={thumbnailImage} alt="" className="img-fluid all-listing-create-form-body-row-image-upload-img" />
                                                                <input 
                                                                    type="file" 
                                                                    className="position-absolute top-0 start-0 w-100 h-100 opacity-0 all-listing-create-form-body-row-image-upload-input" 
                                                                    title="Choose Your Image" 
                                                                    id="thumbnailImage"
                                                                    name="thumbnailImage"
                                                                    onChange={handleThumbnailImageChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="title" className="form-label text-capitalize fw-bold small">title <sup className="text-danger">*</sup></label>
                                                            <input type="text" className="form-control" id="title" name="title" required />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="category" className="form-label text-capitalize fw-bold small">category <sup className="text-danger">*</sup></label>
                                                            <select name="category" id="category" className="form-control text-capitalize" required>
                                                                <option value="">select category</option>
                                                                <option value="1">category 1</option>
                                                            </select>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="location" className="form-label text-capitalize fw-bold small">location <sup className="text-danger">*</sup></label>
                                                            <select name="location" id="location" className="form-control text-capitalize" required>
                                                                <option value="">select location</option>
                                                                <option value="1">location 1</option>
                                                            </select>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="fullAddress" className="form-label text-capitalize fw-bold small">full address <sup className="text-danger">*</sup></label>
                                                            <input type="text" className="form-control" id="fullAddress" name="fullAddress" required />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="phoneNumber" className="form-label text-capitalize fw-bold small">phone number <sup className="text-danger">*</sup></label>
                                                            <input type="tel" minLength={7} maxLength={12} className="form-control" id="phoneNumber" name="phoneNumber" required />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="emailAddress" className="form-label text-capitalize fw-bold small">email address <sup className="text-danger">*</sup></label>
                                                            <input type="email" className="form-control" id="emailAddress" name="emailAddress" required />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="websiteURL" className="form-label text-capitalize fw-bold small">website URL</label>
                                                            <input type="url" className="form-control" id="websiteURL" name="websiteURL" />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={3} xl={3} lg={3} md={3} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="facebookURL" className="form-label text-capitalize fw-bold small">facebook URL</label>
                                                            <input type="url" className="form-control" id="facebookURL" name="facebookURL" />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={3} xl={3} lg={3} md={3} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="instagramURL" className="form-label text-capitalize fw-bold small">instagram URL</label>
                                                            <input type="url" className="form-control" id="instagramURL" name="instagramURL" />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={3} xl={3} lg={3} md={3} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="tiktokURL" className="form-label text-capitalize fw-bold small">tiktok URL</label>
                                                            <input type="url" className="form-control" id="tiktokURL" name="tiktokURL" />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={3} xl={3} lg={3} md={3} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="youtubeURL" className="form-label text-capitalize fw-bold small">youtube URL</label>
                                                            <input type="url" className="form-control" id="youtubeURL" name="youtubeURL" />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="professionalAffiliations" className="form-label text-capitalize fw-bold small">Professional Affiliations</label>
                                                            <input type="text" className="form-control" id="professionalAffiliations" name="professionalAffiliations" />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="attachment" className="form-label text-capitalize fw-bold small">attachment</label>
                                                            <input type="file" className="form-control form-inside-file" id="attachment" name="attachment" />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="choosePractitioner" className="form-label text-capitalize fw-bold small">Choose Practitioner</label>
                                                            <input type="text" className="form-control" id="choosePractitioner" name="choosePractitioner" />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="amenities" className="form-label text-capitalize fw-bold small">Amenities</label>
                                                            <input type="text" className="form-control" id="amenities" name="amenities" />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2 react-quill-editor" id="react-quill-editor-element">
                                                            <label htmlFor="froalaRefDescription" className="form-label text-capitalize fw-bold small">
                                                                description<sup className="text-danger">*</sup>
                                                            </label>
                                                            <FroalaEditorComponent 
                                                                tag='textarea'
                                                                model={value}
                                                            />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2 react-quill-editor">
                                                            <label htmlFor="GoogleMapEmbedCode" className="form-label text-capitalize fw-bold small">Google Map Embed Code<sup className="text-danger">*</sup></label>
                                                            <textarea className="form-control google-map-embed-code" id="GoogleMapEmbedCode" name="GoogleMapEmbedCode" required></textarea>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2 react-quill-editor">
                                                            <label htmlFor="Tags" className="form-label text-capitalize fw-bold small">tags</label>
                                                            <input type="text" className="form-control" id="Tags" name="Tags" />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2 react-quill-editor">
                                                            <label htmlFor="seoTitle" className="form-label text-capitalize fw-bold small">seo title<sup className="text-danger">*</sup></label>
                                                            <input type="text" className="form-control" id="seoTitle" name="seoTitle" required />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2 react-quill-editor">
                                                            <label htmlFor="seoDescription" className="form-label text-capitalize fw-bold small">SEO Description<sup className="text-danger">*</sup></label>
                                                            <textarea className="form-control google-map-embed-code" id="seoDescription" name="seoDescription" required></textarea>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="status" className="form-label text-capitalize fw-bold small">status <sup className="text-danger">*</sup></label>
                                                            <select name="status" id="status" className="form-control text-capitalize" required>
                                                                <option value="active">active</option>
                                                                <option value="inactive">inactive</option>
                                                            </select>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="isFeatured" className="form-label text-capitalize fw-bold small">is featured</label>
                                                            <select name="isFeatured" id="isFeatured" className="form-control text-capitalize">
                                                                <option value="">no</option>
                                                                <option value="1">yes</option>
                                                            </select>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="isVerified" className="form-label text-capitalize fw-bold small">is verified</label>
                                                            <select name="isVerified" id="isVerified" className="form-control text-capitalize">
                                                                <option value="">no</option>
                                                                <option value="1">yes</option>
                                                            </select>
                                                        </div>
                                                    </Col>

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
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default AllListing;