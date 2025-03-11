import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import catLogo from "../images/catLogo.svg";
//import userLogin from "../images/userLogin.svg";
import angleDown from "../images/angleDown.svg";


function Header(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return(
        <>
        <header>
            <div className="siteHeader position-relative py-4 h-auto w-100">
                <nav>
                    <Container>
                        <Row>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Row>
                                    <Col xxl={4} xl={4} lg={4} md={4} sm={4} xs={8}>
                                        <div className="header-logo">
                                            <Link to="/">
                                                <img src={catLogo} alt="logo" className="mb-0 w-100 h-auto" />
                                            </Link>
                                        </div>
                                    </Col>

                                    <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={4} className="d-flex align-items-center justify-content-end mb-0 ps-0">
                                        <div className="header-menu">
                                            <ul className="d-flex align-items-center justify-content-end mb-0 ps-0">
                                                <li><Link to="/login">
                                                    {/* <img src={userLogin} alt="home" />  */}
                                                client login</Link></li>
                                                
                                                <li><Link to="/business-login" className="text-capitalize">
                                                {/* <img src={userLogin} alt="home" />  */}
                                                business login</Link></li>
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
                                                        <Link to="/user-registration" className="text-capitalize sign-up-link">sign up</Link>
                                                        <Link to="/business-registration" className="text-capitalize">business sign up</Link>
                                                        <Link to="/for-business" className="text-capitalize">for business</Link>
                                                        <Link to="/pricing-packages" className="text-capitalize">membership options</Link>
                                                        <Link to="/beyond-the-treatments" className="text-capitalize">beyond the treatment</Link>
                                                        <Link to="/blogs" className="text-capitalize">blogs</Link>
                                                        <Link to="/about-us" className="text-capitalize">about us</Link>
                                                        <Link to="/contact-us" className="text-capitalize">contact us</Link>
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