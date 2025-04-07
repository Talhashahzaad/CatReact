import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import forBusiness from "../../images/for-business.png";
import ReachYourTargetAudience from "../../images/Reach-Your-Target-Audience.png";
import DisplayCustomer from "../../images/Display-Customer.png";
import ShowcaseUnique from "../../images/Showcase-Unique.png";
import HighlightYour from "../../images/Highlight-Your.png";
import GetMore from "../../images/Get-More.png";
import DriveTrafficToYourBusiness from "../../images/Drive-Traffic-to-Your-Business.png";
import "./ForBusiness.css";
import axios from "axios";


const ForBusiness = () => {
    const [subscriptionPlans, setSubscriptionPlans] = useState([]);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");
    const fetchSubscriptionPlans = async () => {
        try {
            const response = await axios.get("http://3.8.140.227:8000/api/listing-packages", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            setSubscriptionPlans(response.data);
        } catch (error) {
            console.error("Error fetching subscription plans:", error);
            setError("Error fetching subscription plans");
        }
    }

    useEffect(() => {
        fetchSubscriptionPlans();
    }, []);

    const [planID, setPlanID] = useState(null);

    const fetchSelectedPlan = async () => {
        const response = await axios.get(`http://3.8.140.227:8000/api/checkout/${planID}`);
        setPlanID(response.data);
    }

    useEffect(() => {
        fetchSelectedPlan();
    }, [planID]);
    
    return (
        <>
            <div className="inner-feature-banner for-business">
                <Container>
                    <Row>
                        <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} className="d-flex flex-column justify-content-center">
                            <h1 className="animate__fadeInUp animate__animated">Drive Your Business Forward with Check a Treatment</h1>
                            <p>Welcome to <strong>Check a Treatment</strong>, the ultimate platform for professionals to showcase their services, grow their businesses, and connect with like-minded professionals and clients. Whether you're a seasoned expert or just starting your journey, Check a Treatment offers tailored tools and features to help you thrive.</p>
                        </Col>
                        <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                            <img src={forBusiness} alt="" title="" width="" height="" className="img-fluid" />
                        </Col>
                    </Row>
                </Container>
            </div>
            

            <div className="inner-page">
                <Container>
                    <div className="py-5">
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Row>
                                <Col xxl={6} xl={6} lg={12} md={12} sm={12} xs={12} className="why-join-us-img">
                                    <img src={ReachYourTargetAudience} alt="" title="" width="" height="" className="img-fluid" />
                                </Col>

                                <Col xxl={6} xl={6} lg={12} md={12} sm={12} xs={12}>
                                    <div className="d-flex align-items-start justify-content-center flex-column h-100">
                                        <h2 className="mb-3 fw-normal">Why Join Check a Treatment?</h2>
                                        <ol type="1">
                                            <li>
                                                <p className="mb-0"><strong>Comprehensive Business Profile:</strong> Create a standout listing that highlights your expertise, services, and qualifications.</p>
                                            </li>
                                            <li>
                                                <p className="mb-0"><strong>CaT Pro Social Media:</strong> Engage with a vibrant community of professionals, share ideas, ask questions, and form meaningful connections.</p>
                                            </li>
                                            <li>
                                                <p className="mb-0"><strong>Live Chat for Elite Members:</strong> Simplify and professionalize communication with clients through real-time enquiries, making bookings and consultations quick and effortless.</p>
                                            </li>
                                            <li>
                                                <p className="mb-0"><strong>Social Media Autouploads<sup>TM</sup>:</strong> Keep your profile fresh and relevant by syncing your social media content directly to your Check a Treatment listing.</p>
                                            </li>
                                            <li>
                                                <p className="mb-0"><strong>Beyond the Treatment Opportunities:</strong> Showcase your skills and personality by featuring on our popular video series, inspiring trust and excitement in potential clients.</p>
                                            </li>
                                            <li>
                                                <p className="mb-0"><strong>Check a Treatment Marketplace:</strong> Sell products directly to clients, with tailored commission rates based on your membership plan.</p>
                                            </li>
                                        </ol>
                                        <aside><Link to="/" className="green-btn text-capitalize">add listing</Link></aside>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </div>
                </Container>

                <div className="business-and-platinum-section">
                    <Container>
                        <Row>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                                <h2 className="mb-3 fw-normal lh-base">Subscription Plans<br/> We offer flexible plans to suit all</h2>
                            </Col>

                            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                                {subscriptionPlans.length > 0 && (
                                    <div className="subscription-plan-section w-100 h-auto d-flex align-items-center justify-content-evenly">
                                        <div className="left-side-subscription-plan-section text-center">
                                            <strong>{subscriptionPlans[0].name}</strong>
                                            <h3 className="text-uppercase display-2 fw-bold">{subscriptionPlans[0].type}</h3>
                                            <p>Check a Treatment Online Store front </p>
                                            <Link to="/checkout" state={{ planId: subscriptionPlans[0].id }} className="btn form-control"
                                            onClick={() => {
                                                window.scrollTo(0, 0);
                                            }}>checkout</Link>
                                        </div>

                                        <div className="middle-side-subscription-plan-section text-center">
                                            <strong>{subscriptionPlans[2].name}</strong>
                                            <h3 className="text-uppercase display-2 fw-bold"><dd>&pound;</dd>{subscriptionPlans[2].price}<small>/m</small></h3>
                                            <p>Check a Treatment Online Store front </p>
                                            <p>CaT Pro Social Media <br/><b>(Comming Soon)</b></p>
                                            <p>Priority listing in search results</p>
                                            <p>Maximized Business Profile</p>
                                            <p>Unlimited Personal Business Live Chat for Client Enquiries</p>
                                            <p>Multiple Locations</p>
                                            <p>Opportunity to Feature on Beyond the Treatment</p>
                                            <Link to="/checkout" state={{ planId: subscriptionPlans[2].id }} className="btn form-control"
                                            onClick={() => {
                                                window.scrollTo(0, 0);
                                            }}>checkout</Link>
                                        </div>

                                        <div className="right-side-subscription-plan-section text-center">
                                            <strong>{subscriptionPlans[1].name}</strong>
                                            <h3 className="text-uppercase display-2 fw-bold"><dd>&pound;</dd>{subscriptionPlans[1].price}<small>/m</small></h3>
                                            <p>Check a Treatment Online Store front </p>
                                            <p>CaT Pro Social Media <br/><b>(Comming Soon)</b></p>
                                            <Link to="/checkout" state={{ planId: subscriptionPlans[1].id }} className="btn form-control"
                                            onClick={() => {
                                                window.scrollTo(0, 0);
                                            }}>checkout</Link>
                                        </div>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </div>


                <div className="increase-your-visibility">
                    <Container>
                        <Row>
                            <Col xxl={6} xl={6} lg={12} md={12} sm={12} xs={12}>
                                <div className="d-flex justify-content-center align-items-start flex-column h-100">
                                    <h2 className="mb-3 fw-normal">Benefits for Businesses</h2>
                                    <p>&#x2022; <strong>Increased Visibility:</strong> Appear in client searches with detailed profiles and prioritized listings.</p>
                                    <p>&#x2022; <strong>Enhanced Professional Growth:</strong> Network with other professionals on CaT Pro Social Media and exchange valuable insights.</p>
                                    <p>&#x2022; <strong>Effortless Updates:</strong> Keep your profile updated automatically through our Social Media Autouploads<sup>TM</sup> feature.</p>
                                    <p>&#x2022; <strong>Revenue Growth:</strong> Use the Marketplace to sell products and expand your business reach with competitive commission rates.</p>
                                    <aside><Link to="/" className="green-btn text-capitalize">add listing</Link></aside>
                                </div>
                            </Col>

                            <Col xxl={6} xl={6} lg={12} md={12} sm={12} xs={12}>
                                <ul className="d-flex">
                                    <li>
                                        <img src={DisplayCustomer} alt="" title="" width="" height="" className="" />
                                        <strong>Display Customer Testimonials</strong>
                                    </li>

                                    <li>
                                        <img src={ShowcaseUnique} alt="" title="" width="" height="" className="" />
                                        <strong>Showcase Unique Offerings</strong>
                                    </li>

                                    <li>
                                        <img src={HighlightYour} alt="" title="" width="" height="" className="" />
                                        <strong>Highlight Your Services</strong>
                                    </li>

                                    <li>
                                        <img src={GetMore} alt="" title="" width="" height="" className="" />
                                        <strong>Get More Customers</strong>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Container>
                    <Row className="py-5">
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Row>
                                <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                                    <div className="d-flex align-items-start justify-content-center flex-column h-100">
                                        <h3 className="mb-3 fw-normal">Flexible Options</h3>
                                        <p>Our plans are designed with flexibility in mind. Upgrade or change your subscription at any time to align with your business goals.</p>
                                        
                                        <h3 className="mb-3 fw-normal">Join Us Today!</h3>
                                        <p>Start showcasing your services and connecting with a supportive community. Choose the plan that's right for you and take your business to the next level.</p>
                                        <aside><Link to="/" className="green-btn text-capitalize">add listing</Link></aside>
                                    </div>
                                </Col>

                                <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                                    <img src={DriveTrafficToYourBusiness} alt="" title="" width="" height="" className="img-fluid" />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default ForBusiness;