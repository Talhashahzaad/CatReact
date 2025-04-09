import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import paypalIcon from '../../images/paypalicon.svg';
import './Checkout.css';
import axios from 'axios';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [planData, setPlanData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [payment_url, setPayment_url] = useState();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            setError('Please login to continue');
            setTimeout(() => {
                navigate('/login', { state: { returnUrl: location.pathname } });
            }, 500);
        }
    }, [navigate, location.pathname]);

    const fetchSubscriptionPlan = async (planId) => {
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            setLoading(true);
            const response = await axios.get(`http://3.8.140.227:8000/api/checkout/${planId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRFToken': token
                }
            });
            console.log(response.data);
            if (response.data?.error) {
                setError(response.data.error);
                return;
            }
            
            setPlanData(response.data);
            setError(null);
        } catch (error) {
            console.error('Failed to load subscription plan details:', error);
            setError('Failed to load subscription plan details');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const planId = location.state?.planId;
        if (planId) {
            fetchSubscriptionPlan(planId);
        } else {
            setError('No plan selected');
            setLoading(false);
        }
    }, [location.state]);

    const handleCheckout = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        const planId = location.state?.planId || localStorage.getItem('planID');
        
        if (!planId) {
            setError('No payment details available');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(`http://3.8.140.227:8000/api/paypal/payment/?selected_package_id=${planId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            console.log(response.data, 'response');
            if (response.data?.approval_url) {
                setPayment_url(response.data.approval_url);
            } else {
                setError('Failed to create payment');
            }
        } catch (error) {
//            console.error('Payment creation failed:', error);
            setError(error.response?.data?.message || 'Failed to create payment. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        <div className="checkout-page w-100 h-auto d-block bg-white">
            <Container>
                <Row>
                    <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={12}>
                        <img src={paypalIcon} alt="paypal" className='w-25 d-block' />
                        <h1 className="text-start text-capitalize text-left position-relative pb-3 mb-5">review your order</h1>
                        <blockquote className='text-left'>
                            {planData && (
                                <div>
                                    <h5>{planData.message}</h5>
                                    <strong className='lh-lg h-auto'>Your plan name is </strong>
                                    <h3>{planData.listing.name}</h3>
                                    <p className='text-capitalize mb-0'>Package Type: <strong>{planData.listing.type}</strong></p>
                                    <p className='text-capitalize mb-0'>Package Duration: <strong>{planData.listing.number_of_days}</strong> Days.</p>
                                    <div className='display-1 my-1'>
                                        <p className='boldness'>£ {planData.listing.price}/m</p>
                                    </div>
                                </div>
                            )}
                        </blockquote>
                        
                    </Col>
                    <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
                        <div className='checkout-form-section'>
                            <h3 className="text-start text-capitalize text-start position-relative pb-0">product details</h3><hr/>
                        {loading ? (
                            <p>Loading plan details...</p>
                        ) : error ? (
                            <p className="text-danger">{error}</p>
                        ) : planData && (
                            <ul className='ps-0 mb-0'>
                                <li className='d-flex justify-content-between align-items-center'>
                                    <p className='mb-0'>package name</p>
                                    <p className='mb-0'>{planData.listing.name}</p>
                                </li>
                                <li className='d-flex justify-content-between align-items-center'>
                                    <p className='mb-0'>package type</p>
                                    <p className='mb-0'>{planData.listing.type}</p>
                                </li>
                                <li className='d-flex justify-content-between align-items-center'>
                                    <p className='mb-0'>package duration</p>
                                    <p className='mb-0'>{planData.listing.number_of_days}</p>
                                </li>
                                <li className='d-flex justify-content-between align-items-center'>
                                    <p className='mb-0'>price</p>
                                    <p className='mb-0'>£{planData.listing.price}/m</p>
                                </li>
                                <li className='d-flex justify-content-between align-items-center'>
                                    <button 
                                        className='btn form-control checkoutButton' 
                                        onClick={handleCheckout}
                                        
                                    >
                                        {loading ? 'Loading...' : payment_url ? 
                                            <a href={payment_url} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-white">
                                                Proceed to Payment
                                            </a> : 'Checkout'}
                                    </button>
                                </li>
                                </ul>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    );
};

export default Checkout;