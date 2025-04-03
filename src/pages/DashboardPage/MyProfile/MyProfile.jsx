import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import defaultImage from "../../../images/default-profile-picture.webp";
import defaultThumbnailImage from "../../../images/defaulThumbnailBackground.png";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./MyProfile.css";
import { data } from "react-router-dom";

const MyProfile = () => {
    const [profilePicture, setProfilePicture] = useState(defaultImage);
    const [thumbnailImage, setThumbnailImage] = useState(defaultThumbnailImage);
    const [listingForm, setListingForm] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [error, setError] = useState(null);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Show preview
            const imageUrl = URL.createObjectURL(file);
            setProfilePicture(imageUrl);

            // Create FormData to send file
            const formData = new FormData();
            formData.append('avatar', file);

            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios.post('http://3.8.140.227:8000/api/user-avatar-update', 
                    formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data' // Important for file uploads
                        }
                    }
                );
                if (response.data.success) {
                    toast.success('Profile picture updated successfully');
                    // Update the profile info state with new avatar
                    setProfileInfo(prev => ({
                        ...prev,
                        user: {
                            ...prev.user,
                            avatar: response.data.avatar
                        }
                    }));
                }
            } catch (error) {
                toast.error('Failed to update profile picture');
                console.error('Error uploading profile picture:', error);
            }
        }
    };

    const handleThumbnailImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Show preview
            const imageUrl = URL.createObjectURL(file);
            setThumbnailImage(imageUrl);

            // Create FormData to send file
            const formData = new FormData();
            formData.append('banner', file);

            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios.post('http://3.8.140.227:8000/api/user-banner-update', 
                    formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
                
                if (response.data.success) {
                    toast.success('Banner image updated successfully');
                    // Update the profile info state with new banner
                    setProfileInfo(prev => ({
                        ...prev,
                        user: {
                            ...prev.user,
                            banner: response.data.banner
                        }
                    }));
                }
            } catch (error) {
                toast.error('Failed to update banner image');
                console.error('Error uploading banner image:', error);
            }
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

    const [profileInfo, setProfileInfo] = useState({
        user: {
            name: '',
            phone: '',
            email: '',
            address: '',
            about: '',
            website: '',
            fb_link: '',
            ig_link: '',
            yt_link: '',
            tt_link: '',
            avatar: '',
            banner: ''
        }
    });

    const fetchProfileInfo = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.get('http://3.8.140.227:8000/api/user-profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setProfileInfo(response.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchProfileInfo();
    }, []);
    
    useEffect(() => {
        window.scrollTo(0, scrollPosition);
    }, [profileInfo, scrollPosition]);

    const defaultProfilePicture = defaultImage;
    const defaultThumbnailBackground = defaultThumbnailImage;

    const handleProfileInfoChange = (e) => {
        e.preventDefault();
        setScrollPosition(window.scrollY);
        const { name, value } = e.target;
        setProfileInfo(prevInfo => ({
            ...prevInfo,
            user: {
                ...prevInfo.user,   
                [name]: value
            }
        }));
    };

    // We are handling the update functionality here
    const isSubmitting = useRef(false);

    const notifyProfileUpdateError = () => toast.error('Failed to update profile');
    const notifyProfileUpdateSuccess = () => toast.success('Profile updated successfully');

