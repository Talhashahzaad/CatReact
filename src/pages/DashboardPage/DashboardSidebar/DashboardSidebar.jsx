import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Nav, Dropdown} from 'react-bootstrap';
import profilePicture from "../../../images/profile-picture.jpeg";
import "../Dashboard.css";

const DashboardSidebar = () =>{

    const [activeKey, setActiveKey] = useState('dashboard-panel-dash');
    const [isListingOpen, setIsListingOpen] = useState(false);

    const listingMenuItems = [
        'allListing-panel-dash',
        'treatmentCategories-panel-dash',
        'treatments-panel-dash',
        'treatmentPackages-panel-dash',
        'locations-panel-dash',
        'amenities-panel-dash',
        'tags-panel-dash',
        'practitionerQualify-panel-dash',
        'professionalAffiliations-panel-dash'
    ];

    const handleSelect = (eventKey) => {
        if (eventKey) {
            setActiveKey(eventKey);
            if (listingMenuItems.includes(eventKey)) {
                setIsListingOpen(true);
            }
        }
    };

    
    return(
        <>
            <div className="left-side-section">
                <div className="dash-profile-picture">
                    <figure className="mb-2 d-flex align-items-center">
                        <img src={profilePicture} alt="Profile Picture"/>

                        <div className="d-flex flex-column ms-2">
                            <h5 className="my-2 text-capitalize fw-bold h6">
                                <span className="greenColor fw-bold">welcome</span> florence
                            </h5>
                            <Link to="/" className="text-capitalize">logout</Link>
                        </div>
                    </figure>
                </div>

                <div className="dash-left-side-listing">
                    <Nav variant="pills" className="flex-column" activeKey={activeKey} onSelect={handleSelect}>
                        <Nav.Item>
                            <Nav.Link eventKey="dashboard-panel-dash">dashboard</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Dropdown show={isListingOpen} onToggle={(isOpen) => setIsListingOpen(isOpen)}>
                                <Dropdown.Toggle variant={listingMenuItems.includes(activeKey) ? "primary" : "success"} id="dropdown-basic">
                                Listing
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="allListing-panel-dash"
                active={activeKey === 'allListing-panel-dash'}>all listing</Dropdown.Item>

                                    <Dropdown.Item eventKey="treatmentCategories-panel-dash"
                active={activeKey === 'treatmentCategories-panel-dash'}>
                    Treatment Categories
                    </Dropdown.Item>

                                    <Dropdown.Item eventKey="treatments-panel-dash"
                active={activeKey === 'treatments-panel-dash'}> Treatments </Dropdown.Item>

                                    <Dropdown.Item eventKey="treatmentPackages-panel-dash"
                active={activeKey === 'treatmentPackages-panel-dash'}> Treatment Packages </Dropdown.Item>

                                    <Dropdown.Item eventKey="locations-panel-dash"
                active={activeKey === 'locations-panel-dash'}> Locations </Dropdown.Item>

                                    <Dropdown.Item eventKey="amenities-panel-dash"
                active={activeKey === 'amenities-panel-dash'}> Amenities </Dropdown.Item>

                                    <Dropdown.Item eventKey="tags-panel-dash"
                active={activeKey === 'tags-panel-dash'}> tags </Dropdown.Item>

                                    <Dropdown.Item eventKey="practitionerQualify-panel-dash"
                active={activeKey === 'practitionerQualify-panel-dash'}> Practitioner Qualifications </Dropdown.Item>

                                    <Dropdown.Item eventKey="professionalAffiliations-panel-dash"
                active={activeKey === 'professionalAffiliations-panel-dash'}> Professional Affiliations  </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link eventKey="other-panel-dash">others</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </div>
        </>
    );
}

export default DashboardSidebar;