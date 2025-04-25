import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import catLogo from "../images/catLogo.jpg";
import userDefaultPicture from "../images/default-profile-picture.webp";
import angleDown from "../images/angleDown.svg";
import axios from "axios";
import {$siteURL} from '../common/SiteURL';
import { ToastContainer, toast } from "react-toastify";




function Header(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [profileInfo, setProfileInfo] = useState({});
    const [profileActive, setProfileActive] = useState(false);
    const [hideBothBtns, setHideBothBtns] = useState(false);
    const successNotify = () => toast.success('Logout successful');
    const errorNotify = () => toast.error('Logout failed');
    const [error, setError] = useState(null);
    const [loggedOutMessage, setLoggedOutMessage] = useState({
        show: false,
        message: ''
    });

    // We are handling the logout here

    const handleLogout = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const role = localStorage.getItem('role');
            const response = await axios.post(`${$siteURL}/api/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'role': role
                }
            });

            if (response.status === 200) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                setLoggedOutMessage({
                    show: true,
                    message: response.data.message
                });
                successNotify();
                setTimeout(() => {
                    navigate("/login");
                }, 500);
            }
        } catch (error) {
            //console.error("Logout error:", error);
            setError(error.message);
            errorNotify();
        }
    };

    const navigate = useNavigate();


    useEffect(() => {
        if (loggedOutMessage.show) {
            setTimeout(() => {
                setLoggedOutMessage(false);
            }, 3000);
        }
    }, [loggedOutMessage.show, navigate]);

    // We are fetching the profile info here
    const fetchProfileInfo = async (retryCount = 0) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            if (!token) {
                setProfileInfo(null);
                return;
            }

            const maxRetries = 3;
            const retryDelay = 1000; // 1 second

            try {
                const response = await axios.get(`${$siteURL}/api/user-profile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000 // 10 second timeout
                });
                setProfileInfo(response.data);
                
            } catch (error) {
                //console.error(`Attempt ${retryCount + 1} failed:`, error.message);
                setError(error.message);
                
                if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
                    if (retryCount < maxRetries) {
                        //console.log(`Retrying in ${retryDelay}ms...`);
                        setError(`Retrying in ${retryDelay}ms...`);
                        await new Promise(resolve => setTimeout(resolve, retryDelay));
                        return fetchProfileInfo(retryCount + 1);
                    }
                }

                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    setProfileInfo(null);
                } else {
                    throw error;
                }
            }
        } catch (error) {
            console.error("Error in fetchProfileInfo:", error.message);
            setProfileInfo(null);
            // Don't remove token here as it might be a temporary connection issue
        }
    };

    useEffect(() => {
        fetchProfileInfo();
        setHideBothBtns(!!profileInfo);
    }, [profileInfo]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const activeProfile = () => {
        setProfileActive(!profileActive);
    };

    return(
        <>
        <ToastContainer position="top-right" autoClose={500} />
        <header>
            <div className="siteHeader position-relative py-1 h-auto w-100">
                <nav>
                    <Container>
                        <Row>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Row>
                                    <Col xxl={4} xl={4} lg={4} md={4} sm={4} xs={12}>
                                        <div className="header-logo">
                                            <Link to="/">
                                                <img src={catLogo} alt="logo" className="mb-0 w-100 h-auto" />
                                            </Link>
                                        </div>
                                    </Col>

                                    <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={12} className="d-flex align-items-center justify-content-end mb-0 ps-0">
                                        <div className="header-menu">
                                            <ul className="d-flex align-items-center justify-content-end mb-0 ps-0">
                                                
                                                {!hideBothBtns && (
                                                    <>
                                                        <li><Link to="/login" className="text-capitalize">client login</Link></li>
                                                        <li><Link to="/business-login" className="text-capitalize">business login</Link></li>
                                                    </>
                                                )}
                                                
                                                {profileInfo && profileInfo.user && (
                                                <li className={`somebody-login ${profileActive ? 'active' : ''}`}>
                                                    <div className="d-flex align-items-center justify-content-center flex-column position-relative">
                                                        <div className="active-user-info d-flex align-items-center justify-content-center">
                                                            <img src={profileInfo.user.avatar ? `${$siteURL}/${profileInfo.user.avatar}` : userDefaultPicture} alt="user" />
                                                            <p className="mb-0">Hi, {profileInfo.user.name}</p>
                                                            <button onClick={(e) => {
                                                                e.preventDefault();
                                                                activeProfile();
                                                            }} className="ms-1">
                                                                <img src={angleDown} alt="arrow" className="me-0" />
                                                            </button>
                                                        </div>
                                                        <div className={`somebody-login-dropdown-content ${profileActive ? 'active' : ''}`}>
                                                            <Link to="/dashboard" className="text-capitalize">my dashboard</Link>
                                                            <Link className="text-capitalize" onClick={handleLogout}>logout</Link>
                                                        </div>
                                                    </div>
                                                </li>
                                                )}
                                                <li className="menus-dropdown">
                                                    <Link 
                                                        to="/" 
                                                        className={`text-capitalize nav-menu-button ${isMenuOpen ? 'active' : ''}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            toggleMenu();
                                                        }}
                                                    >
                                                        menus <img 
                                                            src={angleDown} 
                                                            alt="arrow" 
                                                            className={`menu-arrow ${isMenuOpen ? 'rotated' : ''}`}
                                                        />
                                                    </Link>
                                                    <div className={`dropdown-content ${isMenuOpen ? 'show' : ''}`}>
                                                        <Link to="/user-registration" className="text-capitalize sign-up-link" onClick={() => setIsMenuOpen(false)}>sign up</Link>
                                                        <Link to="/business-registration" className="text-capitalize" onClick={() => setIsMenuOpen(false)}>business sign up</Link>
                                                        <Link to="/for-business" className="text-capitalize" onClick={() => setIsMenuOpen(false)}>for business</Link>
                                                        <Link to="/pricing-packages" className="text-capitalize" onClick={() => setIsMenuOpen(false)}>membership options</Link>
                                                        <Link to="/beyond-the-treatments" className="text-capitalize" onClick={() => setIsMenuOpen(false)}>beyond the treatment</Link>
                                                        <Link to="/blogs" className="text-capitalize" onClick={() => setIsMenuOpen(false)}>blogs</Link>
                                                        <Link to="/about-us" className="text-capitalize" onClick={() => setIsMenuOpen(false)}>about us</Link>
                                                        <Link to="/contact-us" className="text-capitalize" onClick={() => setIsMenuOpen(false)}>contact us</Link>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>        
                        </Row>
                    </Container>
                </nav>
            </div>
        </header>
        </>
    )
}



export default Header;