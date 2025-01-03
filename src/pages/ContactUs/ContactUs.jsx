import React from "react";
import { Container, Row, Col } from "react-bootstrap";
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
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="inner-page-content w-100 h-auto d-block position-relative py-5">
                <Container>
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <h3 className="text-capitalize">get in touch</h3>
                            <hr/>
                        </Col>
                    </Row>

                    <form method="post" action="javascript:void(0)" className="contactForm mb-5">
                        <Row>
                            <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12} className="mb-3">
                                <div className="form-group">
                                    <label className="mb-2" htmlFor="contactName">Full Name</label>
                                    <input type="text" id="contactName" name="contactName" className="form-control" placeholder="Name" required="required" />
                                </div>
                            </Col>

                            <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12} className="mb-3">
                                <div className="form-group">
                                    <label className="mb-2" htmlFor="contactEmail">Email Address</label>
                                    <input type="email" id="contactEmail" name="contactEmail" className="form-control" placeholder="Email" required="required" />
                                </div>
                            </Col>

                            <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12} className="mb-3">
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
                </Container>

                <Container>
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <span className="contactMessage w-100 h-auto d-block position-relative p-3 mt-5">
                                <h3 className="text-capitalize mb-3">Have questions, feedback, or just want to say hello?</h3>
                                <p className="mb-0">We'd love to hear from you! At Check a Treatment, we're dedicated to providing you with the best possible experience.</p>
                                <p>Our contact form is your direct line to our team. Simply fill out the form below with your inquiry, and we'll get back to you as soon as possible. You can also reach us on email: <a href="mailto:support@checkatreatment.com" className="anchorGreen">support@checkatreatment.com</a></p>
                            </span>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default ContactUs;