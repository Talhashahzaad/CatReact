import React, { useState } from 'react'; 
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './UserRegistration.css';
import userLoginPictureSecond from '../../images/user-login-banner-second.png';
import arrowNext from '../../images/arrowNext.svg';
import arrowBack from '../../images/arrowBack.svg';
import eyeOpen from "../LoginPage/eyeOpen.svg";
import eyeClose from "../LoginPage/eyeClose.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const UserRegistration = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [stepOne, setStepOne] = useState(true);
    const [stepTwo, setStepTwo] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const successNotify = () => toast.success('User created successfully');
    const errorNotify = () => toast.error('Registration failed');

    const handleStepOne = () => {
        setStepOne(true);
        setStepTwo(false);
    };

    const handleStepTwo = () => {
        setStepOne(false);
        setStepTwo(true);
    };

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

    const validateMainLocation = (main_location) => {
        return main_location !== '';
    };

    const validateAgeGroup = (age_group) => {
        return age_group !== '';
    };

    const validateHearAbout = (heard_about_options) => {
        return heard_about_options !== '';
    };

    const isStepOneValid = () => {
        return (
            formData.name && validateName(formData.name) &&
            formData.email && validateEmail(formData.email) &&
            formData.phone && validatePhone(formData.phone) &&
            formData.password && validatePassword(formData.password)
        );
    };

    const isStepTwoValid = () => {
        return (
            formData.heard_about_options && validateHearAbout(formData.heard_about_options) &&
            formData.main_location && validateMainLocation(formData.main_location) &&
            formData.age_group && validateAgeGroup(formData.age_group)
        );
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        heard_about_options: '',
        main_location: '',
        age_group: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://3.8.140.227:8000/api/user-signup', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response);
            
            if (response.status === 200) {
                successNotify();
                setTimeout(() =>{
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            errorNotify();
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <>
        <ToastContainer position="top-right" autoClose={3000} />
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
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control" id="name" placeholder="Name" required autoComplete='name' onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                        <small className="text-danger">{formData.name && !validateName(formData.name) && 'Name must be 3-30 characters long. Only letters and spaces are allowed.'}</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" id="email" placeholder="Email Id" required autoComplete='email' onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                        <small className="text-danger">{formData.email && !validateEmail(formData.email) && 'Invalid email syntax. Please enter a valid email address.'}</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input type="tel" minLength={7} maxLength={15} className="form-control" id="phone" placeholder="Phone" required autoComplete='tel' onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                        <small className="text-danger">{formData.phone && !validatePhone(formData.phone) && 'Phone number must be 7-15 digits. Only numbers are allowed.'}</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <div className="position-relative">
                                            <input type={showPassword ? "text" : "password"} className="form-control" id="password" placeholder="Password" required autoComplete='new-password' onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
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
                                        <legend htmlFor="heard_about_options">Where did you hear about Check a Treatment?</legend>
                                        <div className="check-hear-about-cat">
                                            <ul className="d-flex flex-wrap gap-3 ps-0 mb-5">
                                                <li>
                                                    <input type="radio" name="heard_about_options" id="mail_post" value="mail_post" required onChange={(e) => setFormData({ ...formData, heard_about_options: e.target.value })} />
                                                    <label className='position-relative' htmlFor="mail_post">mail post</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="heard_about_options" id="instagram" value="instagram" required onChange={(e) => setFormData({ ...formData, heard_about_options: e.target.value })} />
                                                    <label className='position-relative' htmlFor="instagram">instagram</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="heard_about_options" id="facebook" value="facebook" required onChange={(e) => setFormData({ ...formData, heard_about_options: e.target.value })} />
                                                    <label className='position-relative' htmlFor="facebook">facebook</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="heard_about_options" id="you_tube" value="you_tube" required onChange={(e) => setFormData({ ...formData, heard_about_options: e.target.value })} />
                                                    <label className='position-relative' htmlFor="you_tube">youTube</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="heard_about_options" id="tik_tok" value="tik_tok" required onChange={(e) => setFormData({ ...formData, heard_about_options: e.target.value })} />
                                                    <label className='position-relative' htmlFor="tik_tok">tikTok</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="heard_about_options" id="linked_in" value="linked_in" required onChange={(e) => setFormData({ ...formData, heard_about_options: e.target.value })} />
                                                    <label className='position-relative' htmlFor="linked_in">linkedIn</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="heard_about_options" id="friend" value="friend" required onChange={(e) => setFormData({ ...formData, heard_about_options: e.target.value })} />
                                                    <label className='position-relative' htmlFor="friend">friend</label>
                                                </li>
                                            </ul>
                                            <small className="text-danger">{formData.heard_about_options && !validateHearAbout(formData.heard_about_options) && 'Please select an option'}</small>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="main_location">Where is your main location?</label>
                                        <select className="form-control mb-4" id="main_location" required onChange={(e) => setFormData({ ...formData, main_location: e.target.value })}>
                                            <option value="">Select Location</option>
                                            <option value="1">Location 1</option>
                                            <option value="2">Location 2</option>
                                            <option value="3">Location 3</option>
                                        </select>
                                        <small className="text-danger">{formData.main_location && !validateMainLocation(formData.main_location) && 'Please select a location'}</small>
                                    </div>

                                    <div className="form-group">
                                        <legend htmlFor="age_group">What is your age group?</legend>
                                        <div className="check-age-group-cat">
                                            <ul className="d-flex flex-wrap gap-3 ps-0 mb-5">
                                                <li>
                                                    <input type="radio" name="age_group" id="18-24" value="18-24" required onChange={(e) => setFormData({ ...formData, age_group: e.target.value })} />
                                                    <label className='position-relative' htmlFor="18-24">18-24</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="age_group" id="25-34" value="25-34" required onChange={(e) => setFormData({ ...formData, age_group: e.target.value })} />
                                                    <label className='position-relative' htmlFor="25-34">25-34</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="age_group" id="35-44" value="35-44" required onChange={(e) => setFormData({ ...formData, age_group: e.target.value })} />
                                                    <label className='position-relative' htmlFor="35-44">35-44</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="age_group" id="45+" value="45+" required onChange={(e) => setFormData({ ...formData, age_group: e.target.value })} />
                                                    <label className='position-relative' htmlFor="45+">45+</label>
                                                </li>
                                            </ul>
                                            <small className="text-danger">{formData.age_group && !validateAgeGroup(formData.age_group) && 'Please select an option'}</small>
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
        </>
    );
};

export default UserRegistration;
