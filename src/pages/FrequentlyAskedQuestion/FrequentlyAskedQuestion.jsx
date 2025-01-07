import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import {Container, Row, Col} from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./FrequentlyAskedQuestion.css";

const FrequentlyAskedQuestion = () => {
    return (
        <>
            <div className="feature-banner w-100 h-auto d-block position-relative">
                <Container>
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                            <h1 className="animate__fadeInUp animate__animated">Frequently Asked Question</h1>
                        </Col>
                    </Row>
                </Container>
            </div>

            

            <div className="inner-page py-5">
            <Accordion defaultActiveKey="0" flush>
                <Container>
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><h4 className='fw-normal mb-0'>What is Check a Treatment?</h4></Accordion.Header>
                                    <Accordion.Body>
                                    <p>Check a Treatment is an innovative online platform and directory for beauty, wellness, and health services. We connect customers with practitioners and provide businesses with tools to showcase their services and grow their client base.</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                            
                        </Col>
                    </Row>
                </Container>


                <Container>
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <h3 className='mb-3 mt-5 fw-normal'>For Businesses</h3>
                        <hr/>
                            
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header><h4 className='fw-normal mb-0'>How does Check a Treatment support businesses?</h4></Accordion.Header>
                                    <Accordion.Body>
                                    <p><strong>Businesses can:</strong></p>
                                    <ul>
                                        <li>List their services for free or choose our fixed subscription plans.</li>
                                        <li>Sync social media uploads to keep profiles fresh.</li>
                                        <li>Access CaT Pro Social Media for professional connecting.</li>
                                        <li>Utilize our Check a Treatment Marketplace to sell products.</li>
                                    </ul>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="2">
                                    <Accordion.Header><h4 className='fw-normal mb-0'>How much does it cost to join Check a Treatment?</h4></Accordion.Header>
                                    <Accordion.Body>
                                    <p><strong>For businesses, there are three membership options:</strong></p>
                                    <ul>
                                        <li>Freemium Plan: Completely free listing.</li>
                                        <li>Professional Plan: £15/month Includes social media auto uploads<sup>™</sup>, priority listing.</li>
                                        <li>Elite Plan: &pound;35/month Includes advanced perks like personal business Live Chat.</li>
                                    </ul>
                                    <p>Click here to explore our business membership plans in detail and choose the perfect option that matches your business virtue and goals.</p>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="3">
                                    <Accordion.Header><h4 className='fw-normal mb-0'>How do I list my business on Check a Treatment?</h4></Accordion.Header>
                                    <Accordion.Body>
                                    <p><strong>It’s simple! Just:</strong></p>
                                    <ul>
                                        <li>Create an account.</li>
                                        <li>Complete your business profile, including treatments, qualifications, and photos.</li>
                                        <li>Choose your preferred membership plan and start connecting with clients.</li>
                                    </ul>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="4">
                                    <Accordion.Header><h4 className='fw-normal mb-0'>How does the social media sync feature work?</h4></Accordion.Header>
                                    <Accordion.Body>
                                    <p>When you set up your business profile, input your preferred social media account that you wish to autosync™ your photos (maybe input a screen shot of this page and an arrow) All of the pictures that you upload on to this account will automatically upload to your Check a Treatment profile, keeping your profile updated effortlessly.</p>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="5">
                                    <Accordion.Header><h4 className='fw-normal mb-0'>Can I sell products on Check a Treatment?</h4></Accordion.Header>
                                    <Accordion.Body>
                                    <p>Yes! Our Marketplace feature allows businesses to list and sell products directly to customers, creating another revenue stream.</p>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="6">
                                    <Accordion.Header><h4 className='fw-normal mb-0'>What is CaT Pro Social Media?</h4></Accordion.Header>
                                    <Accordion.Body>
                                    <p>CaT Pro Social is an exclusive social media for practitioners to share experiences, ask questions, and connect with like-minded professionals. As soon as you have created your business account, you will have access to CaT Pro Social here (maybe we should have a screen shot)</p>
                                    <p>CaT Pro Social App – COMING SOON!</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                            
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <h3 className='mb-3 mt-5 fw-normal'>For Customers</h3>
                        <hr/>
                            
                                <Accordion.Item eventKey="7">
                                    <Accordion.Header><h4 className='fw-normal mb-0'>How does Check a Treatment work for customers?</h4></Accordion.Header>
                                    <Accordion.Body>
                                    <p><strong>Customers create a free account:</strong></p>
                                    <ul>
                                        <li><strong>Search</strong> for treatments by category, location, or business.</li>
                                        <li><strong>Browse</strong> profiles with up-to-date information, including qualifications and practitioner affiliations.</li>
                                        <li><strong>Book treatments</strong> directly through businesses' links or use the live chat feature for inquiries (available for Elite members).</li>
                                    </ul>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="8">
                                    <Accordion.Header><h4 className='fw-normal mb-0'>Can I see practitioners’ qualifications?</h4></Accordion.Header>
                                    <Accordion.Body>
                                    <p>Yes! Practitioners can showcase their qualifications and professional affiliations on their profiles to ensure transparency and trust.</p>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="9">
                                    <Accordion.Header><h4 className='fw-normal mb-0'>How do I contact a business?</h4></Accordion.Header>
                                    <Accordion.Body>
                                    <p>You can use the live chat feature (available for Elite members) to inquire directly with businesses or follow links to their booking pages.</p>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="10">
                                    <Accordion.Header><h4 className='fw-normal mb-0'>Can I find trending and new treatments?</h4></Accordion.Header>
                                    <Accordion.Body>
                                    <p>Absolutely! Follow our Beyond the Treatment series, available on CaT Pro Social Media, Instagram, Facebook, TikTok, and YouTube, for interviews and insights from top practitioners.</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                            
                        </Col>
                    </Row>
                </Container>


                <Container>
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <h3 className='mb-3 mt-5 fw-normal'>Technical and Support</h3>
                            <hr/>
                            
                                <Accordion.Item eventKey="11">
                                    <Accordion.Header><h4 className='fw-normal mb-0'>What happens if I forget my login details?</h4></Accordion.Header>
                                    <Accordion.Body>
                                    <p>You can reset your password using the “Forgot Password” link on the login page. For further assistance, contact our support team at <Link to="mailto:support@checkatreatment.com">support@checkatreatment.com</Link></p>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="12">
                                    <Accordion.Header><h4 className='fw-normal mb-0'>Is my data secure on Check a Treatment?</h4></Accordion.Header>
                                    <Accordion.Body>
                                    <p>Yes! We prioritize your privacy and security. All personal data is handled in accordance with our Privacy Policy.</p>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="13">
                                    <Accordion.Header><h4 className='fw-normal mb-0'>How do I contact Check a Treatment for help or feedback?</h4></Accordion.Header>
                                    <Accordion.Body>
                                    <p>You can reach our support team via email at <Link to="mailto:support@checkatreatment.com">support@checkatreatment.com</Link> or use the <Link to="/contact-us">contact form</Link> on our website.</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                        </Col>
                    </Row>
                </Container>
                </Accordion>
            </div>
        </>
    )
}

export default FrequentlyAskedQuestion;