import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./UserLogin.css";
import { Link } from "react-router-dom";
import userLoginPicture from "../../images/user-login-banner.png";
import googleShortIcon from "../../images/google-short-icon.svg";
import facebookShortIcon from "../../images/facebook-short-icon.svg";

const UserLogin = () => {
    return (
        <Container>
            <Row>
                <div className="user-login-container bg-white">
                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                        <div className="user-login-picture">
                            <img src={userLoginPicture} alt="User Login" className="img-fluid" />
                        </div>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                        <div className="user-login-form">
                            <h1 className="text-center text-uppercase fw-bold">login</h1>
                            <small className="text-center d-block">sign in to continue</small>
                            <hr/>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="emailUserLogin">Email Address</label>
                                    <input type="email" className="form-control" id="emailUserLogin" placeholder="Enter your email" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordUserLogin">Password</label>
                                    <input type="password" className="form-control" id="passwordUserLogin" placeholder="Enter your password" required />
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" className="form-check-input me-2 mt-0" id="rememberMeUserLogin" />
                                    <label htmlFor="rememberMeUserLogin">Remember Me</label>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary w-100">sign in</button>
                                </div>
                                
                                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <p className="py-3 mb-0 w-100 text-center newUserText">New User?  <Link to="/user-registration" className="anchorGreen" onClick={() => window.scrollTo(0, 0)}>Sign Up</Link></p>
                                </div>

                                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="text-center anotherOptionsOR position-relative mb-4 fw-bold">or</div>
                                </div>

                                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <ul className="d-flex justify-content-center align-items-center ps-0 my-2 signInIcons">
                                        <li><Link to="#"><img src={googleShortIcon} alt="Sign in with Google" title="Sign in with Google" /> sign in with google</Link></li>
                                        <li><Link to="#"><img src={facebookShortIcon} alt="Sign in with Facebook" title="Sign in with Facebook" /> sign in with facebook</Link></li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                    </Col>
                </div>
            </Row>
        </Container>
    );
}

export default UserLogin;
