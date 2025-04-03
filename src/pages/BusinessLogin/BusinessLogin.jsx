import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for redirection
import { Container, Row, Col } from "react-bootstrap";
import "./BusinessLogin.css";
import eyeOpen from "./eyeOpen.svg";
import eyeClose from "./eyeClose.svg";
import googleShortIcon from "../../images/google-short-icon.svg";
import facebookShortIcon from "../../images/facebook-short-icon.svg";
import businessLoginBanner from "../../images/businessLoginBanner.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState(""); // State for email
    const [password, setPassword] = useState(""); // State for password
    const [successMessage, setSuccessMessage] = useState(""); // State for success message
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const navigate = useNavigate(); // Initialize useNavigate

    const successNotify = () => toast.success('Login successful');
    const errorNotify = () => toast.error('Login failed');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setErrorMessage(""); // Clear previous error messages
        try {
            const response = await axios.post("http://3.8.140.227:8000/api/login", {
                email,
                password
            });
            setSuccessMessage(response.data.message);
            successNotify();
            if (response.status === 200) {
                navigate("/dashboard");
                localStorage.setItem("token", JSON.stringify(response.data.token));
            } else {
                setErrorMessage(response.data.message || "Login failed. Please try again.");
                errorNotify();
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
            errorNotify();
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <Container>
            <div className="businessLoginPage">
                <Row>
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12}>
                        <div className="businessLoginBanner">
                            <img src={businessLoginBanner} alt="Business Login" className="img-fluid" />
                        </div>
                    </Col>
                    
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12}>
                        <h1 className="text-center text-capitalize fw-bold">Business <mark>login</mark></h1>
                        <small className="d-block text-lowercase text-center fw-normal">sign in to continue</small>
                        <hr />
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Display error message */}
                        <form onSubmit={handleSubmit}> {/* Updated to handle form submission */}
                            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <label className="w-100 d-block h-auto lh-lg text-capitalize">email address</label>
                                <input
                                    type="email"
                                    name="loginEmailAddress"
                                    placeholder="Your Email Address"
                                    className="form-control"
                                    required="required"
                                    value={email} // Bind email state
                                    onChange={(e) => setEmail(e.target.value)} // Update email state
                                />
                            </div>

                            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <label className="w-100 d-block h-auto lh-lg text-capitalize">password</label>
                                <div className="position-relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="loginPassword"
                                        placeholder="**********"
                                        className="form-control"
                                        required="required"
                                        value={password} // Bind password state
                                        onChange={(e) => setPassword(e.target.value)} // Update password state
                                    />
                                    <span
                                        className="position-absolute top-50 end-0 translate-middle-y pe-3"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <img src={eyeOpen} alt='Appear' /> : <img src={eyeClose} alt='Disappear' />}
                                    </span>
                                </div>
                            </div>

                            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="w-100 h-auto d-flex justify-content-between align-items-center mb-3">
                                    <div className="checkBoxWrapper d-inline-flex position-relative">
                                        <input type="checkbox" name="rememberMe" id="rememberMe" className="position-absolute" />
                                        <label htmlFor="rememberMe" className="text-rememberField">remember me</label>
                                    </div>

                                    <div className="forgotPass">
                                        <Link to="/forget-password">forgot password?</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <input type="submit" value="sign in" className="w-100 form-control" />
                            </div>

                            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <p className="py-3 mb-0 w-100 text-center">New User?  <Link to="/business-registration">Business Sign Up</Link></p>
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
                    </Col>
                </Row>
            </div>
            </Container>    
        </>
    )
}

export default Login;