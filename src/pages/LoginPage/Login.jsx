import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { Container, Row, Col } from "react-bootstrap";
import "./Login.css";
import eyeOpen from "../LoginPage/eyeOpen.svg";
import eyeClose from "../LoginPage/eyeClose.svg";
import googleShortIcon from "../../images/google-short-icon.svg";
import facebookShortIcon from "../../images/facebook-short-icon.svg";
import userLoginPicture from "../../images/userLoginPicture.webp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import ProtectedAuthRoute from '../../component/ProtectedAuthRoute';

const Login = ({ children }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = React.useState(""); // State for email
    const [password, setPassword] = React.useState(""); // State for password
    const [errorMessage, setErrorMessage] = React.useState(""); // State for error message
    const [data, setData] = useState({ message: '' });
    const navigate = useNavigate(); // Initialize useNavigate
    const [showMessage, setShowMessage] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const successNotify = () => toast.success('Login successful');
    const errorNotify = () => toast.error('Login failed');

    useEffect(() => {
        const savedCredentials = localStorage.getItem('rememberedUser');
        if (savedCredentials) {
            const { rememberedEmail, rememberedPassword } = JSON.parse(savedCredentials);
            setEmail(rememberedEmail);
            setPassword(rememberedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const response = await axios.post("http://3.8.140.227:8000/api/login", {
                email,
                password
            });
            setData(response.data);

            if (response.status === 200 || response.status === 201) {
                localStorage.setItem("token", JSON.stringify(response.data.token));
                localStorage.setItem("role", JSON.stringify(response.data.role));
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', JSON.stringify({
                        rememberedEmail: email,
                        rememberedPassword: password
                    }));
                } else {
                    localStorage.removeItem('rememberedUser');
                }
                successNotify();
                setTimeout(() => {
                    navigate("/dashboard");
                }, 500);
            } else {
                setErrorMessage(response.data.message || "Login failed. Please try again.");
            }
            setShowMessage(!!response.data.message);
        } catch (error) {
            setErrorMessage("Incorrect email or password. Please try again.");
            errorNotify();
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Login failed. Please try again.");
            }
        }
        return children;
    };

    return (
        <>
            <Container>
                <div className="loginPage">
                    <Row>
                        <Col xxl={6} xl={6} lg={6} md={12} sm={12}>
                            <div className="login-picture">
                                <img src={userLoginPicture} alt="User Login" className="img-fluid" />
                            </div>
                        </Col>
                    
                        <Col xxl={6} xl={6} lg={6} md={12} sm={12}>
                        
                            <h1 className="pb-2 text-uppercase text-center fw-bold">login</h1>
                            <small className="d-block text-lowercase text-center fw-normal">sign in to continue</small>
                            <hr />
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
                                            <input 
                                                type="checkbox" 
                                                name="rememberMe" 
                                                id="rememberMe" 
                                                className="position-absolute"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                            />
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
                                    <p className="py-3 mb-0 w-100 text-center">New User?  <Link to="/user-registration">Sign Up</Link></p>
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
            
            <ToastContainer 
                position="top-right"
                autoClose={500}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ zIndex: 9999 }}
            />
        </>
    )
}

export default ProtectedAuthRoute(Login);