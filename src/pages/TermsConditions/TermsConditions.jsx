import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../App.css';

const TermsConditions = () => {
    const contactEmail = "support@checkatreatment.com";
    return (
        <>
        <div className="feature-banner w-100 h-auto d-block position-relative">
            <Container>
                <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                        <h1 className="animate__fadeInUp animate__animated">Terms &amp; Conditions</h1>
                    </Col>
                </Row>
            </Container>
        </div>

        <div className="inner-page-content w-100 h-auto d-block position-relative py-5">
            <Container>
                <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                        <h2>Terms and Conditions for Check a Treatment Limited</h2>
                        <p>These Terms and Conditions govern your use of the Check a Treatment Limited website and services. By accessing or using Check a Treatment Limited, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.</p>

                        <ol type="1">
                            <li>
                                <h3>Use of Our Services:</h3>
                                <ol type="A">
                                    <li><strong>Eligibility:</strong> You must be at least 18 years old to use our website and services. By using Check a Treatment, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms and Conditions.</li>
                                    
                                    <li><strong>Account Creation:</strong> You may be required to create an account to access certain features of our website and services. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</li>
                                </ol>
                            </li>

                            <li>
                                <h3>User Content:</h3>
                                <ol type="A">
                                    <li><strong>Submission:</strong> You may submit content, such as business listings, reviews, comments, and messages, to our website. By submitting content, you grant us a non-exclusive, worldwide, royalty-free, perpetual, irrevocable, and sublicensable right to use, reproduce, modify, adapt, publish, translate, distribute, and display such content in any media.</li>
                                    
                                    <li><strong>Ownership:</strong> You retain ownership of any content you submit to our website. However, by submitting content, you represent and warrant that you have the necessary rights to grant the licenses and permissions described above.</li>
                                </ol>
                            </li>

                            <li>
                                <h3>Prohibited Conduct:</h3>
                                <p>You agree not to engage in any of the following prohibited activities:</p>
                                <ol type="A">
                                    <li>Violating any applicable laws or regulations.</li>
                                    <li>Interfering with the operation of our website or services.</li>
                                    <li>Impersonating any person or entity, or falsely stating or misrepresenting your affiliation with any person or entity.</li>
                                    <li>Posting or transmitting any content that is unlawful, harmful, defamatory, obscene, or otherwise objectionable.</li>
                                    <li>Engaging in any conduct that could damage, disable, overburden, or impair our servers or networks.</li>
                                </ol>
                            </li>

                            <li>
                                <h3>Intellectual Property:</h3>
                                <ol type="A">
                                    <li><strong>Ownership:</strong> All content and materials on our website, including text, graphics, logos, images, and software, are owned by Check a Treatment Limited or its licensors and are protected by copyright, trademark, and other intellectual property laws.</li>
                                    
                                    <li><strong>License:</strong> Subject to these Terms and Conditions, we grant you a limited, non-exclusive, non-transferable, and revocable license to access and use our website and services for your personal and non-commercial use.</li>
                                </ol>
                            </li>

                            <li>
                                <h3>Limitation of Liability:</h3>
                                <ol type="A">
                                    <li><strong>Disclaimer</strong> Our website and services are provided on an “as-is” and “as-available” basis, without any warranties of any kind, either express or implied. We do not guarantee the accuracy, completeness, or reliability of any content or information on our website.</li>

                                    <li><strong>Limitation of Liability</strong> To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our website or services, even if we have been advised of the possibility of such damages.</li>
                                </ol>
                            </li>

                            <li>
                                <h3>Indemnification:</h3>
                                <p>You agree to indemnify and hold harmless Check a Treatment Limited and its affiliates, officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, costs, and expenses (including attorneys’ fees) arising out of or relating to your use of our website or services or your violation of these Terms and Conditions.</p>
                            </li>

                            <li>
                                <h3>Governing Law and Jurisdiction:</h3>
                                <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of laws principles. Any dispute arising out of or relating to these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts of [Jurisdiction].</p>
                            </li>

                            <li>
                                <h3>Changes to Terms and Conditions:</h3>
                                <p>We reserve the right to modify or update these Terms and Conditions at any time without prior notice. You are responsible for reviewing these Terms and Conditions periodically for changes. Your continued use of our website or services after any modifications to these Terms and Conditions constitutes acceptance of such changes.</p>
                            </li>

                            <li>
                                <h3>Contact Us:</h3>
                                <p>If you have any questions, concerns, or feedback about these Terms and Conditions, please contact us at <Link to={`mailto:${contactEmail}`} className="text-decoration-underline text-dark">{contactEmail}</Link></p>
                            </li>

                            <li>
                                <h3>Effective Date: 12th March 2024</h3>
                                <p>These Terms and Conditions are effective as of the date indicated above.</p>
                            </li>
                        </ol>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
    );
};

export default TermsConditions;