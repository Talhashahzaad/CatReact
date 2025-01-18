import { React, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { FaEdit, FaTrash } from "react-icons/fa";
import defaultImage from "../../../images/defaultPicture.jpg";
import defaultThumbnailImage from "../../../images/defaultPicture.jpg";
import ReactQuill from 'react-quill';

import '../../../../node_modules/react-quill/dist/quill.snow.css';



const AllListing = () => {
    const [bodyPicture, setBodyPicture] = useState(defaultImage);
    const [thumbnailImage, setThumbnailImage] = useState(defaultThumbnailImage);
    const [description, setDescription] = useState('');
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setBodyPicture(imageUrl);
        }
    };

    const handleThumbnailImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const thumbnailImageUrl = URL.createObjectURL(file);
            setThumbnailImage(thumbnailImageUrl);
        }
    };

    return (
        <>
            <Container fluid>
                <div className="dashboard-page-section w-100 h-auto d-flex justify-content-between align-items-start py-5" onClick={(e) => e.stopPropagation()}>
                    <Sidebar />

                    <div className="dashboard-content">
                        <div className="dashboard-content-body">
                            <div className="dashboard-content-breadcrumbs w-100 h-auto d-block py-3 px-2 position-relative bg-jetGreen mb-3 rounded">
                                <Breadcrumb />
                            </div>
                            

                            {/* make this table dynamic for the react page. Include the below requirements.
                            1. The top left side should be "show entries in the select dropdown"
                            2. The top right side should be "search bar auto filter"
                            3. The bottom left side should show existing entries in the table.
                            4. The bottom right side creates a pagination bar.
                            5. All entries data should be showing as variables because I will use here API call. */}

                            <div className="dashboard-content-table">
                                <Row>
                                    <div className="d-flex justify-content-between align-items-center listing-header">
                                        <h1 className="dashboard-content-title mb-0 h5 fw-bold default-font">All Listing</h1>
                                        <button 
                                            className="btn bg-jetGreen text-white all-listing-create-button d-flex align-items-center justify-content-center" 
                                            onClick={() => {
                                                document.querySelector('.dashboard-content-table').style.display = 'none';
                                                document.querySelector('.sidebar-listing-form').style.display = 'block';
                                            }}
                                        >
                                            <span className="all-listing-create-button-plus">&#43;</span> Create Listing  
                                        </button>
                                    </div>
                                </Row>
                                <hr />
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
                                        <tr>
                                            <td>1</td>
                                            <td><img src="https://fastly.picsum.photos/id/892/536/354.jpg?hmac=60WxlDjmsmE707hkhf2GjWSxc4kxxl4ggWFAxnQ-vd0" alt="" className="img-fluid" /></td>
                                            <td>shop</td>
                                            <td>spa</td>
                                            <td>india</td>
                                            <td>active</td>
                                            <td>yes</td>
                                            <td>yes</td>
                                            <td>admin</td>
                                            <td>
                                                <button className="btn btn-success"><FaEdit /></button>
                                                <button className="btn btn-danger"><FaTrash /></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>



                            <div className="sidebar-listing-form">

                                <div className="dashboard-all-listing-create-form">
                                    <Row>
                                        <div className="d-flex justify-content-between align-items-center listing-header">
                                        <h2 className="dashboard-all-listing-create-form-title mb-0 h5 fw-bold default-font">Create Listing</h2>
                                            <button 
                                                className="btn bg-jetGreen text-white all-listing-create-button all-listing-create-form-back-button text-capitalize d-flex align-items-center justify-content-center" 
                                                onClick={() => {
                                                    document.querySelector('.sidebar-listing-form').style.display = 'none';
                                                    document.querySelector('.dashboard-content-table').style.display = 'block';
                                                }}
                                            >
                                                <span className="all-listing-create-form-back-button-arrow">&larr;</span> Back to all listing
                                            </button>
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
                                                        <label htmlFor="title" className="form-label text-capitalize fw-bold small">thumbnail image <sup className="text-danger">*</sup></label>
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
                                                        <label htmlFor="title" className="form-label text-capitalize fw-bold small">category <sup className="text-danger">*</sup></label>
                                                        <select name="category" id="category" className="form-control text-capitalize" required>
                                                            <option value="">select category</option>
                                                            <option value="1">category 1</option>
                                                        </select>
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="title" className="form-label text-capitalize fw-bold small">location <sup className="text-danger">*</sup></label>
                                                        <select name="location" id="location" className="form-control text-capitalize" required>
                                                            <option value="">select location</option>
                                                            <option value="1">location 1</option>
                                                        </select>
                                                    </div>
                                                </Col>

                                                <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="title" className="form-label text-capitalize fw-bold small">full address <sup className="text-danger">*</sup></label>
                                                        <input type="text" className="form-control" id="fullAddress" name="fullAddress" required />
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="title" className="form-label text-capitalize fw-bold small">phone number <sup className="text-danger">*</sup></label>
                                                        <input type="tel" minLength={7} maxLength={12} className="form-control" id="phoneNumber" name="phoneNumber" required />
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="title" className="form-label text-capitalize fw-bold small">email address <sup className="text-danger">*</sup></label>
                                                        <input type="email" className="form-control" id="emailAddress" name="emailAddress" required />
                                                    </div>
                                                </Col>

                                                <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="title" className="form-label text-capitalize fw-bold small">website URL</label>
                                                        <input type="url" className="form-control" id="websiteURL" name="websiteURL" />
                                                    </div>
                                                </Col>

                                                <Col xxl={3} xl={3} lg={3} md={3} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="title" className="form-label text-capitalize fw-bold small">facebook URL</label>
                                                        <input type="url" className="form-control" id="facebookURL" name="facebookURL" />
                                                    </div>
                                                </Col>

                                                <Col xxl={3} xl={3} lg={3} md={3} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="title" className="form-label text-capitalize fw-bold small">instagram URL</label>
                                                        <input type="url" className="form-control" id="instagramURL" name="instagramURL" />
                                                    </div>
                                                </Col>

                                                <Col xxl={3} xl={3} lg={3} md={3} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="title" className="form-label text-capitalize fw-bold small">tiktok URL</label>
                                                        <input type="url" className="form-control" id="tiktokURL" name="tiktokURL" />
                                                    </div>
                                                </Col>

                                                <Col xxl={3} xl={3} lg={3} md={3} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="title" className="form-label text-capitalize fw-bold small">youtube URL</label>
                                                        <input type="url" className="form-control" id="youtubeURL" name="youtubeURL" />
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="title" className="form-label text-capitalize fw-bold small">Professional Affiliations</label>
                                                        <input type="text" className="form-control" id="professionalAffiliations" name="professionalAffiliations" />
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="title" className="form-label text-capitalize fw-bold small">attachment</label>
                                                        <input type="file" className="form-control form-inside-file" id="attachment" name="attachment" />
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="title" className="form-label text-capitalize fw-bold small">Choose Practitioner</label>
                                                        <input type="text" className="form-control" id="choosePractitioner" name="choosePractitioner" />
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="title" className="form-label text-capitalize fw-bold small">Amenities</label>
                                                        <input type="text" className="form-control" id="amenities" name="amenities" />
                                                    </div>
                                                </Col>

                                                <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                    <div className="form-group my-2 react-quill-editor" id="react-quill-editor-element">
                                                        <label htmlFor="quillDescription" className="form-label text-capitalize fw-bold small">description<sup className="text-danger">*</sup></label>
                                                        <ReactQuill 
                                                            value={description} 
                                                            onChange={setDescription} 
                                                            theme="snow" 
                                                            id="quillDescription"
                                                            name="quillDescription"
                                                            placeholder="Write your description here..."
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
                                                        <input type="text" className="form-control" id="seoTitle" name="seoTitle" />
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
                                                        <input type="submit" className="btn text-white rounded-0 bg-jetGreen" value="Create Listing" />
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
            </Container>
        </>
    );
}

export default AllListing;