import {React, useState, useEffect} from "react";
import { Link, Outlet } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
//import profilePicture from "../../../images/profile-picture.jpeg";
import logo from "../../../images/check-a-treatment.svg";
import dashIcon from "../../../images/dashboard-dashIcon.svg";
import userProfileIcon from "../../../images/user-icons-dashIcon.svg";
import listIcon from "../../../images/listing-dashIcon.svg";
import catDashIcon from "../../../images/catagory-dashIcon.svg";
import treatmentDashIcon from "../../../images/treatment-dashIcon.svg";
import packageDashIcon from "../../../images/package-dashIcon.svg";
import affilicationDashIcon from "../../../images/affilication-dashIcon.svg";
import qualificationDashIcon from "../../../images/qualification-dashIcon.svg";
import logoutIcon from "../../../images/logout-dashIcon.svg";

const Sidebar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(true);
    
    const handleClickOutside = (event) => {
        if (event.target.closest('.dropdown-menu') === null && !event.target.closest('.btn')) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleDropdownToggle = (event) => {
        event.preventDefault();
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <>
        <div className="dashboard-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="dashboard-sidebar-header">
                <div className="dashboard-sidebar-header-logo">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="img-fluid w-100 mb-3" />
                    </Link>
                </div>
            </div>
            {/* <div className="dash-profile-picture">
                <figure className="mb-2 d-flex align-items-center">
                    <img src={profilePicture} alt="Profile Picture"/>

                    <div className="d-flex flex-column ms-2">
                        <h5 className="my-2 text-capitalize fw-bold h6">
                            <span className="greenColor fw-bold">welcome</span> florence
                        </h5>
                        <Link to="/" className="text-capitalize">logout</Link>
                    </div>
                </figure>
            </div> */}

            <div className="dashboard-sidebar-menu">
                <ul className="list-unstyled mb-0">
                    <li>
                        <Link to="/dashboard" onClick={window.scrollTo(0, 0)}> 
                            <span className="item-icon">
                                <img src={dashIcon} alt="Dashboard" />
                            </span>
                            <span className="item-text">dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/dashboard/my-profile" onClick={(e) => (e).stopPropagation() && window.scrollTo(0, 0)}>
                            <span className="item-icon">
                                <img src={userProfileIcon} alt="My Profile" />
                            </span>
                            <span className="item-text">my profile</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="#" className="d-flex justify-content-flex-start align-items-center position-relative" onClick={handleDropdownToggle}>
                            <span className="item-icon">
                                <img src={listIcon} alt="Listings" />
                            </span>
                            <span className="item-text">my listings</span>
                            <button className="btn btn-sm bg-jetGreen position-absolute">
                                <IoMdArrowDropdown />
                            </button>
                        </Link>

                        <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                            <Link to="/dashboard/all-listing" className="dropdown-item" onClick={(e) => (e).stopPropagation() && setIsDropdownOpen(false) && window.scrollTo(0, 0)}>
                                <span className="item-icon">
                                    <img src={catDashIcon} alt="Create Listing" />
                                </span>
                                <span className="item-text">create listing</span>
                            </Link>
                            
                            <Link to="/dashboard/treatment" className="dropdown-item" onClick={(e) => (e).stopPropagation() && setIsDropdownOpen(false)}>
                                <span className="item-icon">
                                    <img src={treatmentDashIcon} alt="Treatment" />
                                </span>
                                <span className="item-text">treatment</span>
                            </Link>

                            <Link to="/dashboard/treatment-package" className="dropdown-item" onClick={(e) => (e).stopPropagation() && setIsDropdownOpen(false)}>
                                <span className="item-icon">
                                    <img src={packageDashIcon} alt="Treatment" />
                                </span>
                                <span className="item-text">treatment packages</span>
                            </Link>
                            
                            <Link to="/dashboard/practitioner" className="dropdown-item" onClick={(e) => (e).stopPropagation() && setIsDropdownOpen(false) && window.scrollTo(0, 0)}>
                                <span className="item-icon">
                                    <img src={qualificationDashIcon} alt="Dashboard" />
                                </span>
                                <span className="item-text">practitioner qualifications</span>
                            </Link>

                            <Link to="/dashboard/certificate" className="dropdown-item" onClick={(e) => (e).stopPropagation() && setIsDropdownOpen(false) && window.scrollTo(0, 0)}>
                                <span className="item-icon">
                                    <img src={affilicationDashIcon} alt="Dashboard" />
                                </span>
                                <span className="item-text">professional affiliations</span>
                            </Link>
                        </div>
                    </li>

                    <li>
                        <Link to="/dashboard/order" className="dropdown-item" onClick={(e) => (e).stopPropagation() && setIsDropdownOpen(false) && window.scrollTo(0, 0)}>
                            <span className="item-icon">
                                <img src={dashIcon} alt="Dashboard" />
                            </span>
                            <span className="item-text">order</span>
                        </Link>
                    </li>

                    <hr/>

                    <li>
                        <Link to="#" onClick={(e) => (e).stopPropagation() && window.scrollTo(0, 0)}>
                            <span className="item-icon">
                                <img src={logoutIcon} alt="Logout" />
                            </span>
                            <span className="item-text">logout</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="dashboard-sidebar-footer">
                <div className="dashboard-sidebar-footer-text d-flex flex-column justify-content-center align-items-start w-100 h-100">
                    <h6 className="text-white headingFont h4 fw-bold">Need help?</h6>
                    <p className="text-white headingFont fw-bold">Please check our docs</p>
                    <Link to="/" className="btn btn-md text-dark bg-white text-capitalize fw-bold w-100 py-2">get connect</Link>
                </div>
            </div>
        </div>
        <Outlet />
        </>
    );
}

export default Sidebar;