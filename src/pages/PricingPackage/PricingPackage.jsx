import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./PricingPackage.css";
import axios from 'axios';

const PricingPackage = () => {
    const [pricingList, setPricingList] = useState([]);
    const [error, setError] = useState(null);

    const token = JSON.parse(localStorage.getItem("token"));
    const fetchPricingList = async () => {
        try {
            const response = await axios.get("http://3.8.140.227:8000/api/listing-packages", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            setPricingList(response.data);
        } catch (error) {
            console.error("Error fetching pricing list:", error);
            setError("Error fetching pricing list");
        }
    };

    useEffect(() => {
        fetchPricingList();
    }, []);

    return (
        <div>
            <div className="inner-feature-banner w-100 h-auto d-block position-relative pricing-package-banner">
                <Container>
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <h1 className="animate__fadeInUp animate__animated">pricing packages</h1>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="inner-page-content w-100 h-auto d-block position-relative py-5">
                <Container>
                    {pricingList.length > 0 && (
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <small className="animate__fadeInUp animate__animated text-center fw-bold mb-3 w-100 h-auto d-block position-relative text-capitalize">simple affordable pricing</small>
                            <h2 className="animate__fadeInUp animate__animated text-center fw-normal w-100 h-auto d-block position-relative text-capitalize">Subscription Plans</h2>
                            <p className="animate__fadeInUp animate__animated text-center fw-normal w-100 h-auto d-block position-relative text-capitalize">select from best plans, ensuring perfect match. Need more or less? <br/>
                            Customize your subscription for a seamless fit.</p>
                        </Col>

                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="w-100 h-auto d-block position-relative">
                                <ul className="w-100 h-auto d-flex position-relative ps-0 mb-0 justify-content-evenly align-items-flex-start pricing-card">
                                    <li className="w-100 h-auto d-block position-relative">
                                        <div className="w-100 h-auto d-block position-relative">
                                            <small className='mb-1 d-inline-flex'>for beginners</small>
                                            <h6 className="my-2">{pricingList[0].name}</h6>
                                            <h3 className="mt-2 mb-0 default-font">&#163; {pricingList[0].price}</h3>

                                            <div className="ps-0 mt-3 mb-0 packageListing">
                                                <dd>Advanced Business Profile Listing</dd>
                                                <dd>Check a Treatment Online Storefront <h6 className="d-block text-dark text-capitalize">(10% commission) </h6></dd>
                                                <dd>CaT Pro Social Media <h6 className="d-block text-dark text-capitalize">(Comming Soon)</h6></dd>
                                                <dd><s>Priority listing in search results</s></dd>
                                                <dd><s>Maximized Business Profile</s></dd>
                                                <dd><s>Unlimited Personal Business Live Chat for Client Enquiries</s></dd>
                                                <dd><s>Multiple Locations</s></dd>
                                                <dd><s>Opportunity to Feature on Beyond the Treatment</s></dd>
                                            </div>

                                            <div className='d-flex justify-content-between align-items-center'>
                                                <Link to="/business-registration" onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'})}} className='mt-2 w-25 h-auto d-block position-relative border-0 text-capitalize fw-normal bg-jetGreen text-white py-2 px-3 rounded-pill blackHoverEffect text-center'>sign up</Link>
                                                
                                                <Link to="/about-us" onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'})}} className='mt-2 w-25 h-auto d-block position-relative border-0 text-capitalize fw-normal bg-jetGreen text-white py-2 px-3 rounded-pill blackHoverEffect text-center'>learn more</Link>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="w-100 h-auto d-block position-relative">
                                        <div className="w-100 h-auto d-block position-relative">
                                            <small className='mb-1 d-inline-flex'>recommended</small>
                                            <h6 className="my-2">{pricingList[1].name}</h6>
                                            <h3 className="mt-2 mb-0 default-font">&#163; {pricingList[1].price}</h3>

                                            <div className="ps-0 mt-3 mb-0 packageListing">
                                                <dd>Advanced Business Profile Listing</dd>
                                                <dd>Check a Treatment Online Storefront <h6 className="d-block text-dark text-capitalize">(4% commission) </h6></dd>
                                                <dd>CaT Pro Social Media <h6 className="d-block text-dark text-capitalize">(Comming Soon)</h6></dd>
                                                <dd><s>Priority listing in search results</s></dd>
                                                <dd><s>Maximized Business Profile</s></dd>
                                                <dd><s>Unlimited Personal Business Live Chat for Client Enquiries</s></dd>
                                                <dd><s>Multiple Locations</s></dd>
                                                <dd><s>Opportunity to Feature on Beyond the Treatment</s></dd>
                                            </div>
                                            
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <Link to="/business-registration" onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'})}} className='mt-2 w-25 h-auto d-block position-relative border-0 text-capitalize fw-normal bg-jetGreen text-white py-2 px-3 rounded-pill blackHoverEffect text-center'>sign up</Link>
                                                
                                                <Link to="/about-us" onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'})}} className='mt-2 w-25 h-auto d-block position-relative border-0 text-capitalize fw-normal bg-jetGreen text-white py-2 px-3 rounded-pill blackHoverEffect text-center'>learn more</Link>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="w-100 h-auto d-block position-relative">
                                        <div className="w-100 h-auto d-block position-relative">
                                            <small className='mb-1 d-inline-flex'>best value offer</small>
                                            <h6 className="my-2">{pricingList[2].name}</h6>
                                            <h3 className="mt-2 mb-0 default-font">&#163; {pricingList[2].price}</h3>

                                            <div className="ps-0 mt-3 mb-0 packageListing">
                                                <dd>Advanced Business Profile Listing</dd>
                                                <dd>Check a Treatment Online Storefront <h6 className="d-block text-dark text-capitalize">(zero commission) </h6></dd>
                                                <dd>CaT Pro Social Media <h6 className="d-block text-dark text-capitalize">(Comming Soon)</h6></dd>
                                                <dd>Priority listing in search results</dd>
                                                <dd>Maximized Business Profile</dd>
                                                <dd>Unlimited Personal Business Live Chat for Client Enquiries</dd>
                                                <dd>Multiple Locations</dd>
                                                <dd>Opportunity to Feature on Beyond the Treatment</dd>
                                            </div>
                                            
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <Link to="/business-registration" onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'})}} className='mt-2 w-25 h-auto d-block position-relative border-0 text-capitalize fw-normal bg-jetGreen text-white py-2 px-3 rounded-pill blackHoverEffect text-center'>sign up</Link>
                                                
                                                <Link to="/about-us" onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'})}} className='mt-2 w-25 h-auto d-block position-relative border-0 text-capitalize fw-normal bg-jetGreen text-white py-2 px-3 rounded-pill blackHoverEffect text-center'>learn more</Link>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Col>

                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="w-100 h-auto d-block position-relative">
                                <h4 className="animate__fadeInUp animate__animated text-center fw-normal w-100 h-auto d-block position-relative text-normal pt-5">* Plan change available at any time</h4>
                                <p className="animate__fadeInUp animate__animated text-center fw-normal w-100 h-auto d-block position-relative text-normal pt-3">We are an Advanced Directory, Online Storefront, and Professional’s Social Media for the Treatment Industry, Spanning Across Beauty, Wellness and Healthcare, and Covering the Whole of the UK.</p>
                            </div>
                        </Col>
                    </Row>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default PricingPackage;