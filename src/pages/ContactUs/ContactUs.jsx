import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom";
import facebookIcon from "../../images/facebook.svg";
import instagramIcon from "../../images/instagram.svg";
import youtubeIcon from "../../images/youtube.svg";
import linkedinIcon from "../../images/linkedin.svg";
import phoneIconTiny from "../../images/phoneIcon-tiny.svg";
import envelopeIconTiny from "../../images/envelopeIcon-tiny.svg";

import "../../App.css";
import "./ContactUs.css";

const ContactUs = () => {
    return (
        <>
            <div className="feature-banner w-100 h-auto d-block position-relative">
                <Container>
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                            <h1 className="animate__fadeInUp animate__animated">Contact Us</h1>
                            <div className="w-100 text-center d-inline-block mx-auto pt-3 pb-2">
                                <hr className="w-10 h-auto py-1 text-center d-block border-0 rounded mx-auto" />
                            </div>
                            <h4 className="text-center w-100 pt-0 pb-4 fw-normal text-uppercase">Have questions, feedback, or just want to say hello?</h4>
                            <p className="text-center">We'd love to hear from you! At Check a Treatment, we're dedicated to providing you with the best possible experience.</p>
                            <p className="text-center">Our contact form is your direct line to our team. Simply fill out the form below with your inquiry, and we'll get back to you as soon as possible. You can also reach us on email: <a href="mailto:support@checkatreatment.com" className="anchorBlack">support@checkatreatment.com</a></p>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="inner-page-content w-100 h-auto d-block position-relative py-5">
                <Container>
                    <Row>
                        <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                            <h3 className="text-normal">Get in Touch</h3>
                            <hr/>
                            <strong className="d-block my-1">Follow us on social platforms:</strong>
                            <div className="socialMedia-Contact">
                                <ul className="ps-0 mb-0 d-flex">
                                    <li><Link to="/"><img src={facebookIcon} alt="" /></Link></li>
                                    <li><Link to="/"><img src={instagramIcon} alt="" /></Link></li>
                                    <li><Link to="/"><img src={linkedinIcon} alt="" /></Link></li>
                                    <li><Link to="/"><img src={youtubeIcon} alt="" /></Link></li>
                                </ul>
                            </div>

                            <div className="contactPhoneEmail">
                                <ul className="ps-0 mb-0 d-flex flex-column mt-5">
                                    <li>
                                        <span className="tinyIcon">
                                            <img src={envelopeIconTiny} alt="" title="" />
                                        </span>
                                        <span className="tinyIconContent">
                                            <label>E-mail</label>
                                            <a href="mailto:support@checkatreatment.com">support@checkatreatment.com</a>
                                        </span>
                                    </li>

                                    <li>
                                        <span className="tinyIcon">
                                            <img src={phoneIconTiny} alt="" title="" />
                                        </span>
                                        <span className="tinyIconContent">
                                            <label>Phone Number</label>
                                            <a href="tel:1800000000000">1800-000-000-000</a>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                            <h3 className="text-normal">Send a Message</h3>
                            <hr/>
                            <form method="post" action="javascript:void(0)" className="contactForm mb-5">
                                <Row>
                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12} className="mb-3">
                                        <div className="form-group">
                                            <label className="mb-2" htmlFor="contactName">Full Name</label>
                                            <input type="text" id="contactName" name="contactName" className="form-control" placeholder="Name" required="required" />
                                        </div>
                                    </Col>

                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12} className="mb-3">
                                        <div className="form-group">
                                            <label className="mb-2" htmlFor="contactEmail">Email Address</label>
                                            <input type="email" id="contactEmail" name="contactEmail" className="form-control" placeholder="Email" required="required" />
                                        </div>
                                    </Col>

                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
                                        <div className="form-group">
                                            <label className="mb-2" htmlFor="contactPhone">Phone Number</label>
                                            <input type="tel" id="contactPhone" name="contactPhone" minLength={10} maxLength={12} className="form-control" placeholder="Phone" required="required" />
                                        </div>
                                    </Col>

                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12} className="mb-4">
                                        <div className="form-group">
                                            <label className="mb-2" htmlFor="textMessage">Message</label>
                                            <textarea id="textMessage" name="textMessage" className="form-control" placeholder="Text your message here..."></textarea>
                                        </div>
                                    </Col>

                                    <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
                                        <div className="form-group">
                                            <input type="submit" value="submit message" className="form-control text-capitalize" />
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                            
                        </Col>
                    </Row>

                    
                </Container>
            </div>
        </>
    )
}

export default ContactUs;