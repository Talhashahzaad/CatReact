import React from "react";
import {Col, Row, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import dashboard from "../../images/dashboard.svg";
import myListing from "../../images/form-listing.svg";
import addListing from "../../images/add-listing.svg";
import star from "../../images/star.svg";
import wishlist from "../../images/wishlist.svg";
import profile from "../../images/profile.svg";
import order from "../../images/order.svg";
import myPackage from "../../images/package.svg";
//import message from "../../images/message.svg";
import profileLogo from "../../images/logo.svg";
import profileFace from "../../images/profile-picture.jpeg";
import "./Dashboard.css";

const Dashboard = () => {
    const dashboardData = {
        totalReviews: 100,
        activeListing: 10,
        wishlist: 5,
        message: 20
    }

    const [uploadedLogo, setUploadedLogo] = React.useState(null);

    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUploadedLogo(imageUrl);
        }
    };

    const handleRemoveLogo = () => {
        if (uploadedLogo) {
            URL.revokeObjectURL(uploadedLogo);
            setUploadedLogo(null);
        }
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    React.useEffect(() => {
        return () => {
            if (uploadedLogo) {
                URL.revokeObjectURL(uploadedLogo);
            }
        };
    }, [uploadedLogo]);

    return (
        <>
            <div className="dashboard-container w-100 h-auto d-block position-relative py-5 px-3">
                <Container>
                    <Row>
                        <div className="dashboard-header text-end mb-5">
                            <Link to="/add-listing" className="btn btn-default add-listing-btn text-capitalize">
                                <span className="add-listing-icon">&#x2b;</span> add listing
                            </Link>
                        </div>
                        <div className="dashboard-sidebar-wrapper">
                            <Row>
                                <Col xxl={3} xl={3} lg={4} md={4} sm={12} className="d-block position-relative">
                                    <div className="dashboard-sidebar">
                                        <div className="dashboard-sidebar-profile-picture w-100 h-auto position-relative">
                                            <img src={profileFace} alt="User Profile Picture" title="User Profile Picture" />
                                            <h4 className="dashboard-sidebar-profile-picture-name">Beatrice</h4>
                                            <Link to="/" className="dashboard-user-logout-link">logout</Link>
                                        </div>
                                        
                                        <div className="dashboard-sidebar-tabs">
                                            <ul className="d-flex flex-column w-100 h-auto position-relative ps-0 mb-0">
                                                <li>
                                                    <Link to="#"
                                                    className="dashboard-sidebar-tabs-link"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            scrollToSection('dashboard-content-dashboard');
                                                        }}
                                                    >
                                                    <img src={dashboard} alt="dashboard" className="dashboard-sidebar-tabs-icon" />
                                                    Dashboard
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link to="#"
                                                    className="dashboard-sidebar-tabs-link"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            scrollToSection('my-listing-content-dashboard');
                                                        }}
                                                    >
                                                    <img src={myListing} alt="dashboard" className="dashboard-sidebar-tabs-icon" />
                                                    my listing
                                                    </Link>
                                                </li>
                                                
                                                <li>
                                                    <Link to="#"
                                                    className="dashboard-sidebar-tabs-link"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            scrollToSection('create-listing-content-dashboard');
                                                        }}
                                                    >
                                                    <img src={addListing} alt="dashboard" className="dashboard-sidebar-tabs-icon" />
                                                    create listing
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link to="#"
                                                    className="dashboard-sidebar-tabs-link"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            scrollToSection('review-content-dashboard');
                                                        }}
                                                    >
                                                    <img src={star} alt="dashboard" className="dashboard-sidebar-tabs-icon" />
                                                    review
                                                    </Link>
                                                </li>
                                                
                                                <li>
                                                    <Link to="#"
                                                    className="dashboard-sidebar-tabs-link"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            scrollToSection('wishlist-content-dashboard');
                                                        }}
                                                    >
                                                    <img src={wishlist} alt="dashboard" className="dashboard-sidebar-tabs-icon" />
                                                    wishlist
                                                </Link>
                                                </li>
                                                
                                                <li>
                                                    <Link 
                                                        to="#" 
                                                        className="dashboard-sidebar-tabs-link"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            scrollToSection('my-profile-content-dashboard');
                                                        }}
                                                    >
                                                        <img src={profile} alt="dashboard" className="dashboard-sidebar-tabs-icon" />
                                                        my profile
                                                    </Link>
                                                </li>
                                                
                                                <li>
                                                    <Link to="#"
                                                    className="dashboard-sidebar-tabs-link"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            scrollToSection('orders-content-dashboard');
                                                        }}
                                                    >
                                                    <img src={order} alt="dashboard" className="dashboard-sidebar-tabs-icon" />
                                                    orders
                                                </Link>
                                                </li>
                                                
                                                <li>
                                                    <Link to="#"
                                                    className="dashboard-sidebar-tabs-link"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            scrollToSection('packages-content-dashboard');
                                                        }}
                                                    >
                                                    <img src={myPackage} alt="dashboard" className="dashboard-sidebar-tabs-icon" />
                                                    packages
                                                </Link>
                                                </li>
                                                
                                                <li>
                                                    <Link to="#"
                                                    className="dashboard-sidebar-tabs-link"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            scrollToSection('logo-content-dashboard');
                                                        }}
                                                    >
                                                    <img src={profileLogo} alt="dashboard" className="dashboard-sidebar-tabs-icon" />
                                                    logo
                                                </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                            
                                <Col xxl={9} xl={9} lg={8} md={8} sm={12} className="d-block position-relative">
                                    <div className="dashboard-content">
                                        <div className="dashboard-message-notification">
                                            <ul className="ps-0 mb-0 d-flex justify-content-between align-items-center">
                                                <li>
                                                    <h3>{dashboardData.totalReviews}</h3>
                                                    <strong>total reviews</strong>
                                                </li>

                                                <li>
                                                    <h3>{dashboardData.activeListing}</h3>
                                                    <strong>active listing</strong>
                                                </li>

                                                <li>
                                                    <h3>{dashboardData.wishlist}</h3>
                                                    <strong>wishlist</strong>
                                                </li>

                                                <li>
                                                    <h3>{dashboardData.message}</h3>
                                                    <strong>message</strong>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>


                                    <div className="sidebar-content">
                                        <div id="dashboard-content-dashboard">
                                            <h4>active package</h4>
                                            <table className="table table-bordered table-striped table-hover table-responsive">
                                                <thead>
                                                    <tr><th>Package name</th><th>Free</th></tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
