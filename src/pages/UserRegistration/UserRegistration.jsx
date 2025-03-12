import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import './UserRegistration.css';
import userLoginPictureSecond from '../../images/user-login-banner-second.png';
import arrowNext from '../../images/arrowNext.svg';
import arrowBack from '../../images/arrowBack.svg';
import eyeOpen from "../LoginPage/eyeOpen.svg";
import eyeClose from "../LoginPage/eyeClose.svg";


const UserRegistration = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [stepOne, setStepOne] = useState(true);
    const [stepTwo, setStepTwo] = useState(false);


    const handleStepOne = () => {
        setStepOne(true);
        setStepTwo(false);
    };

    const handleStepTwo = () => {
        setStepOne(false);
        setStepTwo(true);
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        tel: '',
        password: '',
        hearAbout: '',
        mainLocation: '',
        ageGroup: ''
    });

    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        return nameRegex.test(name);
    };

    // Add these validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\d{7,15}$/;
        return phoneRegex.test(phone);
    };

    const validatePassword = (password) => {
        // At least 8-20 chars, 1 number, 1 special character
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
        return passwordRegex.test(password);
    };

    const validateMainLocation = (mainLocation) => {
        return mainLocation !== '';
    };

    const validateAgeGroup = (ageGroup) => {
        return ageGroup !== '';
    };

    const validateHearAbout = (hearAbout) => {
        return hearAbout !== '';
    };

    const isStepOneValid = () => {
        return (
            formData.name && validateName(formData.name) &&
            formData.email && validateEmail(formData.email) &&
            formData.tel && validatePhone(formData.tel) &&
            formData.password && validatePassword(formData.password)
        );
    };

    const isStepTwoValid = () => {
        return (
            formData.hearAbout && 
            formData.mainLocation && 
            formData.ageGroup
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isStepOneValid() && isStepTwoValid()) {
            navigate('/user-login');
        }
    };

    

    return (
        <Container>
            <Row>
                <div className="user-registration-container bg-white">
                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                        <div className="user-registration-picture">
                            <img loading="lazy" src={userLoginPictureSecond} alt="User Login" className="img-fluid" />
                        </div>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                        <div className="user-registration-form">
                            <h1 className="text-center text-capitalize fw-bold">User <mark>Registration</mark></h1>
                            <hr/>
                            <form onSubmit={handleSubmit}>
                                <div id="stepOne" className={`${stepTwo ? 'd-none' : ''}`}>
                                    <div className="form-group">
                                        <label htmlFor="nameUser-registration">Name</label>
                                        <input type="text" className="form-control" id="nameUser-registration" placeholder="Name" required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                        <small className="text-danger">{formData.name && !validateName(formData.name) && 'Name must be 3-30 characters long. Only letters and spaces are allowed.'}</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="emailUser-registration">Email</label>
                                        <input type="email" className="form-control" id="emailUser-registration" placeholder="Email Id" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                        <small className="text-danger">{formData.email && !validateEmail(formData.email) && 'Invalid email syntax. Please enter a valid email address.'}</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phoneUser-registration">Phone</label>
                                        <input type="tel" minLength={7} maxLength={15} className="form-control" id="phoneUser-registration" placeholder="Phone" required onChange={(e) => setFormData({ ...formData, tel: e.target.value })} />
                                        <small className="text-danger">{formData.tel && !validatePhone(formData.tel) && 'Phone number must be 7-15 digits. Only numbers are allowed.'}</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="passwordUser-registration">Password</label>
                                        <div className="position-relative">
                                            <input type={showPassword ? "text" : "password"} className="form-control" id="passwordUser-registration" placeholder="Password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                            <span className="position-absolute top-50 end-0 translate-middle-y pe-3" style={{ cursor: 'pointer' }}>
                                                <img src={showPassword ? eyeOpen : eyeClose} alt='Disappear' onClick={() => setShowPassword(!showPassword) } />
                                            </span>
                                        </div>
                                        <small className="text-danger">{formData.password && !validatePassword(formData.password) && 'Password must be 8-20 characters, along with 1 number and 1 special character'}</small>
                                        
                                    </div>

                                    <div className="form-group text-end">
                                        <button 
                                            type="button" 
                                            className={`${stepTwo ? 'd-none' : '' } next-step-button`} 
                                            onClick={handleStepTwo}
                                            disabled={!isStepOneValid()}
                                        >
                                            next <img src={arrowNext} alt="arrowNext" />
                                        </button>
                                    </div>
                                </div>

                                <div id="stepTwo" className={`${stepOne ? 'd-none' : ''}`}>
                                    <div className="form-group">
                                        <label htmlFor="hearAboutCAT-registration">Where did you hear about Check a Treatment?</label>
                                        <div className="check-hear-about-cat">
                                            <ul className="d-flex flex-wrap gap-3 ps-0 mb-5">
                                                <li>
                                                    <input type="radio" name="hearAbout1" id="mainPost-registration" required onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })} />
                                                    <label className='position-relative' htmlFor="mainPost-registration">mail post</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="hearAbout1" id="instagram-registration" required onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })} />
                                                    <label className='position-relative' htmlFor="instagram-registration">instagram</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="hearAbout1" id="facebook-registration" required onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })} />
                                                    <label className='position-relative' htmlFor="facebook-registration">facebook</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="hearAbout1" id="youTube-registration" required onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })} />
                                                    <label className='position-relative' htmlFor="youTube-registration">youTube</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="hearAbout1" id="tikTok-registration" required onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })} />
                                                    <label className='position-relative' htmlFor="tikTok-registration">tikTok</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="hearAbout1" id="linkedIn-registration" required onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })} />
                                                    <label className='position-relative' htmlFor="linkedIn-registration">linkedIn</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="hearAbout1" id="friend-registration" required onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })} />
                                                    <label className='position-relative' htmlFor="friend-registration">friend</label>
                                                </li>
                                            </ul>
                                            <small className="text-danger">{formData.hearAbout && !validateHearAbout(formData.hearAbout) && 'Please select an option'}</small>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="mainLocation-registration">Where is your main location?</label>
                                        <select className="form-control mb-4" id="mainLocation-registration" required onChange={(e) => setFormData({ ...formData, mainLocation: e.target.value })}>
                                            <option value="">Select Location</option>
                                            <option value="1">Location 1</option>
                                            <option value="2">Location 2</option>
                                            <option value="3">Location 3</option>
                                        </select>
                                        <small className="text-danger">{formData.mainLocation && !validateMainLocation(formData.mainLocation) && 'Please select a location'}</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="ageGroup-registration">What is your age group?</label>
                                        <div className="check-age-group-cat">
                                            <ul className="d-flex flex-wrap gap-3 ps-0 mb-5">
                                                <li>
                                                    <input type="radio" name="ageGroup1" id="18-24" required onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })} />
                                                    <label className='position-relative' htmlFor="18-24">18-24</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="ageGroup1" id="25-34" required onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })} />
                                                    <label className='position-relative' htmlFor="25-34">25-34</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="ageGroup1" id="35-44" required onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })} />
                                                    <label className='position-relative' htmlFor="35-44">35-44</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="ageGroup1" id="45+" required onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })} />
                                                    <label className='position-relative' htmlFor="45+">45+</label>
                                                </li>
                                            </ul>
                                            <small className="text-danger">{formData.ageGroup && !validateAgeGroup(formData.ageGroup) && 'Please select an option'}</small>
                                        </div>
                                    </div>

                                    <div className="form-group d-flex justify-content-between">
                                        <button type="button" className={`${stepOne ? 'd-none' : ''} previous-step-button`} onClick={handleStepOne}><img src={arrowBack} alt="arrowBack" /> back</button>
                                        <button 
                                            type="submit" 
                                            className={`submit-registration-button ${stepOne ? 'd-none' : '' }`} 
                                            disabled={!isStepTwoValid()}
                                        >
                                            submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Col>
                </div>
            </Row>
        </Container>
    );
};

export default UserRegistration;
