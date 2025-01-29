import {React, useState} from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import defaultImage from "../../../images/defaultPicture.jpg";
import defaultThumbnailImage from "../../../images/defaultPicture.jpg";



const MyProfile = () => {
    const [bodyPicture, setBodyPicture] = useState(defaultImage);
    const [thumbnailImage, setThumbnailImage] = useState(defaultThumbnailImage);

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

    return(
        <>
            <Container fluid>
                <div className="dashboard-page-section w-100 h-auto d-flex justify-content-between align-items-start py-5" onClick={(e) => e.stopPropagation()}>
                    <Sidebar />

                    <div className="dashboard-content">
                        <div className="dashboard-content-body">
                            <div className="dashboard-content-breadcrumbs w-100 h-auto d-block py-3 px-2 position-relative bg-jetGreen mb-3 rounded">
                                <Breadcrumb />
                            </div>
                        </div>
                    

                        <div className="sidebar-listing-form">
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
                                    </Row>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default MyProfile;