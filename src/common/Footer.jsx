import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom";
import linkIcon from "../images/linkIcon.svg"
import catLogo from "../images/catLogo.jpg"

function Footer(){

    const currentYear = new Date().getFullYear();
    return(
        <>
            <footer>
                <div className="main-footer w-100 h-auto d-block position-relative py-5">
                    <Container>
                        <Row>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Row>
                                    <Col xxl={7} xl={7} lg={7} md={12} sm={12} xs={12}>
                                        <Row>
                                            <Col xxl={4} xl={4} lg={4} md={12} sm={12} xs={12}>
                                                <figure className="d-flex h-100 align-items-center mb-0">
                                                    <Link to="/" onClick={() => window.scrollTo(0, 0)}><img src={catLogo} alt="" title="" className="w-100 bg-white p-2" /></Link>
                                                </figure>
                                            </Col>

                                            <Col xxl={4} xl={4} lg={4} md={6} sm={12} xs={12}>
                                                <h3>About CaT</h3>
                                                <ul className="ps-0 mb-0">
                                                    <li><Link to="/about-us" onClick={() => window.scrollTo(0, 0)}>about us</Link></li>
                                                    <li><Link to="/beyond-the-treatments" onClick={() => window.scrollTo(0, 0)}>Beyond the Treatment</Link></li>
                                                    <li><Link to="/blogs" onClick={() => window.scrollTo(0, 0)}>Blogs</Link></li>
                                                    <li><Link to="/">Sitemap</Link></li>
                                                </ul>
                                            </Col>

                                            <Col xxl={4} xl={4} lg={4} md={6} sm={12} xs={12}>
                                                <h3>For Business</h3>
                                                <ul className="ps-0 mb-0">
                                                    <li><Link to="/for-business" onClick={() => window.scrollTo(0, 0)}>For Business</Link></li>
                                                    <li><Link to="/pricing-packages" onClick={() => window.scrollTo(0, 0)}>Pricing Packages</Link></li>
                                                    <li><Link to="/frequently-asked-question" onClick={() => window.scrollTo(0, 0)}>FAQ</Link></li>
                                                    <li><Link to="/contact-us" onClick={() => window.scrollTo(0, 0)}>contact us</Link></li>
                                                </ul>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                                        <Row>
                                            <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                                                <h3>Legal</h3>
                                                <ul className="ps-0 mb-0">
                                                    <li><Link to="/privacy-policy" onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link></li>
                                                    <li><Link to="/terms-and-conditions" onClick={() => window.scrollTo(0, 0)}>Terms &amp; Conditions</Link></li>
                                                </ul>
                                            </Col>

                                            <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                                                <h3>Find us on socials</h3>
                                                <ul className="ps-0 mb-0">
                                                    <li>
                                                        <Link to="https://www.facebook.com/people/CheckaTreatment/61574567515878/?name=xhp_nt__fb__action__open_user" target="_blank">
                                                            <img src={linkIcon} alt="" title="" /> facebook
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="https://www.instagram.com/check.a.treatment/?igsh=MXZ3aG81NDNkYTBsMg%3D%3D#" target="_blank">
                                                            <img src={linkIcon} alt="" title="" /> instagram
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="https://www.youtube.com/@CheckATreatment?app=desktop" target="_blank">
                                                            <img src={linkIcon} alt="" title="" /> youTube
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="https://www.tiktok.com/@checkatreatment?_t=ZN-8vKKBt1sx7u&_r=1" target="_blank">
                                                            <img src={linkIcon} alt="" title="" /> TikTok
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className="copyrightSection w-100 h-auto d-block position-relative py-2">
                    <Container>
                        <Row>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                                <p className="mb-0 text-center text-white">Copyright &copy; {currentYear} | All Rights Reserved by Check a Treatment &amp; Designed by <Link to="https://remoteresource.com/" target="_blank" className="text-white">Remote Resource</Link></p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </footer>
        </>
    )
}

export default Footer;