import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../App.css";

const PrivacyPolicy = () => {
    const contactEmail = "support@checkatreatment.com";
    return (
        <>
            <div className="feature-banner w-100 h-auto d-block position-relative">
                <Container>
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                            <h1 className="animate__fadeInUp animate__animated">Privacy Policy</h1>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="inner-page-content w-100 h-auto d-block position-relative py-5">
                <Container>
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                            <h2>Privacy Policy for Check a Treatment Limited</h2>
                            <p>At Check a Treatment Limited, we are committed to protecting the privacy and security of our users. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you use our website or services. By accessing or using Check a Treatment Limited, you agree to the terms of this Privacy Policy.</p>

                            <ol type="1">
                                <li>
                                    <h3>Information We Collect:</h3>
                                    <ol type="A">
                                        <li><strong>Personal Information:</strong> When you sign up for an account or use our services, we may collect personal information such as your name, email address, phone number, and location.</li>
                                        
                                        <li><strong>Business Information:</strong> If you are a business owner, we may collect additional information about your business, including but not limited to business name, address, services offered, photos, and customer reviews.</li>

                                        <li><strong>Usage Information:</strong> We may collect information about your interactions with our website and services, including your browsing activity, search queries, and device information.</li>
                                    </ol>
                                </li>

                                <li>
                                    <h3>How We Use Your Information:</h3>
                                    <ol type="A">
                                        <li><strong>To Provide and Improve Our Services:</strong> We use your information to operate, maintain, and improve our website and services, including personalized recommendations, customer support, and analytics.</li>
                                        
                                        <li><strong>To Communicate with You:</strong> We may use your contact information to send you updates, newsletters, promotional offers, and other communications related to our services.</li>

                                        <li><strong>To Customize Your Experience:</strong> We may use your information to tailor our services to your preferences and provide you with relevant content and recommendations.</li>
                                    </ol>
                                </li>

                                <li>
                                    <h3>How We Share Your Information:</h3>
                                    <ol type="A">
                                        <li><strong>With Business Owners:</strong> If you are a user seeking beauty, hair, or wellness treatments, we may share your information with business owners to facilitate appointments, bookings, and inquiries.</li>
                                        
                                        <li><strong>With Service Providers:</strong> We may share your information with third-party service providers who help us operate, maintain, and improve our website and services.</li>

                                        <li><strong>With Legal Authorities:</strong> We may disclose your information if required by law or to protect our rights, property, or safety, or the rights, property, or safety of others.</li>
                                    </ol>
                                </li>

                                <li>
                                    <h3>Your Choices and Rights:</h3>
                                    <ol type="A">
                                        <li><strong>Access and Update Your Information:</strong> You may access, update, or correct your personal information by logging into your account settings or contacting us directly.</li>
                                        
                                        <li><strong>Opt-Out of Communications:</strong> You may opt out of receiving promotional communications from us by following the instructions provided in the communication or contacting us directly.</li>
                                    </ol>
                                </li>

                                <li>
                                    <h3>Data Security:</h3>
                                    <p>We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
                                </li>

                                <li>
                                    <h3>Children's Privacy:</h3>
                                    <p>Our website and services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under the age of 18. If you believe that we have collected personal information from a child under the age of 18, please contact us immediately.</p>
                                </li>

                                <li>
                                    <h3>Changes to this Privacy Policy:</h3>
                                    <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated Privacy Policy on our website or by other means of communication.</p>
                                </li>

                                <li>
                                    <h3>Contact Us:</h3>
                                    <p>If you have any questions, concerns, or complaints about this Privacy Policy or our practices, please contact us at <Link to={`mailto:${contactEmail}`} className="text-decoration-underline text-dark">{contactEmail}</Link></p>
                                </li>

                                <li>
                                    <h3>Effective Date: 12th March 2024</h3>
                                    <p>This Privacy Policy is effective as of the date indicated above.</p>
                                </li>
                            </ol>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default PrivacyPolicy;