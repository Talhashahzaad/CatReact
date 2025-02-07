import { React } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom";
//import Breadcrumb from "../DashboardPage/Breadcrumb/Breadcrumb";
import salonStorePicture from '../../images/salonStore.jpg';
import './ListingDetails.css';
import { FaPhoneAlt, FaEnvelopeOpen, FaMapMarkerAlt, FaGlobe, FaStar, FaStarHalfAlt } from "react-icons/fa";
import facebookIcon from "../../images/facebook.svg";
import instagramIcon from "../../images/instagram.svg";
import youtubeIcon from "../../images/youtube.svg";
import linkedinIcon from "../../images/linkedin.svg";
import tiktokIcon from "../../images/tiktok.svg";
import verifiedIcon from "../../images/check-circle.svg";
import "../../App.css";


const ListingDetails = () =>{
    return(
        <>
            <div className="listing-details-feature-banner">
                <figure className="mb-0 position-relative">
                    <img src={salonStorePicture} alt="" title="" width="" height="" className="img-fluid w-100" />

                    <div className="listing-details-feature-banner-content position-absolute top-50 start-50 translate-middle">
                        <Container>
                            <Row>
                                <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <h1 className="animate__fadeInUp animate__animated text-white text-capitalize fw-normal mb-3 text-center">business name</h1>
                                    <div className="breadcrumb-container">
                                        {/* <Breadcrumb /> */}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </figure>
            </div>

            <div className="listing-details-content py-5 w-100 h-auto bg-white d-block position-relative">
                <Container>
                    <Row>
                        <Col xxl={8} xl={8} lg={8} md={8} sm={12}>
                            <div className="business-details-listing-content-left">
                                <figure className="mb-4">
                                    <img src={salonStorePicture} alt="" title="" width="" height="" className="img-fluid rounded-circle" />
                                </figure>
                                <small className="d-block text-capitalize text-muted pb-2"><strong>hosted by:</strong> super admin</small>

                                <div className="star-rating mb-2">
                                    <span className="d-flex gap-1 align-items-center">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStarHalfAlt />
                                    </span>
                                    <span className="d-block text-capitalize text-muted rating-text small">
                                        <strong>4.5</strong> 
                                        <Link to="#" className="text-decoration-none text-capitalize text-muted rating-text ms-2">
                                            (100 reviews)
                                        </Link>
                                    </span>
                                </div>

                                {/* our practisnus

                                certifications */}

                                <h2 className="h3 default-font text-capitalize fw-bold mb-3 h5">Discover serenity: spa wisdom inside</h2>

                                <div className="verified-badge">
                                    <span className="d-flex gap-2 align-items-center">
                                        <img src={verifiedIcon} alt="" title="" width="" height="" className="img-fluid" />
                                        <span className="text-capitalize rating-text small">verified</span>
                                    </span>
                                </div>

                                <hr />
                                <div className="listing-details-content-left-description">
                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

                                    <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                </div>
                            </div>
                        </Col>

                        <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                            <div className="listing-details-content-right">
                                <h2 className="h3 default-font text-capitalize fw-bold h5 mb-3">contact details</h2>
                                <hr />
                                <div className="listing-details-content-right-contact-details mb-5">
                                    <ul className="list-unstyled mb-0 ps-0 d-flex flex-column gap-3">
                                        <li className="d-flex gap-2 align-items-center">
                                            <span className="fw-bold"><FaPhoneAlt /> Phone: </span>
                                            <span>+44 0203 543210</span>
                                        </li>
                                        <li className="d-flex gap-2 align-items-center">
                                            <span className="fw-bold"><FaEnvelopeOpen /> Email: </span>
                                            <span>info@businessname.com</span>
                                        </li>
                                        <li className="d-flex gap-2 align-items-center">
                                            <span className="fw-bold"><FaMapMarkerAlt /> Address: </span>
                                            <span>123 Main Street, London, UK</span>
                                        </li>
                                        <li className="d-flex gap-2 align-items-center">
                                            <span className="fw-bold"><FaGlobe /> Website: </span>
                                            <span>www.businessname.com</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="listing-details-content-right-social-media my-5">
                                    <h2 className="h3 default-font text-capitalize fw-bold mb-3 h5">social media</h2>
                                    <hr />
                                    <div className="listing-details-content-right-social-media-links">
                                        <ul className="list-unstyled mb-0 ps-0 d-flex gap-3">
                                            <li className="d-flex gap-2 align-items-center">
                                                <Link to="https://www.facebook.com/businessname" target="_blank">
                                                    <img src={facebookIcon} alt="" title="" width="" height="" className="img-fluid" />
                                                </Link>
                                            </li>
                                            <li className="d-flex gap-2 align-items-center">
                                                <Link to="https://www.instagram.com/businessname" target="_blank">
                                                    <img src={instagramIcon} alt="" title="" width="" height="" className="img-fluid" />
                                                </Link>
                                            </li>
                                            <li className="d-flex gap-2 align-items-center">
                                                <Link to="https://www.youtube.com/businessname" target="_blank">
                                                    <img src={youtubeIcon} alt="" title="" width="" height="" className="img-fluid" />
                                                </Link>
                                            </li>
                                            <li className="d-flex gap-2 align-items-center">
                                                <Link to="https://www.linkedin.com/businessname" target="_blank">
                                                    <img src={linkedinIcon} alt="" title="" width="" height="" className="img-fluid" />
                                                </Link>
                                            </li>
                                            <li className="d-flex gap-2 align-items-center">
                                                <Link to="https://www.tiktok.com/businessname" target="_blank">
                                                    <img src={tiktokIcon} alt="" title="" width="" height="" className="img-fluid" />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="listing-details-content-right-opening-hours">
                                    <h2 className="h3 default-font text-capitalize fw-bold mb-3 h5">opening hours</h2>
                                    <hr />
                                    <div className="listing-details-content-right-opening-hours-table">
                                        <table className="table table-bordered table-hover table-responsive">
                                            <tbody>
                                                <tr>
                                                    <td>Monday</td>
                                                    <td>9:00 AM - 6:00 PM</td>
                                                </tr>
                                                <tr>
                                                    <td>Tuesday</td>
                                                    <td>9:00 AM - 6:00 PM</td>
                                                </tr>
                                                <tr>
                                                    <td>Wednesday</td>
                                                    <td>9:00 AM - 6:00 PM</td>
                                                </tr>
                                                <tr>
                                                    <td>Thursday</td>
                                                    <td>9:00 AM - 6:00 PM</td>
                                                </tr>
                                                <tr>
                                                    <td>Friday</td>
                                                    <td>9:00 AM - 6:00 PM</td>
                                                </tr>
                                                <tr>
                                                    <td>Saturday</td>
                                                    <td>9:00 AM - 6:00 PM</td>
                                                </tr>
                                                <tr>
                                                    <td>Sunday</td>
                                                    <td>Closed</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="listing-details-content-right-message-us my-5">
                                    <h2 className="h3 default-font text-capitalize fw-bold mb-3 h5">message us</h2>
                                    <hr />
                                    <div className="listing-details-content-right-message-us-form">
                                        
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default ListingDetails;