<td>Price</td>
<td>&pound; 50</td></tr>
                                                    <tr>
<td>Purchase Date</td>
<td>15 October, 2021</td></tr>
                                                    <tr>
<td>Expired Date</td>
<td>14 November, 2021</td></tr>
                                                    <tr>
<td>Package name</td>
<td>free</td></tr>
                                                    <tr>
<td>Maximum Listing</td>
<td>10</td></tr>
                                                    <tr>
<td>Maximum Aminities</td>
<td>5</td></tr>
                                                    <tr>
<td>Maximum Photo</td>
<td>5</td></tr>
                                                    <tr>
<td>Maximum Video</td>
<td>10</td></tr>
                                                    <tr>
<td>Featured Listing Available</td>
<td>no</td></tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div id="my-listing-content-dashboard">
                                            <h4>My Listing</h4>
                                            <Row>
                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12} className="position-relative">
                                                    demo 1
                                                </Col>

                                                <Col xxl={6} xl={6} lg={6} md={6} sm={12} className="position-relative">
                                                    demo 2
                                                </Col>
                                            </Row>
                                        </div>

                                        <div id="create-listing-content-dashboard">
                                            <h4>Create Listing</h4>
                                        </div>

                                        <div id="review-content-dashboard">
                                            <h4>Review</h4>
                                        </div>

                                        <div id="wishlist-content-dashboard">
                                            <h4>Wishlist</h4>
                                        </div>

                                        <div id="my-profile-content-dashboard">
                                            <h4>My Profile</h4>
                                        </div>

                                        <div id="orders-content-dashboard">
                                            <h4>Orders</h4>
                                        </div>

                                        <div id="packages-content-dashboard">
                                            <table className="table table-bordered table-striped table-hover table-responsive">
                                                <thead>
                                                    <tr className="text-center">
                                                        <th className="text-start">Feature</th><th>Freemium <br/> (Free)</th>
                                                        <th>CaT Premium <br/>(£ 15/month)</th>
                                                        <th>CaT Elite <br/>(£ 35/month)</th>
                                                    </tr>
                                                </thead>
                                                
                                                <tbody>
                                                    <tr>
                                                        <td>Business profile listing</td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓</span></td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓</span></td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓</span></td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td>CaT Pro social media</td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓</span></td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓</span></td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓</span></td>
                                                    </tr>

                                                    <tr>
                                                        <td>Check a Treatment Marketplace access</td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓ <small className="d-block fs-6 text-dark">(10% commission)</small></span></td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓ <small className="d-block fs-6 text-dark">(4% commission)</small></span></td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓ <small className="d-block fs-6 text-dark">(0% commission)</small></span></td>
                                                    </tr>

                                                    <tr>
                                                        <td>Calendar integration</td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓</span></td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓</span></td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓</span></td>
                                                    </tr>

                                                    <tr>
                                                        <td>Social media autouploads <sup>TM</sup></td>
                                                        <td><span className="text-center d-block fs-1 text-danger">×</span></td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓</span></td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓</span></td>
                                                    </tr>

                                                    <tr>
                                                        <td>Priority listing in search results</td>
                                                        <td><span className="text-center d-block fs-1 text-danger">×</span></td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓</span></td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓</span></td>
                                                    </tr>

                                                    <tr>
                                                        <td>Maximized business profile</td>
                                                        <td><span className="text-center d-block fs-1 text-danger">×</span></td>
                                                        <td><span className="text-center d-block fs-1 text-danger">×</span></td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓</span></td>
                                                    </tr>

                                                    <tr>
                                                        <td>Unlimited personal business Live Chat for client enquiries</td>
                                                        <td><span className="text-center d-block fs-1 text-danger">×</span></td>
                                                        <td><span className="text-center d-block fs-1 text-danger">×</span></td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓</span></td>
                                                    </tr>

                                                    <tr>
                                                        <td>Multiple locations</td>
                                                        <td><span className="text-center d-block fs-1 text-danger">×</span></td>
                                                        <td><span className="text-center d-block fs-1 text-danger">×</span></td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓</span></td>
                                                    </tr>

                                                    <tr>
                                                        <td>Opportunity to Feature on Beyond the Treatment<sup>TM</sup></td>
                                                        <td><span className="text-center d-block fs-1 text-danger">×</span></td>
                                                        <td><span className="text-center d-block fs-1 text-danger">×</span></td>
                                                        <td><span className="text-center d-block fs-4 text-success">✓</span></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div id="logo-content-dashboard">
                                            <h4>Logo</h4>
                                            <div className="logo-content-dashboard-image">
                                                <form>
                                                    <div className="form-group position-relative">
                                                        {uploadedLogo && (
                                                            <button 
                                                                type="button"
                                                                className="btn uploaded-logo-content-dashboard-remove position-absolute"
                                                                onClick={handleRemoveLogo}
                                                            >
                                                                &times;
                                                            </button>
                                                        )}
                                                        <img 
                                                            src={uploadedLogo} 
                                                            alt="logo" 
                                                            className="logo-content-dashboard-image-uploaded"
                                                            style={{ display: uploadedLogo ? 'block' : 'none' }}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <input 
                                                            type="file" 
                                                            className="upload-logo-content-dashboard-picture"
                                                            accept="image/*"
                                                            onChange={handleLogoUpload}
                                                        />
                                                    </div>
                                                    
                                                    <div className="form-group">
                                                        <input type="submit" value="upload my logo" className="btn uploaded-logo-content-dashboard-store" />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>                                    
                                </Col>
                            </Row>
                        </div>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Dashboard;