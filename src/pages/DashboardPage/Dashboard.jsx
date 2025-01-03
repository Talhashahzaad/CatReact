import React from "react";
import {Col, Row, Container} from "react-bootstrap";
import "./Dashboard.css";

const Dashboard = () => {
    const dashboardData = {
        totalReviews: 100,
        activeListing: 10,
        wishlist: 5,
        message: 20
    }
    return (
        <>
            <div className="dashboard-container w-100 h-auto d-block position-relative py-5 px-3">
                <Container>
                    <Row>
                        <div className="dashboard-header">
                            <h1>Dashboard</h1>
                        </div>
                        <div className="dashboard-sidebar-wrapper">
                            <Row>
                                <Col xxl={3} xl={3} lg={4} md={4} sm={12} className="d-block position-relative">
                                    <div className="dashboard-sidebar">
                                        <h2>Sidebar</h2>
                                    </div>
                                </Col>
                            
                                <Col xxl={9} xl={9} lg={8} md={8} sm={12} className="d-block position-relative">
                                    <div className="dashboard-content">
                                        <div className="dashboard-message-notification">
                                            <ul className="ps-0 mb-0 d-flex justify-content-between align-items-center">
                                                <li>
                                                    <h3>{dashboardData.totalReviews}</h3>
                                                    <strong>total reviews</strong>
                                                </li>

                                                <li>
                                                    <h3>{dashboardData.activeListing}</h3>
                                                    <strong>active listing</strong>
                                                </li>

                                                <li>
                                                    <h3>{dashboardData.wishlist}</h3>
                                                    <strong>wishlist</strong>
                                                </li>

                                                <li>
                                                    <h3>{dashboardData.message}</h3>
                                                    <strong>message</strong>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Dashboard;