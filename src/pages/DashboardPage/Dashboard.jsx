import React from "react";
import {Col, Row, Tab, Container, Nav} from 'react-bootstrap';

import "./Dashboard.css";
import "../../App.css";
import DashboardSidebar from "./DashboardSidebar/DashboardSidebar";
import TreatmentCategories from "./TreatmentCategories/TreatmentCategories.jsx";
import Treatments from "./Treatments/Treatments.jsx";
import TreatmentPackages from "./TreatmentPackages/TreatmentPackages.jsx";
import Location from "./Location/Location.jsx";
import Amenity from "./Amenity/Amenity.jsx";
import Tags from "./Tags/Tags.jsx";
import PracitionerQualifications from "./PractitionerQualifications/PractitionerQualifications.jsx";
import ProfessionalAffiliations from "../ProfessionalAffiliations/ProfessionalAffiliations.jsx";
import AllListing from "./AllListing/AllListing.jsx";

const Dashboard = () =>{
    const dashboardData = {
        totalReviews: 100,
        activeListing: 10,
        wishlist: 5,
        message: 20
    }

    return(
        <>
        <Container fluid>
            <div className="dashboard-page-section w-100 h-auto d-block position-relative py-5">
                <Tab.Container id="left-tabs-example" defaultActiveKey="dashboard-panel-dash">
                    <Row>
                        <Col xxl={3} xl={3} lg={3} md={4} sm={12}>
                            <DashboardSidebar />
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

                                    <Tab.Pane eventKey="allListing-panel-dash">
                                        <AllListing />
                                    </Tab.Pane>
                                    
                                    <Tab.Pane eventKey="treatmentCategories-panel-dash">
                                        <TreatmentCategories/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="treatments-panel-dash">
                                        <Treatments />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="treatmentPackages-panel-dash">
                                        <TreatmentPackages />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="locations-panel-dash">
                                        <Location />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="amenities-panel-dash">
                                        <Amenity />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="tags-panel-dash">
                                        <Tags />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="practitionerQualify-panel-dash">
                                        <PracitionerQualifications />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="professionalAffiliations-panel-dash">
                                        <ProfessionalAffiliations />
                                    </Tab.Pane>


                                    <Tab.Pane eventKey="other-panel-dash">
                                        <h5>This is empty page for add other new category.</h5>
                                    </Tab.Pane>
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