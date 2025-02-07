import {React, useState, useEffect} from "react";
import { Link, Outlet } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import profilePicture from "../../../images/profile-picture.jpeg";

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

            <div className="dashboard-sidebar-menu">
                <ul className="list-unstyled mb-0">
                    <li>
                        <Link to="/dashboard" onClick={window.scrollTo(0, 0)}>dashboard</Link>
                    </li>

                    <li>
                    <Link to="/dashboard/my-profile" onClick={(e) => (e).stopPropagation() && window.scrollTo(0, 0)}>my profile</Link>
                    </li>

                    <li>
                        <Link to="#" className="d-flex justify-content-between align-items-center" onClick={handleDropdownToggle}>
                            listings
                            <button className="btn btn-sm bg-jetGreen">
                                <IoMdArrowDropdown />
                            </button>
                        </Link>

                        <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                            <Link to="/dashboard/all-listing" className="dropdown-item" onClick={(e) => (e).stopPropagation() && setIsDropdownOpen(false) && window.scrollTo(0, 0)}>create listing</Link>
                            
                            <Link to="/dashboard/treatment" className="dropdown-item" onClick={(e) => (e).stopPropagation() && setIsDropdownOpen(false)}>treatment</Link>
                            
                            <Link to="/dashboard/order" className="dropdown-item" onClick={(e) => (e).stopPropagation() && setIsDropdownOpen(false) && window.scrollTo(0, 0)}>order</Link>
                            
                            <Link to="/dashboard/practitioner" className="dropdown-item" onClick={(e) => (e).stopPropagation() && setIsDropdownOpen(false) && window.scrollTo(0, 0)}>practitioner qualifications</Link>

                            <Link to="/dashboard/certificate" className="dropdown-item" onClick={(e) => (e).stopPropagation() && setIsDropdownOpen(false) && window.scrollTo(0, 0)}>professional affiliations</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <Outlet />
        </>
    );
}

export default Sidebar;