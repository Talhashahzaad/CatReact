import { useState, useEffect } from 'react'
import axios from 'axios';
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import facebookIcon from "../../images/facebook.svg";
import instagramIcon from "../../images/instagram.svg";
import youtubeIcon from "../../images/youtube.svg";
import linkedinIcon from "../../images/linkedin.svg";
import phoneIconTiny from "../../images/phoneIcon-tiny.svg";
import envelopeIconTiny from "../../images/envelopeIcon-tiny.svg";
import tiktokIcon from "../../images/tiktok.svg";

import "../../App.css";
import "./ContactUs.css";

const ContactUs = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMessage('');
        setErrorMessage('');

        try {
            const response = await axios.post('http://3.8.140.227:8000/api/contact-store', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 201 || response.status === 200) {
                setResponseMessage('Your message has been sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
                console.log(response);
            } 
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || 'An error occurred while sending the message. Please try again later.');
            } else {
                setErrorMessage('Server is not responding. Please check your connection.');
            }
        }
    };
    
    useEffect(() => {
        if (responseMessage) {
            const timer = setTimeout(() => {
                window.location.href = '/thank-you';
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [responseMessage]);

    // Load Google Maps JavaScript API asynchronously
    // useEffect(() => {
    //     const loadGoogleMapsAPI = () => {
    //         const script = document.createElement('script');
    //         script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    //         script.async = true;
    //         script.defer = true;
    //         document.body.appendChild(script);
    //     };

    //     loadGoogleMapsAPI();
    // }, []);

    return (
        <>
            <div className="feature-banner w-100 h-auto d-block position-relative contact-us-page">
                <Container>
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                            <h1 className="animate__fadeInUp animate__animated">Contact Us</h1>
                            <div className="w-100 text-center d-inline-block mx-auto pt-3 pb-2">
                                <hr className="w-10 h-auto py-1 text-center d-block border-0 rounded mx-auto" />
                            </div>
                            <h4 className="text-center w-100 pt-0 pb-4 fw-normal text-uppercase">Have questions, feedback, or just want to say hello?</h4>
                            <p className="text-center">We'd love to hear from you! At Check a Treatment, we're dedicated to providing you with the best possible experience.</p>
                            <p className="text-center">Our contact form is your direct line to our team. Simply fill out the form below with your inquiry, and we'll get back to you as soon as possible. You can also reach us on email: <a href="mailto:support@checkatreatment.com" className="anchorBlack">support@checkatreatment.com</a></p>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="inner-page-content w-100 h-auto d-block position-relative py-5">
                <Container>
                    <Row>
                        <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                            <h3 className="text-normal">Get in Touch</h3>
                            <hr/>
                            <strong className="d-block my-1">Follow us on social platforms:</strong>
                            <div className="socialMedia-Contact">
                                <ul className="ps-0 mb-0 d-flex">
                                    <li><Link to="/"><img src={facebookIcon} alt="" /></Link></li>
                                    <li><Link to="/"><img src={instagramIcon} alt="" /></Link></li>
                                    <li><Link to="/"><img src={linkedinIcon} alt="" /></Link></li>
                                    <li><Link to="/"><img src={youtubeIcon} alt="" /></Link></li>
                                    <li><Link to="/"><img src={tiktokIcon} alt="" /></Link></li>
                                </ul>
                            </div>

                            <div className="contactPhoneEmail">
                                <ul className="ps-0 mb-0 d-flex flex-column mt-5">
                                    <li>
                                        <span className="tinyIcon">
                                            <img src={envelopeIconTiny} alt="" title="" />
                                        </span>
                                        <span className="tinyIconContent">
                                            <label htmlFor="email" name="email">Email</label>
                                            <a href="mailto:support@checkatreatment.com">support@checkatreatment.com</a>
                                        </span>
                                    </li>

                                    <li>
                                        <span className="tinyIcon">
                                            <img src={phoneIconTiny} alt="" title="" />
                                        </span>
                                        <span className="tinyIconContent">
                                            <label htmlFor="phone" name="phone">Phone Number</label>
                                            <a href="tel:1800000000000">1800-000-000-000</a>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} className='contact-us-form'>
                            <h3 className="text-normal">Send a Message</h3>
                            <hr/>
                            <form className="contactForm mb-5" onSubmit={handleSubmit}>
                                <Row>
                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12} className="mb-3">
                                        <div className="form-group">
                                            <label className="mb-2" htmlFor="name">Full Name</label>
                                            <input 
                                                type="text" 
                                                id="name" 
                                                name="name" 
                                                className="form-control contact-name" 
                                                placeholder="Name" 
                                                required="required" 
                                                value={formData.name}
                                                onChange={handleChange}
                                                autoComplete="off"
                                            />
                                        </div>
                                    </Col>

                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12} className="mb-3">
                                        <div className="form-group">
                                            <label className="mb-2" htmlFor="email">Email Address</label>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                name="email" 
                                                className="form-control contact-email" 
                                                placeholder="Email" 
                                                required="required" 
                                                value={formData.email}
                                                onChange={handleChange}
                                                autoComplete="off"
                                            />
                                        </div>
                                    </Col>

                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
                                        <div className="form-group">
                                            <label className="mb-2" htmlFor="phone">Phone Number</label>
                                            <input 
                                                type="tel" 
                                                id="phone" 
                                                name="phone" 
                                                minLength={10} 
                                                maxLength={12} 
                                                className="form-control contact-phone" 
                                                placeholder="Phone" 
                                                required="required" 
                                                value={formData.phone}
                                                onChange={handleChange}
                                                autoComplete="off"
                                            />
                                        </div>
                                    </Col>

                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12} className="mb-4">
                                        <div className="form-group">
                                            <label className="mb-2" htmlFor="message">Message</label>
                                            <textarea 
                                                id="message" 
                                                name="message" 
                                                className="form-control contact-message" 
                                                placeholder="Text your message here..." 
                                                value={formData.message}
                                                onChange={handleChange}
                                                required="required"
                                                autoComplete="off"
                                            ></textarea>
                                        </div>
                                    </Col>

                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <div className="form-group">
                                            <input
                                                type="submit"
                                                value='Submit Message'
                                                className="form-control text-capitalize"
                                            />
                                        </div>
                                    </Col>

                                    {responseMessage && ( 
                                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <div className={`mt-3 alert ${responseMessage ? 'alert-success' : errorMessage ? 'alert-danger' : ''}`}>
                                                {responseMessage || errorMessage}
                                            </div>
                                        </Col>
                                    )}
                                </Row>
                            </form>
                        </Col>

                        {/* <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="contact-us-map">
                                <iframe src="https://www.google.com/maps/d/embed?mid=1LaIpxs9XJ9Bod98XJ9PsOQZrlZaDTCU&ehbc=2E312F=en&z=7" className="w-100" height="480"></iframe>
                            </div>
                        </Col> */}
                    </Row>
                </Container>
            </div>
        </>
    )
}   

export default ContactUs;