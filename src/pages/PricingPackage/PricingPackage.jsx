import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "./PricingPackage.css";

const PricingPackage = () => {
    return (
        <div>
            <div className="inner-feature-banner w-100 h-auto d-block position-relative">
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
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <small className="animate__fadeInUp animate__animated text-center fw-bold mb-3 w-100 h-auto d-block position-relative text-capitalize">simple affordable pricing</small>
                            <h2 className="animate__fadeInUp animate__animated text-center fw-normal w-100 h-auto d-block position-relative text-capitalize">select your plan</h2>
                            <p className="animate__fadeInUp animate__animated text-center fw-normal w-100 h-auto d-block position-relative text-capitalize">select from best plans, ensuring perfect match. Need more or less? <br/>
                            Customize your subscription for a seamless fit.</p>
                        </Col>

                        <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
                            <div className="pricing-card w-100 h-auto d-block position-relative">
                                <div className="pricing-card-header w-100 h-auto d-block position-relative">
                                    <h3>basic</h3>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default PricingPackage;