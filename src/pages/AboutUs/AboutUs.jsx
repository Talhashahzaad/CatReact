import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom";
import InspiredBySuccess from '../../images/Inspired-by-Success.webp';
import SimplifyingBeautySearches from '../../images/Simplifying-Beauty-Searches.webp';
import OurMission from '../../images/Our-Mission.png';

import './AboutUs.css';

function AboutUs(){
    return(
        <>
            <div className="inner-feature-banner">
                <Container>
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <h1 className="animate__fadeInUp animate__animated">about us</h1>
                            <p>Welcome to <strong>Check a Treatment</strong>—your go-to platform for discovering, connecting, and collaborating in the world of treatments. Founded on the principles of inclusion, transparency, and innovation, Check a Treatment is more than just a directory; it’s a thriving community designed to empower both businesses and customers alike.</p>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="about-section-b">
                <Container>
                    <Row>
                        <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                            <figure className="mb-0"><img src={InspiredBySuccess} alt="" title="" width="" height="" className="img-fluid" /></figure>
                        </Col>

                        <Col xxl={7} xl={7} lg={7} md={12} sm={12} xs={12}>
                            <div className="d-flex flex-column justify-content-center align-items-start h-100">
                                <h2>Meet Our Founder</h2>
                                <blockquote><em>"At Check a Treatment, we’re redefining how people discover treatments by fostering collaboration and connection at every touchpoint. I’m proud to bring my expertise as a Psychotherapist, Nurse, and Neurodiversity Educator to create a space where everyone can feel empowered and understood."</em></blockquote>
                                <strong className="d-block mb-3">— Tallulah Hedges, CEO and Founder</strong>

                                <p className="pb-3">With years of experience in mental health, healthcare, and education, Tallulah envisioned a platform that caters to every individual’s unique needs while championing inclusivity and accessibility. Her passion for creating meaningful connections inspired the launch of Check a Treatment, a space where all businesses, from small independents to industry leaders, can shine.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            
            <div className="about-section-a">
                <Container>
                    <Row>
                        <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                            <h2 className="pb-3">What Makes Us Unique</h2>
                            <p><em>We believe beauty and wellness go beyond treatments—they’re experiences that enhance lives and foster happiness. <strong>At Check a Treatment, we provide:</strong></em></p>
                            <ul className="gap-2 d-flex flex-column">
                                <li><strong>CaT Pro Social Media: <mark className="text-success">(coming soon)</mark></strong> A dedicated space for business members to connect, share ideas, and build meaningful relationships. It’s a platform for meeting like-minded professionals, asking questions, engaging in fun and supportive conversations, and creating a collaborative environment where everyone can thrive.</li>

                                <li><strong>Live Chat for Elite Members: <mark className="text-success">(coming soon)</mark></strong> A seamless communication tool that allows customers to easily enquire about services, ensuring accessibility and convenience for both businesses and customers.</li>

                                <li><strong>Beyond the Treatment<sup>TM</sup>:</strong> Insightful interviews and educational content that bridge the gap between customers and businesses, offering a deeper understanding of treatments and the people behind them.</li>

                                <li><strong>Check a Treatment Marketplace: <mark className="text-success">(coming soon)</mark></strong> A vibrant hub where businesses can sell products and customers can discover unique items, promoting creativity and supporting local businesses.</li>
                            </ul>
                            
                            <p>These features aren’t just tools—they’re pathways to creating happiness, fostering connections, and enhancing the lives of everyone who uses or views them. At Check a Treatment, every moment is an opportunity to make a meaningful impact</p>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                            <figure className="mb-0"><img src={SimplifyingBeautySearches} alt="" title="" width="" height="" className="img-fluid" /></figure>
                        </Col>
                    </Row>
                </Container>
            </div>
                        
            <div className="beauty-and-wellness">
                <Container>
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <h2>Join Us on This Journey</h2>
                            <p>We’re here to create more than just connections—we’re building a movement where inclusivity, professionalism, and passion redefine the treatment industry. Dive in, explore, and see what Check a Treatment can do for you!</p>

                            <ul className="d-flex justify-content-center mb-0 ps-0">
                                <li>
                                    <Link to="/business-registration" className="green-btn" onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'})}}>list my business</Link>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default AboutUs;