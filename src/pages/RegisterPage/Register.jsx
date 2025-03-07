import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { Col, Row } from "react-bootstrap";
import eyeOpen from "../RegisterPage/eyeOpen.svg";
import eyeClose from "../RegisterPage/eyeClose.svg";
import signUpGoogle from "../../images/signUpGoogle.svg";
import signUpFacebook from "../../images/signUpFacebook.svg";

const Register = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [password, setPassword] = React.useState('');
    const [passwordStrength, setPasswordStrength] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [passwordsMatch, setPasswordsMatch] = React.useState(true);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState('');

    const checkPasswordStrength = (password) => {
        if (password.length === 0) {
            setPasswordStrength('');
        } else if (password.length < 6) {
            setPasswordStrength('Weak');
        } else if (password.length < 10) {
            setPasswordStrength('Medium');
        } else if (password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)) {
            setPasswordStrength('Strong');
        } else {
            setPasswordStrength('Medium');
        }
    };

    const checkPasswordMatch = (confirmPwd) => {
        setConfirmPassword(confirmPwd);
        setPasswordsMatch(password === confirmPwd);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        // Check for empty fields
        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        // Check if passwords match
        if (!passwordsMatch) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://18.175.255.203:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed.'); // Display error message from server
            } else {
                alert('Registration successful!');
                navigate('/login'); // Redirect to the login page
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <>
            <div className="registerPage">
                <h1 className="pb-2">create your account!</h1>
                <small>sign up to continue</small>
                <hr />
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                            <label className="w-100 d-block h-auto lh-lg text-capitalize">name</label>
                            <input type="text" name="signupNameField" placeholder="Enter your name" className="form-control"
                                value={name} onChange={(e) => setName(e.target.value)} required />
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                            <label className="w-100 d-block h-auto lh-lg text-capitalize">email</label>
                            <input type="email" name="signupEmailAddress" placeholder="Enter your email address" className="form-control"
                                value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                            <label className="w-100 d-block h-auto lh-lg text-capitalize">password</label>
                            <div className="position-relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="signupPassword1"
                                    placeholder="**********"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        checkPasswordStrength(e.target.value);
                                    }}
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn position-absolute top-50 end-0 translate-middle-y border-0"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ background: 'none' }}
                                >
                                    {showPassword ? <img src={eyeOpen} alt='Appear' /> : <img src={eyeClose} alt='Disappear' />}
                                </button>
                            </div>
                            {passwordStrength && (
                                <small className={`d-block mt-1 text-${passwordStrength.toLowerCase()}`}>
                                    Password Strength: {passwordStrength}
                                </small>
                            )}
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                            <label className="w-100 d-block h-auto lh-lg text-capitalize">confirm password</label>
                            <input
                                type="password"
                                name="signupPassword2"
                                placeholder="**********"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => checkPasswordMatch(e.target.value)}
                                required
                            />
                            {confirmPassword && (
                                <small className={`d-block mt-1 ${passwordsMatch ? 'text-success' : 'text-danger'}`}>
                                    {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                                </small>
                            )}
                        </Col>

                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <input type="submit" value="register me" className="w-100 form-control" />
                        </Col>

                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <p className="py-3 mb-0 w-100 text-center">Already have an account?  <Link to="/login">Sign In</Link></p>
                        </Col>

                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <p className="py-2 mb-0 w-100 text-center">You may also sign up with</p>
                        </div>

                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <ul className="d-flex justify-content-center align-items-center gap-2 ps-0 my-0 signUpIcons">
                                <li><Link to="/"><img src={signUpGoogle} alt="Sign up with Google" title="Sign up with Google" /></Link></li>
                                <li><Link to="/"><img src={signUpFacebook} alt="Sign up with Facebook" title="Sign up with Facebook" /></Link></li>
                            </ul>
                        </div>
                    </Row>
                </form>
            </div>
        </>
    )
}

export default Register;