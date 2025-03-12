import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './BusinessRegistration.css';
import businessRegistrationPicture from '../../images/business-registration.png';
import arrowNext from '../../images/arrowNext.svg';
import arrowBack from '../../images/arrowBack.svg';
import eyeOpen from "../LoginPage/eyeOpen.svg";
import eyeClose from "../LoginPage/eyeClose.svg";



const BusinessRegistration = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tel: '',
    password: '',
    hearAbout: '',
    treatmentCategoryProvider: '',
    businessLocation: '',
    sizeOfBusiness: '',
    premisesNumber: ''
  });

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

  const validateHearAbout = (hearAbout) => {
    return hearAbout !== 'Select how you heard about us';
  };

  const validateTreatmentCategoryProvider = (treatmentCategoryProvider) => {
    return treatmentCategoryProvider !== '';
  };

  const validateBusinessLocation = (businessLocation) => {
    return businessLocation !== '';
  };

  const validateSizeOfBusiness = (sizeOfBusiness) => {
    return sizeOfBusiness !== '';
  };

  const validatePremisesNumber = (premisesNumber) => {
    return premisesNumber !== '';
  };
  
  

  // Step validation
  const isStepOneValid = () => {
    return (
      formData.name && validateName(formData.name) &&
      formData.email && validateEmail(formData.email) &&
      formData.tel && validatePhone(formData.tel) &&
      formData.password && validatePassword(formData.password)
    );
  };

  const isStepTwoValid = () => {
    return formData.hearAbout !== '' && formData.treatmentCategoryProvider !== '';
  };

  const isStepThreeValid = () => {
    return formData.businessLocation !== '' && formData.sizeOfBusiness !== '' && formData.premisesNumber !== '';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isStepThreeValid()) {
      // Handle form submission
      console.log('Form submitted:', formData);
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

  

    return (
        <Container>
            <Row>
                <div className="business-registration-container bg-white">
                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                        <div className="business-registration-picture">
                            <img loading="lazy" src={businessRegistrationPicture} alt="Business Registration" className="img-fluid" />
                        </div>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                        <div className="business-registration-form">
                            <h1 className="text-center text-capitalize fw-bold">Business <mark>Registration</mark></h1>
                            <hr/>

                            {/* Progress bar */}
                            {/* <div className="d-flex justify-content-between mb-4">
                            {[1, 2, 3].map((step) => (
                                <div
                                key={step}
                                className="progress flex-grow-1 mx-1"
                                style={{ height: '4px' }}
                                >
                                <div
                                    className={`progress-bar ${
                                    currentStep >= step ? 'bg-primary' : 'bg-secondary'
                                    }`}
                                    style={{ width: '100%' }}
                                />
                                </div>
                            ))}
                            </div> */}

                            <form onSubmit={handleSubmit}>
                            {currentStep === 1 && (
                                <div id="stepOne" className={`${stepOne ? 'd-block' : ''} handle-step-one`}>
                                    <div className="form-group">
                                        <label htmlFor="nameBusiness-registration">Name</label>
                                        <input type="text" className="form-control" value={formData.name} placeholder='Name' onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                        <small className="text-danger">{formData.name && !validateName(formData.name) && 'Name must be 3-30 characters long. Only letters and spaces are allowed.'}</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="emailBusiness-registration">Email</label>
                                        <input type="email" className="form-control" value={formData.email} placeholder='Email' onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                        <small className="text-danger">{formData.email && !validateEmail(formData.email) && 'Invalid email syntax. Please enter a valid email address.'}</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phoneBusiness-registration">Phone</label>
                                        <input type="tel" minLength={7} maxLength={15} className="form-control" value={formData.tel} placeholder='Phone' onChange={(e) => setFormData({ ...formData, tel: e.target.value })} />
                                        <small className="text-danger">{formData.tel && !validatePhone(formData.tel) && 'Phone number must be 7-15 digits. Only numbers are allowed.'}</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="passwordBusiness-registration">Password</label>
                                        <div className="position-relative">
                                            <input type={showPassword ? "text" : "password"} className="form-control" value={formData.password} placeholder='Password' onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
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
                                        <label htmlFor="hearAboutCAT-registration">Where did you hear about Check a Treatment?</label>
                                        <div className="check-hear-about-cat">
                                            <ul className="d-flex flex-wrap gap-3 ps-0 mb-5">
                                                <li>
                                                    <input type="radio" name="hearAbout1" id="mainPost-registration" checked={formData.hearAbout === 'mainPost'} value="mainPost" onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value  })} required />
                                                    <label className='position-relative' htmlFor="mainPost-registration">mail post</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="hearAbout1" id="instagram-registration" checked={formData.hearAbout === 'instagram'} value="instagram" onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="instagram-registration">instagram</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="hearAbout1" id="facebook-registration" checked={formData.hearAbout === 'facebook'} value="facebook" onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="facebook-registration">facebook</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="hearAbout1" id="youTube-registration" checked={formData.hearAbout === 'youTube'} value="youTube" onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="youTube-registration">youTube</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="hearAbout1" id="tikTok-registration" checked={formData.hearAbout === 'tikTok'} value="tikTok" onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="tikTok-registration">tikTok</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="hearAbout1" id="linkedIn-registration" checked={formData.hearAbout === 'linkedIn'} value="linkedIn" onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="linkedIn-registration">linkedIn</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="hearAbout1" id="friend-registration" checked={formData.hearAbout === 'friend'} value="friend" onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="friend-registration">friend</label>
                                                </li>
                                            </ul>
                                            <small className="text-danger">{formData.hearAbout && !validateHearAbout(formData.hearAbout) && 'Please select an option'}</small>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="treatmentCategories-registration">What treatment categories do you provide?</label>
                                        <select className="form-control mb-4" id="treatmentCategories-registration" value={formData.treatmentCategoryProvider} onChange={(e) => setFormData({ ...formData, treatmentCategoryProvider: e.target.value })} required>
                                            <option value="">Select Treatment Category</option>
                                            <option value="1">hair</option>
                                            <option value="2">nails</option>
                                            <option value="3">beauty</option>
                                        </select>
                                        <small className="text-danger">{formData.treatmentCategoryProvider && !validateTreatmentCategoryProvider(formData.treatmentCategoryProvider) && 'Please select a treatment category'}</small>
                                    </div>

                                    <div className="form-group d-flex justify-content-between">
                                        <button type="button" className={`${stepOne && stepTwo ? 'd-block' : ''} previous-step-button`} onClick={prevStep}><img src={arrowBack} alt="arrowBack" /> back</button>
                                        <button 
                                            type="button" 
                                            className={`submit-registration-button ${stepOne && stepTwo ? 'd-block' : '' } ${!isStepTwoValid() ? 'disabled' : ''}`} 
                                            disabled={!isStepTwoValid() }
                                            onClick={nextStep}>
                                            next <img src={arrowNext} alt="arrowNext" />
                                        </button>
                                    </div>
                                </div>
                                )}
                                
                                {currentStep === 3 && (
                                <div id="stepThree" className={`${stepThree ? 'd-block' : ''} handle-step-three`}>
                                    <div className="form-group">
                                        <label htmlFor="treatmentCategories-registration">What treatment categories do you provide?</label>
                                        <select className="form-control mb-4" id="treatmentCategories-registration" value={formData.businessLocation} onChange={(e) => setFormData({ ...formData, businessLocation: e.target.value })} required>
                                            <option value="">Select Location</option>
                                            <option value="1">Location 1</option>
                                            <option value="2">Location 2</option>
                                            <option value="3">Location 3</option>
                                        </select>
                                        <small className="text-danger">{formData.businessLocation && !validateBusinessLocation(formData.businessLocation) && 'Please select a location'}</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="ageGroup-registration">What is the size of your business?</label>
                                        <div className="check-age-group-cat">
                                            <ul className="d-flex flex-wrap gap-3 ps-0 mb-5">
                                                <li>
                                                    <input type="radio" name="sizeOfBusiness" id="soloPractitioner" checked={formData.sizeOfBusiness === 'soloPractitioner'} value="soloPractitioner" onChange={(e) => setFormData({ ...formData, sizeOfBusiness: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="soloPractitioner">Solo Practitioner</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="sizeOfBusiness" id="2to5TeamMembers" checked={formData.sizeOfBusiness === '2to5TeamMembers'} value="2to5TeamMembers" onChange={(e) => setFormData({ ...formData, sizeOfBusiness: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="2to5TeamMembers">2-5 Team Members</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="sizeOfBusiness" id="6to10TeamMembers" checked={formData.sizeOfBusiness === '6to10TeamMembers'} value="6to10TeamMembers" onChange={(e) => setFormData({ ...formData, sizeOfBusiness: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="6to10TeamMembers">6-10 Team Members</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="sizeOfBusiness" id="11PlusTeamMembers" checked={formData.sizeOfBusiness === '11PlusTeamMembers'} value="11PlusTeamMembers" onChange={(e) => setFormData({ ...formData, sizeOfBusiness: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="11PlusTeamMembers">11+ Team Members</label>
                                                </li>
                                            </ul>
                                            <small className="text-danger">{formData.sizeOfBusiness && !validateSizeOfBusiness(formData.sizeOfBusiness) && 'Please select an option'}</small>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="ageGroup-registration">How many premises do you have?</label>
                                        <div className="check-age-group-cat">
                                            <ul className="d-flex flex-wrap gap-3 ps-0 mb-5">
                                                <li>
                                                    <input type="radio" name="premisesNumber" id="onePremises" checked={formData.premisesNumber === 'onePremises'} value="onePremises" onChange={(e) => setFormData({ ...formData, premisesNumber: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="onePremises">1</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="premisesNumber" id="twoPremises" checked={formData.premisesNumber === 'twoPremises'} value="twoPremises" onChange={(e) => setFormData({ ...formData, premisesNumber: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="twoPremises">2</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="premisesNumber" id="threePremises" checked={formData.premisesNumber === 'threePremises'} value="threePremises" onChange={(e) => setFormData({ ...formData, premisesNumber: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="threePremises">3</label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="premisesNumber" id="fourPlusPremises" checked={formData.premisesNumber === 'fourPlusPremises'} value="fourPlusPremises" onChange={(e) => setFormData({ ...formData, premisesNumber: e.target.value })} required />
                                                    <label className='position-relative' htmlFor="fourPlusPremises">4+</label>
                                                </li>
                                            </ul>
                                            <small className="text-danger">{formData.premisesNumber && !validatePremisesNumber(formData.premisesNumber) && 'Please select an option'}</small>
                                        </div>
                                    </div>

                                    <div className="form-group d-flex justify-content-between">
                                        <button type="button" className={`${stepTwo && stepThree ? 'd-block' : ''} previous-step-button`} onClick={prevStep}><img src={arrowBack} alt="arrowBack" /> back</button>
                                        <button 
                                            type="submit" 
                                            className={`submit-registration-button ${stepTwo && stepThree ? 'd-block' : ''} ${!isStepThreeValid() ? 'disabled' : ''}` } 
                                            disabled={!isStepThreeValid()}>
                                            submit
                                        </button>
                                    </div>
                                </div>
                                )}
                            </form>
                        </div>
                    </Col>
                </div>
            </Row>
        </Container>
    );
};

export default BusinessRegistration;