const handleUpdateProfile = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSubmitting.current) return;
    isSubmitting.current = true;

    try {
        const token = JSON.parse(localStorage.getItem("token"));
        await axios.post('http://3.8.140.227:8000/api/user-profile-update',
            {
                name: profileInfo.user.name,
                phone: profileInfo.user.phone,
                email: profileInfo.user.email,
                address: profileInfo.user.address,
                about: profileInfo.user.about,
                website: profileInfo.user.website,
                fb_link: profileInfo.user.fb_link,
                ig_link: profileInfo.user.ig_link,
                yt_link: profileInfo.user.yt_link,
                tt_link: profileInfo.user.tt_link,
                avatar: profileInfo.user.avatar,
                banner: profileInfo.user.banner,
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        notifyProfileUpdateSuccess();

        // Hide form and show dashboard content table
        const sidebarForm = document.querySelector('.sidebar-listing-form');
        const dashboardTable = document.querySelector('.dashboard-content-table');
        
        if (sidebarForm && dashboardTable) {
            sidebarForm.style.display = 'none';
            dashboardTable.style.display = 'block';
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }

        // Refresh profile data
        const response = await axios.get('http://3.8.140.227:8000/api/user-profile', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

            // if (response.data && response.data.user) {
            //     setProfileInfo(response.data);
            // }

        } catch (error) {
            notifyProfileUpdateError();
        } finally {
            isSubmitting.current = false;
        }
    };

    // we are update the password functionality here
    const [password, setPassword] = useState({
        password: '',
        password_confirmation: ''
    });

    useEffect(() => {
        window.scrollTo(0, scrollPosition);
    }, [password, scrollPosition]);

    const handleNewPasswordChange = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isSubmitting.current) return;
        setScrollPosition(window.scrollY);
        
        const { name, value } = e.target;
        setPassword(prev => ({ ...prev, [name]: value }));
    };

    const validationPassword = () => {
        if (password.password !== password.password_confirmation) {
            return 'Password should be in 8 characters with one uppercase, one lowercase and one number';
        }
        return null;
    };

    const validatePasswordConfirmation = () => {
        if (password.password_confirmation !== password.password_confirmation) {
            return 'Password and Confirm Password do not match';
        }
        return null;
    };
    
    const notifySuccess = () => toast.success('Password updated successfully');
    const notifyError = () => toast.error('Failed to update password');

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.post('http://3.8.140.227:8000/api/user-password-update', {
                password: password.password,
                password_confirmation: password.password_confirmation
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            notifySuccess();

        if (isSubmitting.current) return;
        isSubmitting.current = true;
    } catch (error) {
        notifyError();
    } finally {
        isSubmitting.current = false;
    }
};

    return(
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <Container fluid className="dashboard-page-main">
                <Row>
                    <div className="dashboard-page-section w-100 h-auto d-flex justify-content-between align-items-start pb-5" onClick={(e) => e.stopPropagation()}>
                        <Sidebar />

                    <div className="dashboard-content bg-white">
                        <div className="dashboard-content-body">
                            <DashboardHeader />

                            <div className="dashboard-content-breadcrumbs w-100 h-auto d-block py-3 px-2 position-relative bg-green25 mb-3 rounded">
                                <Breadcrumb />
                            </div>

                            <div className="dashboard-content-table">
                                <Row>
                                    <div className="d-flex justify-content-between align-items-center listing-header">
                                        <h1 className="dashboard-content-title mb-0 h3 fw-bold text-capitalize headingFont">profile</h1>
                                    </div>
                                </Row>
                                <hr />

                                <div className="dashboard-my-profile-front-page">
                                    <Row>
                                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} className="position-relative">
                                            <div className="dashboard-my-profile-body-feature-picture-row">
                                                <span className="dashboard-my-profile-body-feature-picture w-100 position-relative d-flex flex-column align-items-center justify-content-center">
                                                    <img src={ profileInfo?.user?.banner ? `http://3.8.140.227:8000/${profileInfo?.user?.banner}` : defaultThumbnailBackground} alt="" className="img-fluid" loading="lazy" />
                                                    {/* <button className="btn bg-jetGreen position-absolute" id="change-feature-picture-btn" type="file">
                                                        <FaCamera /> edit
                                                    </button> */}
                                                </span>
                                            </div>

                                            <div className="dashboard-my-profile-body-myProfile-picture-row">
                                                <span className="dashboard-my-profile-body-myProfile-picture ">
                                                    <img src={ profileInfo?.user?.avatar ? `http://3.8.140.227:8000/${profileInfo?.user?.avatar}` : defaultProfilePicture} alt="" loading="lazy" />
                                                    {/* <button className="btn bg-jetGreen position-absolute" id="change-my-profile-picture-btn" type="file">
                                                        <FaCamera />
                                                    </button> */}
                                                </span>
                                                <span className="dashboard-my-profile-body-myProfile-picture-name-description">
                                                    {profileInfo && (
                                                            <>
                                                                <h5 className="dashboard-my-profile-body-myProfile-picture-row-text-title-name mb-0 text-capitalize default-font fw-bold">
                                                                    {profileInfo?.user?.name}
                                                                </h5>
                                                                <p className="dashboard-my-profile-body-myProfile-picture-row-text-title-description mb-0 text-lowercase">
                                                                    {profileInfo?.user?.role}
                                                                </p>
                                                            </>
                                                        )
                                                    }
                                                </span>
                                                <span className="dashboard-update-my-profile-button ">
                                                <button 
                                                    className="btn all-listing-create-button d-flex align-items-center justify-content-center text-capitalize" 
                                                    onClick={() => {
                                                        document.querySelector('.dashboard-content-table').style.display = 'none';
                                                        document.querySelector('.sidebar-listing-form').style.display = 'block';
                                                    }}
                                                >
                                                    <span className="all-listing-create-button-plus">&#9998;</span> edit profile  
                                                </button>
                                                </span>
                                            </div>

                                            <div className="dashboard-my-profile-body-myProfile-brief-description">
                                                <h3 className="tagline-of-myProfile-section default-font fw-bold h6 text-capitalize">my profile</h3>
                                                
                                                <div className="dashboard-my-profile-body-myProfile-brief-description-basic-info">
                                                    <dl>
                                                        <dt>Name :</dt>
                                                        <dd>{profileInfo?.user?.name}</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>Email :</dt>
                                                        <dd>{profileInfo?.user?.email}</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>Address :</dt>
                                                        <dd>{profileInfo?.user?.address}</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>Phone :</dt>
                                                        <dd>{profileInfo?.user?.phone}</dd>
                                                    </dl>
                                                </div>
                                                <hr />

                                                <div className="dashboard-my-profile-body-myProfile-brief-description-about-self">
                                                    <dl>
                                                        <dt className="pb-2">About me :</dt>
                                                        <dd>{profileInfo?.user?.about}</dd>
                                                    </dl>
                                                </div>
                                                <hr />

                                                <div className="dashboard-my-profile-body-myProfile-website-url">
                                                    <dl>
                                                        <dt>Website URL :</dt>
                                                        <dd>{profileInfo?.user?.website}</dd>
                                                    </dl>
                                                </div>
                                                <hr/>

                                                <div className="dashboard-my-profile-body-myProfile-social-media">
                                                    <dl>
                                                        <dt>facebook URL :</dt>
                                                        <dd>{profileInfo?.user?.fb_link}</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>Instagram URL :</dt>
                                                        <dd>{profileInfo?.user?.ig_link}</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>Youtube URL :</dt>
                                                        <dd>{profileInfo?.user?.yt_link}</dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>TikTok URL :</dt>
                                                        <dd>{profileInfo?.user?.tt_link}</dd>
                                                    </dl>
                                                    
                                                </div>
                                            </div>
                                            
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    
                        <div className="sidebar-listing-form" style={{display: setListingForm ? 'none' : 'block'}}>
                            <div className="dashboard-all-listing-create-form-body">
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
                                        <h2 className="dashboard-all-listing-create-form-title mb-0 h5 fw-bold default-font text-capitalize">create my profile</h2>
                                    </div>
                                </Row>
                                <hr />

                                <form onSubmit={(e) => e.preventDefault() && handleUpdateProfile}>
                                    <Row>
                                        <Col xxl={8} xl={8} lg={8} md={8} sm={12}>
                                            <Row>
                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="name" className="form-label text-capitalize fw-bold small">name <sup className="text-danger">*</sup></label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            id="name" 
                                                            name="name" 
                                                            autoComplete="off" 
                                                            value={profileInfo?.user?.name || ''} 
                                                            onChange={handleProfileInfoChange} 
                                                        />
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
                                                            autoComplete="off"
                                                            value={profileInfo?.user?.phone || ''} 
                                                            onChange={handleProfileInfoChange}
                                                        />
                                                    </div>
                                                </Col>

                                                <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="email" className="form-label text-capitalize fw-bold small">email <sup className="text-danger">*</sup></label>
                                                        <input 
                                                            type="email" 
                                                            className="form-control" 
                                                            id="email" 
                                                            name="email" 
                                                            autoComplete="off" 
                                                            value={profileInfo?.user?.email || ''} 
                                                            onChange={handleProfileInfoChange} 
                                                        />
                                                    </div>
                                                </Col>

                                                <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="address" className="form-label text-capitalize fw-bold small">full address <sup className="text-danger">*</sup></label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            id="address" 
                                                            name="address" 
                                                            autoComplete="off" 
                                                            value={profileInfo?.user?.address || ''} 
                                                            onChange={handleProfileInfoChange} 
                                                        />
                                                    </div>
                                                </Col>

                                                <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="describeAboutMe" className="form-label text-capitalize fw-bold small">describe about me <sup className="text-danger">*</sup></label>
                                                        <textarea 
                                                            className="form-control" 
                                                            id="describeAboutMe" 
                                                            name="about" 
                                                            value={profileInfo?.user?.about || ''} 
                                                            onChange={handleProfileInfoChange} 
                                                        />
                                                    </div>
                                                </Col>

                                                <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="websiteURL" className="form-label text-capitalize fw-bold small">website URL</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            id="websiteURL" 
                                                            name="website" 
                                                            value={profileInfo?.user?.website || ''} 
                                                            onChange={handleProfileInfoChange} 
                                                        />
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="facebookURL" className="form-label text-capitalize fw-bold small">facebook URL</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            id="facebookURL" 
                                                            name="fb_link" 
                                                            value={profileInfo?.user?.fb_link || ''} 
                                                            onChange={handleProfileInfoChange} 
                                                        />
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="instagramURL" className="form-label text-capitalize fw-bold small">instagram URL</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            id="instagramURL" 
                                                            name="ig_link" 
                                                            value={profileInfo?.user?.ig_link || ''} 
                                                            onChange={handleProfileInfoChange} 
                                                        />
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="youtubeURL" className="form-label text-capitalize fw-bold small">youtube URL</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            id="youtubeURL" 
                                                            name="yt_link" 
                                                            value={profileInfo?.user?.yt_link || ''} 
                                                            onChange={handleProfileInfoChange} 
                                                        />
                                                    </div>
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                    <div className="form-group my-2">
                                                        <label htmlFor="tiktokURL" className="form-label text-capitalize fw-bold small">tiktok URL</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            id="tiktokURL" 
                                                            name="tt_link" 
                                                            value={profileInfo?.user?.tt_link || ''} 
                                                            onChange={handleProfileInfoChange} 
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
                                                        accept="image/*"
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
                                                        accept="image/*"
                                                    />
                                                </div>
                                            </div>
                                        </Col>

                                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                            <div className="form-group my-2">
                                                <input type="submit" className="bg-jetGreen text-white border-0 py-2 px-3 rounded-0 bg-jetGreen text-capitalize" value="Update profile" onClick={handleUpdateProfile} />
                                            </div>
                                        </Col>
                                    </Row>
                                </form>

                                {/* Separate password update form */}
                                <Row>
                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                        <form onSubmit={handlePasswordUpdate}>
                                            <fieldset className="mt-5">
                                                <legend className="text-capitalize fw-bold small">change your password</legend>
                                                <Row>
                                                    <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                                        <div className="form-group my-2">
                                                            <input 
                                                                type="password" 
                                                                placeholder="new password" 
                                                                className="form-control rounded-0 text-capitalize" 
                                                                id="newPassword" 
                                                                name="password" 
                                                                autoComplete="off" 
                                                                value={password.password} 
                                                                onChange={handleNewPasswordChange} 
                                                            />
                                                            <small className="text-danger mt-2 d-block">{validationPassword()}</small>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                                        <div className="form-group my-2">
                                                            <input 
                                                                type="password" 
                                                                placeholder="confirm new password" 
                                                                className="form-control rounded-0 text-capitalize" 
                                                                id="confirmNewPassword" 
                                                                name="password_confirmation" 
                                                                autoComplete="off" 
                                                                value={password.password_confirmation} 
                                                                onChange={handleNewPasswordChange} 
                                                            />
                                                            <small className="text-danger mt-2 d-block">{validatePasswordConfirmation()}</small>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                                        <div className="form-group my-2">
                                                            <input 
                                                                type="submit" 
                                                                className="bg-jetGreen text-white border-0 py-2 px-3 rounded-0 bg-jetGreen w-100 text-capitalize" 
                                                                value="Update password" 
                                                                onClick={handlePasswordUpdate}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </fieldset>
                                        </form>
                                    </Col>
                                </Row>
                            </div>

                            
                        </div>
                    </div>
                </div>
                </Row>
            </Container>
        </>
    );
};

export default MyProfile;