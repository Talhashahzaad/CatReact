import React, { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import defaultImage from "../../../images/default-profile-picture.webp";
import defaultThumbnailImage from "../../../images/default-profile-picture.webp";

const MyProfile = () => {
    const [profilePicture, setProfilePicture] = useState(defaultImage);
    const [thumbnailImage, setThumbnailImage] = useState(defaultThumbnailImage);
    const [listingForm, setListingForm] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfilePicture(imageUrl);
        }
    };

    const handleThumbnailImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setThumbnailImage(imageUrl);
        }
    };

    // Improved phone number validation pattern
    // Accepts only numbers, optional plus sign at start, between 10-15 digits
    const phonePattern = /^\+?\d{10,15}$/;
    

    // Function to validate phone number input
    const handlePhoneInput = (event) => {
        const input = event.target.value;
        // Remove any non-digit characters except leading +
        const cleaned = input.replace(/(?!^\+)\D/g, '');
        event.target.value = cleaned;
    };

    return(
        <>
            <Container>
                <div className="dashboard-page-section w-100 h-auto d-flex justify-content-between align-items-start py-5" onClick={(e) => e.stopPropagation()}>
                    <Sidebar />

                    <div className="dashboard-content">
                        <div className="dashboard-content-body">
                            <div className="dashboard-content-breadcrumbs w-100 h-auto d-block py-3 px-2 position-relative bg-jetGreen mb-3 rounded">
                                <Breadcrumb />
                            </div>

                            <h1 className="dashboard-content-title mb-0 h5 fw-bold default-font text-capitalize">basic information</h1>
                            <hr />
                        </div>
                    
                        <div className="sidebar-listing-form" style={{display: setListingForm ? 'block' : 'none'}}>
                            <div className="dashboard-all-listing-create-form-body">
                                <form>
                                    <Row>
                                        <Col xxl={8} xl={8} lg={8} md={8} sm={12}>
                                            <Row>
                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="name" className="form-label text-capitalize fw-bold small">name <sup className="text-danger">*</sup></label>
                                                        <input type="text" className="form-control" id="name" name="name" required />
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="phone" className="form-label text-capitalize fw-bold small">phone <sup className="text-danger">*</sup></label>
                                                        <input 
                                                            type="tel" 
                                                            className="form-control" 
                                                            id="phone" 
                                                            name="phone" 
                                                            pattern={phonePattern}
                                                            onInput={handlePhoneInput}
                                                            placeholder="+44 0203 7654XXX"
                                                            required 
                                                        />
                                                    </div>
                                                </Col>

                                                <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="email" className="form-label text-capitalize fw-bold small">email <sup className="text-danger">*</sup></label>
                                                        <input type="email" className="form-control" id="email" name="email" required />
                                                    </div>
                                                </Col>

                                                <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="fullAddress" className="form-label text-capitalize fw-bold small">full address <sup className="text-danger">*</sup></label>
                                                        <input type="text" className="form-control" id="fullAddress" name="fullAddress" required />
                                                    </div>
                                                </Col>

                                                <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="describeAboutMe" className="form-label text-capitalize fw-bold small">describe about me <sup className="text-danger">*</sup></label>
                                                        <textarea className="form-control" id="describeAboutMe" name="describeAboutMe" required />
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="websiteURL" className="form-label text-capitalize fw-bold small">website URL</label>
                                                        <input type="url" placeholder="https://www.example.com" className="form-control" id="websiteURL" name="websiteURL" required />
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="facebookURL" className="form-label text-capitalize fw-bold small">facebook URL</label>
                                                        <input type="url" placeholder="https://www.facebook.com/example" className="form-control" id="facebookURL" name="facebookURL" required />
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="XURL" className="form-label text-capitalize fw-bold small">X URL</label>
                                                        <input type="url" placeholder="https://www.x.com/example" className="form-control" id="XURL" name="XURL" required />
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="instagramURL" className="form-label text-capitalize fw-bold small">instagram URL</label>
                                                        <input type="url" placeholder="https://www.instagram.com/example" className="form-control" id="instagramURL" name="instagramURL" required />
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="youtubeURL" className="form-label text-capitalize fw-bold small">youtube URL</label>
                                                        <input type="url" placeholder="https://www.youtube.com/example" className="form-control" id="youtubeURL" name="youtubeURL" required />
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="linkedinURL" className="form-label text-capitalize fw-bold small">linkedin URL</label>
                                                        <input type="url" placeholder="https://www.linkedin.com/example" className="form-control" id="linkedinURL" name="linkedinURL" required />
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="whatsAppBusinessNumber" className="form-label text-capitalize fw-bold small">whatsapp business number</label>
                                                        <input 
                                                            type="tel" 
                                                            placeholder="+44 0203 7654XXX" 
                                                            className="form-control" 
                                                            id="whatsAppBusinessNumber" 
                                                            name="whatsAppBusinessNumber" 
                                                            pattern={phonePattern}
                                                            onInput={handlePhoneInput}
                                                            required 
                                                            minLength="10"
                                                            maxLength="14"
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                            <div className="form-group mb-5">
                                                <label htmlFor="profilePicture" className="form-label text-capitalize fw-bold small">profile picture <sup className="text-danger">*</sup></label>
                                                <div className="dashboard-all-listing-create-form-body-row-image-upload position-relative">
                                                    <img src={profilePicture} alt="" className="img-fluid all-listing-create-form-body-row-image-upload-img" />
                                                    <input 
                                                        type="file" 
                                                        className="position-absolute top-0 start-0 w-100 h-100 opacity-0 all-listing-create-form-body-row-image-upload-input" 
                                                        title="Choose Your Image" 
                                                        id="profilePicture"
                                                        name="profilePicture"
                                                        onChange={handleImageChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group mb-5">
                                                <label htmlFor="thumbnailImage" className="form-label text-capitalize fw-bold small">banner image <sup className="text-danger">*</sup></label>
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
                                                <input type="submit" className="btn text-white rounded-0 bg-jetGreen text-capitalize" value="Save profile" />
                                            </div>
                                        </Col>

                                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                            <fieldset className="mt-5">
                                                <legend className="text-capitalize fw-bold small">change your password</legend>
                                                    <Row>
                                                        <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                            <div className="form-group my-2">
                                                                <input type="password" placeholder="current password" className="form-control rounded-0 text-capitalize" />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                            <div className="form-group my-2">
                                                                <input type="password" placeholder="new password" className="form-control rounded-0 text-capitalize" />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                            <div className="form-group my-2">
                                                                <input type="password" placeholder="confirm new password" className="form-control rounded-0 text-capitalize" />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                            <div className="form-group my-2">
                                                                <input type="submit" className="btn text-white rounded-0 bg-jetGreen w-100 text-capitalize" value="Change password" />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                            </fieldset>
                                        </Col>
                                    </Row>
                                </form>
                            </div>

                            
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default MyProfile;