import React from "react";
import { Col, Nav, Row, Tab, Container } from 'react-bootstrap';
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
            <Container fluid>
                <div className="dashboard-page-section w-100 h-auto d-block position-relative py-5">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="dashboard-panel-dash">
                        <Row>
                            <Col xxl={3} xl={3} lg={3} md={4} sm={12}>
                                <div className="left-side-section">
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="dashboard-panel-dash">dashboard</Nav.Link>
                                        </Nav.Item>

                                        <Nav.Item>
                                            <Nav.Link eventKey="listing-panel-dash">listing</Nav.Link>
                                        </Nav.Item>

                                        <Nav.Item>
                                            <Nav.Link eventKey="other-panel-dash">others</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                            </Col>

                            <Col xxl={9} xl={9} lg={9} md={8} sm={12}>
                                <div className="right-side-section">
                                    <Tab.Content>
                                        <Tab.Pane eventKey="dashboard-panel-dash">
                                            <div className="dashboard-message-notification">
                                                <ul className="ps-0 mb-0 d-flex justify-content-between align-items-center">
                                                    <li>
                                                        <h3>{dashboardData.totalReviews}</h3>
                                                        <strong>total admin</strong>
                                                    </li>

                                                    <li>
                                                        <h3>{dashboardData.activeListing}</h3>
                                                        <strong>news</strong>
                                                    </li>

                                                    <li>
                                                        <h3>{dashboardData.wishlist}</h3>
                                                        <strong>reports</strong>
                                                    </li>

                                                    <li>
                                                        <h3>{dashboardData.message}</h3>
                                                        <strong>online users</strong>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Tab.Pane>





                                        <Tab.Pane eventKey="listing-panel-dash">Second tab content</Tab.Pane>





                                        <Tab.Pane eventKey="other-panel-dash">nina tab content</Tab.Pane>
                                    </Tab.Content>
                                </div>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </Container>
        </>
    );
}

export default Dashboard;