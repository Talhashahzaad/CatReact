import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for redirection
import "./Login.css";
import eyeOpen from "../LoginPage/eyeOpen.svg";
import eyeClose from "../LoginPage/eyeClose.svg";
import signInWithGoogle from "../../images/signInWithGoogle.svg";
import signInWithFacebook from "../../images/signInWithFacebook.svg";
import axios from "axios";

function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = React.useState(""); // State for email
    const [password, setPassword] = React.useState(""); // State for password
    const [errorMessage, setErrorMessage] = React.useState(""); // State for error message
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setErrorMessage(""); // Clear previous error messages
        try {
            const response = await axios.post("http://3.8.140.227:8000/api/login", {
                email,
                password
            });

            if (response.status === 200) {
                navigate("/dashboard");
                localStorage.setItem("token", JSON.stringify(response.data.token));
            } else {
                setErrorMessage(response.data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("Incorrect email or password. Please try again.");
        }
    };

    return (
        <>
            <div className="loginPage">
                <h1 className="pb-2">hi, there!</h1>
                <small>sign in to continue</small>
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
                        <p className="py-3 mb-0 w-100 text-center">New User?  <Link to="/sign-up">Sign Up</Link></p>
                    </div>

                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <ul className="d-flex justify-content-center align-items-center gap-2 ps-0 my-2 signInIcons">
                            <li><Link to="/"><img src={signInWithGoogle} alt="Sign in with Google" title="Sign in with Google" /></Link></li>
                            <li><Link to="/"><img src={signInWithFacebook} alt="Sign in with Facebook" title="Sign in with Facebook" /></Link></li>
                        </ul>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;