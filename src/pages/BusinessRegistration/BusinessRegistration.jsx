import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './BusinessRegistration.css';
import businessRegistrationPicture from '../../images/business-registration.png';
import arrowNext from '../../images/arrowNext.svg';
import arrowBack from '../../images/arrowBack.svg';
import eyeOpen from "../LoginPage/eyeOpen.svg";
import eyeClose from "../LoginPage/eyeClose.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ProtectedAuthRoute from '../../component/ProtectedAuthRoute';
import { $siteURL } from "../../common/SiteURL";

const BusinessRegistration = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [location, setLocation] = useState([]);
    
  // Validation functions
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{7,15}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    return passwordRegex.test(password);
  };

  const validateHearAbout = (heard_about_options) => {
    return heard_about_options !== 'Select how you heard about us';
  };

  const validateTreatmentCategoryProvider = (categories) => {
    return categories !== '' && categories !== 'Select Treatment Category';
  };

  const validateBusinessLocation = (location) => {
    return location !== '' && location !== 'Select a location';
  };

  const validateSizeOfBusiness = (business_size) => {
    return business_size !== '';
  };

  const validatePremisesNumber = (premises_count) => {
    return premises_count !== '';
  };
  
  

  // Step 01 validation
  const isStepOneValid = () => {
    return (
      formData.name && validateName(formData.name) &&
      formData.email && validateEmail(formData.email) &&
      formData.phone && validatePhone(formData.phone) &&
      formData.password && validatePassword(formData.password)
    );
  };

  // Step 02 validation
  const isStepTwoValid = () => {
    return (
      formData.heard_about_options && validateHearAbout(formData.heard_about_options) &&
      formData.categories && validateTreatmentCategoryProvider(formData.categories)
    );
  };

  // Step 03 validation
  const isStepThreeValid = () => {
    return (
      formData.location && validateBusinessLocation(formData.location) &&
      formData.business_size && validateSizeOfBusiness(formData.business_size) &&
      formData.premises_count && validatePremisesNumber(formData.premises_count)
    );
  };
  

  // Navigation handlers
  const nextStep = () => {
    if (currentStep === 1 && isStepOneValid()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && isStepTwoValid()) {
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const stepOne = currentStep === 1;
  const stepTwo = currentStep === 2;
  const stepThree = currentStep === 3;
   
  const handleStepOne = () => {
    setCurrentStep(1);
  };

  const handleStepTwo = () => {
    setCurrentStep(2);
  };

  const handleStepThree = () => {
    setCurrentStep(3);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    heard_about_options: '',
    categories: '',
    location: '',
    business_size: '',
    premises_count: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get token and role from localStorage
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      
      // Create a copy of the form data to ensure proper formatting
      const formattedData = {
        ...formData,
        // Ensure categories is sent as an array if it's not already
        categories: Array.isArray(formData.categories) ? formData.categories : [formData.categories]
      };
      
      //console.log('Sending data:', formattedData);
      // Debug the data being sent
      
      // Use formattedData instead of formData
      const response = await axios.post(`${$siteURL}/api/signup`, formattedData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
          'role': role || ''
        }
      });
      
      if (response.status >= 200 && response.status < 300) {
        toast.success('Registration successful');
        setTimeout(() => {
          navigate('/business-login');
        }, 2000);
      } else {
        toast.error('Registration failed: ' + (response.data?.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Add more detailed error logging
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      }
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      toast.error(errorMessage);
    }
  };


  const [category, setCategory] = useState([]);
    const fetchCategory = async () => {
        try {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role');
            const response = await axios.get(`${$siteURL}/api/category`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'role': role
                }
            });
            setCategory(response.data);
        } catch (error) {
            console.error(error || 'Error fetching category');
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchLocation = async () => {
        try {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role');
            const response = await axios.get(`${$siteURL}/api/location`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'role': role
                }
            });
            setLocation(response.data);
        } catch (error) {
            console.error(error || 'Error fetching location');
            toast.error('Error fetching location');
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);
    

    return (
        <Container>
            
                <div className="business-registration-container bg-white">
                <Row>
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12}>
                        <div className="business-registration-picture">
                            <img loading="lazy" src={businessRegistrationPicture} alt="Business Registration" className="img-fluid" />
                        </div>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12}>
                        <div className="business-registration-form">
                            <h1 className="text-center text-capitalize fw-bold">Business <mark>Registration</mark></h1>
                            <hr/>

                            <form onSubmit={handleSubmit} className="business-registration-form-container">
                            {currentStep === 1 && (
                                <div id="stepOne" className={`${stepOne ? 'd-block' : ''} handle-step-one`}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.name}
                                            placeholder='Name'
                                            required id="name"
                                            name="name"
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            autoComplete='name'    
                                        />
                                        <small className="text-danger">{formData.name && !validateName(formData.name) && 'Name must be 3-30 characters long. Only letters and spaces are allowed.'}</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={formData.email}
                                            placeholder='Email'
                                            required id="email"
                                            name="email"
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            autoComplete='email'
                                        />
                                        <small className="text-danger">{formData.email && !validateEmail(formData.email) && 'Invalid email syntax. Please enter a valid email address.'}</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="tel"
                                            minLength={7} maxLength={15}
                                            className="form-control"
                                            value={formData.phone}
                                            placeholder='Phone'
                                            required id="phone"
                                            name="phone"
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            autoComplete='phone'
                                        />
                                        <small className="text-danger">{formData.phone && !validatePhone(formData.phone) && 'Phone number must be 7-15 digits. Only numbers are allowed.'}</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <div className="position-relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                value={formData.password}
                                                placeholder='Password'
                                                required id="password"
                                                name="password"
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            />
                                            <span className="position-absolute top-50 end-0 translate-middle-y pe-3" style={{ cursor: 'pointer' }}>
                                                <img src={showPassword ? eyeOpen : eyeClose} alt='Disappear' onClick={() => setShowPassword(!showPassword) } />
                                            </span>
                                        </div>
                                        <small className="text-danger">{formData.password && !validatePassword(formData.password) && 'Password must be 8-20 characters, along with 1 number and 1 special character'}</small>
                                        
                                    </div>

                                    <div className="form-group text-end">
                                        <button 
                                            type="button" 
                                            className={`${stepOne && stepTwo ? 'd-block' : '' } next-step-button`} 
                                            onClick={nextStep}
                                            disabled={!isStepOneValid() }
                                        >
                                            next <img src={arrowNext} alt="arrowNext" />
                                        </button>
                                    </div>
                                </div>
                                )}

                                {currentStep === 2 && (
                                <div id="stepTwo" className={`${stepTwo ? 'd-block' : ''} handle-step-two`}>
                                    <div className="form-group">
                                        <legend htmlFor="heard_about_options">Where did you hear about Check a Treatment?</legend>
                                        <div className="check-hear-about-cat">
                                            <ul className="d-flex flex-wrap gap-3 ps-0 mb-5">
                                                <li>
                                                    <input type="radio" name="heard_about_options" id="mainPost-registration" checked={formData.heard_about_options === 'mainPost'} value="mainPost" onChange={(e) => setFormData({ ...formData, heard_about_options: e.target.value  })} required />
                                                    <label className='position-relative' htmlFor="mainPost-registration">mail post</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="heard_about_options" id="instagram-registration" checked={formData.heard_about_options === 'instagram'} value="instagram" onChange={(e) => setFormData({ ...formData, heard_about_options: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="instagram-registration">instagram</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="heard_about_options" id="facebook-registration" checked={formData.heard_about_options === 'facebook'} value="facebook" onChange={(e) => setFormData({ ...formData, heard_about_options: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="facebook-registration">facebook</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="heard_about_options" id="youTube-registration" checked={formData.heard_about_options === 'youTube'} value="youTube" onChange={(e) => setFormData({ ...formData, heard_about_options: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="youTube-registration">youTube</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="heard_about_options" id="tikTok-registration" checked={formData.heard_about_options === 'tikTok'} value="tikTok" onChange={(e) => setFormData({ ...formData, heard_about_options: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="tikTok-registration">tikTok</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="heard_about_options" id="linkedIn-registration" checked={formData.heard_about_options === 'linkedIn'} value="linkedIn" onChange={(e) => setFormData({ ...formData, heard_about_options: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="linkedIn-registration">linkedIn</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="heard_about_options" id="friend-registration" checked={formData.heard_about_options === 'friend'} value="friend" onChange={(e) => setFormData({ ...formData, heard_about_options: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="friend-registration">friend</label>
                                                </li>
                                            </ul>
                                            <small className="text-danger">{formData.heard_about_options && !validateHearAbout(formData.heard_about_options) && 'Please select an option'}</small>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="categories">What treatment categories do you provide?</label>
                                        <select
                                            className="form-control mb-4"
                                            id="categories"
                                            name="categories"
                                            value={formData.categories}
                                            onChange={(e) => {
                                                setFormData({ ...formData, categories: e.target.value });
                                            }}
                                            required
                                        >
                                            <option value="Select Treatment Category">Select Treatment Category</option>
                                            {category.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                            
                                        </select>
                                        <small className="text-danger">{formData.categories[1] && !validateTreatmentCategoryProvider(formData.categories[1]) && 'Please select a treatment category'}</small>
                                    </div>

                                    <div className="form-group d-flex justify-content-between">
                                        <button type="button" className={`${stepOne && stepTwo ? 'd-block' : ''} previous-step-button`} onClick={prevStep}><img src={arrowBack} alt="arrowBack" /> back</button>
                                        <button 
                                            type="button" 
                                            className={`submit-registration-button ${stepOne && stepTwo ? 'd-block' : '' } ${!isStepTwoValid() ? 'disabled' : ''}`} 
                                            disabled={!isStepTwoValid() }
                                            onClick={nextStep}
                                            >
                                            next <img src={arrowNext} alt="arrowNext" />
                                        </button>
                                    </div>
                                </div>
                                )}
                                
                                {currentStep === 3 && (
                                <div id="stepThree" className={`${stepThree ? 'd-block' : ''} handle-step-three`}>
                                    <div className="form-group">
                                        <label htmlFor="treatmentCategories-location">Select your Location</label>
                                        
                                        <select 
                                            id="treatmentCategories-location" 
                                            name="location" 
                                            className="form-control" 
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            required
                                        >
                                            <option value="">Select a location</option>
                                            {location?.length > 0 && location?.map((item) => (
                                                <option value={item?.id} key={item?.id}>{item?.name}</option>
                                            ))}
                                        </select>
                                        
                                        <small className="text-danger">{formData.location && !validateBusinessLocation(formData.location) && 'Please select a location'}</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="ageGroup-registration">What is the size of your business?</label>
                                        <div className="check-age-group-cat">
                                            <ul className="d-flex flex-wrap gap-3 ps-0 mb-5">
                                                <li>
                                                    <input type="radio" name="sizeOfBusiness" id="soloPractitioner" checked={formData.business_size === 'soloPractitioner'} value="soloPractitioner" onChange={(e) => setFormData({ ...formData, business_size: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="soloPractitioner">Solo Practitioner</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="sizeOfBusiness" id="2to5TeamMembers" checked={formData.business_size === '2to5TeamMembers'} value="2to5TeamMembers" onChange={(e) => setFormData({ ...formData, business_size: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="2to5TeamMembers">2-5 Team Members</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="sizeOfBusiness" id="6to10TeamMembers" checked={formData.business_size === '6to10TeamMembers'} value="6to10TeamMembers" onChange={(e) => setFormData({ ...formData, business_size: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="6to10TeamMembers">6-10 Team Members</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="sizeOfBusiness" id="11PlusTeamMembers" checked={formData.business_size === '11PlusTeamMembers'} value="11PlusTeamMembers" onChange={(e) => setFormData({ ...formData, business_size: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="11PlusTeamMembers">11+ Team Members</label>
                                                </li>
                                            </ul>
                                            <small className="text-danger">{formData.business_size && !validateSizeOfBusiness(formData.business_size) && 'Please select an option'}</small>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="ageGroup-registration">How many premises do you have?</label>
                                        <div className="check-age-group-cat">
                                            <ul className="d-flex flex-wrap gap-3 ps-0 mb-5">
                                                <li>
                                                    <input type="radio" name="premisesNumber" id="onePremises" checked={formData.premises_count === 'onePremises'} value="onePremises" onChange={(e) => setFormData({ ...formData, premises_count: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="onePremises">1</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="premisesNumber" id="twoPremises" checked={formData.premises_count === 'twoPremises'} value="twoPremises" onChange={(e) => setFormData({ ...formData, premises_count: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="twoPremises">2</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="premisesNumber" id="threePremises" checked={formData.premises_count === 'threePremises'} value="threePremises" onChange={(e) => setFormData({ ...formData, premises_count: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="threePremises">3</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="premisesNumber" id="fourPlusPremises" checked={formData.premises_count === 'fourPlusPremises'} value="fourPlusPremises" onChange={(e) => setFormData({ ...formData, premises_count: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="fourPlusPremises">4+</label>
                                                </li>
                                            </ul>
                                            <small className="text-danger">{formData.premises_count && !validatePremisesNumber(formData.premises_count) && 'Please select an option'}</small>
                                        </div>
                                    </div>

                                    <div className="form-group d-flex justify-content-between">
                                        <button type="button" className={`${stepTwo && stepThree ? 'd-block' : ''} previous-step-button`} onClick={prevStep}><img src={arrowBack} alt="arrowBack" /> back</button>
                                        <button 
                                            type="submit" 
                                            className={`submit-registration-button ${stepTwo && stepThree ? 'd-block' : ''} ${!isStepThreeValid() ? 'disabled' : ''}` } 
                                            disabled={!isStepThreeValid()}
                                            >
                                            submit
                                        </button>
                                    </div>
                                </div>
                                )}
                            </form>
                        </div>
                    </Col>
                    </Row>
                </div>
            
            <ToastContainer position="top-right" autoClose={3000} />
        </Container>
    );
};

export default ProtectedAuthRoute(BusinessRegistration);