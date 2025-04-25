import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import paypalIcon from '../../images/paypalicon.svg';
import './Checkout.css';
import axios from 'axios';
import { $siteURL } from '../../common/SiteURL';
import poundIcon from '../../images/poundIcon.svg';
import poundGreenIcon from '../../images/poundGreenIcon.svg';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [planData, setPlanData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [payment_url, setPayment_url] = useState();
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(null);
    const [finalAmount, setFinalAmount] = useState(null);
    const [couponMessage, setCouponMessage] = useState('');
    const [couponError, setCouponError] = useState('');

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            setError('Please login to continue');
            setTimeout(() => {
                navigate('/login', { state: { returnUrl: location.pathname } });
            }, 500);
        }
    }, [navigate, location.pathname]);

    const fetchSubscriptionPlan = useCallback(async (planId) => {
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            setLoading(true);
            const response = await axios.get(`${$siteURL}/api/checkout/${planId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRFToken': token
                }
            });
            
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
    }, []);
    

    useEffect(() => {
        const planId = location.state?.planId;
        if (planId) {
            localStorage.setItem('planID', planId);
            fetchSubscriptionPlan(planId);
        } else {
            setError('No plan selected');
            setLoading(false);
        }
    }, [location.state, fetchSubscriptionPlan]);

    const handleCheckout = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        const planId = location.state?.planId || localStorage.getItem('planID');
        const status = location.state?.status || localStorage.getItem('status');
        
        
        if (!planId) {
            setError('No payment details available');
            return;
        }

        try {
            setLoading(true);
            
            // Build the URL with coupon code if available
            let paymentUrl = `${$siteURL}/api/paypal/payment?selected_package_id=${planId}`;
            
            // Add necessary parameters
            const params = new URLSearchParams();
            
            if (couponCode) {
                params.append('coupon_code', couponCode);
            }
            
            if (finalAmount !== null) {
                params.append('final_amount', finalAmount);
            }
            
            if (discount !== null) {
                params.append('discount_amount', discount);
            }
            
            // Append parameters if any exist
            if (params.toString()) {
                paymentUrl += paymentUrl.includes('?') ? '&' : '?';
                paymentUrl += params.toString();
            }
            
            // Include final amount in the request body if available
            const requestBody = {
                amount: finalAmount !== null ? finalAmount : planData.listing.price,
                original_price: planData.listing.price
            };
            
            if (finalAmount !== null) {
                requestBody.has_discount = true;
                requestBody.discount_amount = discount;
                requestBody.coupon_code = couponCode;
            }
            
            // console.log('Sending payment request with data:', { 
            //     paymentUrl, 
            //     requestBody, 
            //     finalAmount, 
            //     discount, 
            //     couponCode 
            // });
            
            const response = await axios.post(
                paymentUrl,
                requestBody,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            //console.log(response.data, 'response');
            
            // Check if it's a free package or has a success message
            if (response.data?.status === 'success' && response.data?.message) {
                // Store success message in localStorage
                localStorage.setItem('status', 'success');
                localStorage.setItem('successMessage', response.data.message);
                
                // Navigate to thank-you page with state
                navigate('/thank-you', { 
                    state: { 
                        planId: planId,
                        status: 'success',
                        message: response.data.message
                    } 
                });
            } else if (response.data?.approval_url) {
                setPayment_url(response.data.approval_url);
            } else {
                setError('Failed to create payment');
            }
        } catch (error) {
            //console.error('Payment creation error:', error);
            setError(error.response?.data?.message || 'Failed to create payment. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    // we are handle the coupon code here
    const applyCoupon = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        const planId = location.state?.planId || localStorage.getItem('planID');
        if (!planId) {
            setError('No plan selected');
            return;
        }
        try {
            setLoading(true);
            // Reset any previous payment URL when applying a new coupon
            setPayment_url(null);
            
            const response = await axios.post(`${$siteURL}/api/apply-coupon?package_id=${planId}&coupon_code=${couponCode}`, {
                coupon_code: couponCode,
                original_price: planData.listing.price
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            console.log(response?.data, 'coupon response');
            if (response?.data?.status === 'success') {
                setFinalAmount(response?.data?.final_amount);
                setDiscount(response?.data?.discount);
                setCouponMessage(response?.data?.message);
                setCouponError('');
                
                // Update planData with the new values
                setPlanData(prevState => ({
                    ...prevState,
                    listing: {
                        ...prevState.listing,
                        final_amount: response?.data?.final_amount || 0,
                        discount: response?.data?.discount || 0
                    }
                }));
            } else {
                setCouponError('Invalid coupon code');
                setFinalAmount(null);
                setDiscount(null);
            }
        } catch (err) {
            console.error('Coupon application error:', err);
            setCouponError('Coupon code does not exist. Please try again.');
            setCouponMessage('');
            setFinalAmount(null);
            setDiscount(null);
        } finally {
            setLoading(false);
        }
    };

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
                                    {/* <h5>{planData.message}</h5> */}
                                    <strong className='lh-lg h-auto'>Your plan name is </strong>
                                    <h3>{planData.listing.name}</h3>
                                    <p className='text-capitalize mb-0'>Package Type: <strong>{planData.listing.type}</strong></p>
                                    <p className='text-capitalize mb-0'>Package Duration: <strong>{planData.listing.number_of_days}</strong> Days.</p>
                                    <div className='display-1 my-1'>
                                        <p className='boldness'><img src={poundGreenIcon} alt="pound" className='gbp-icon' /> {planData.listing.price}/m</p>
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
                            <p className="text-danger">{error || 'Login to continue'}</p>
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

                                <li className='d-flex justify-content-between align-items-center flex-column'>
                                    <p className='mb-2 fw-bold text-start w-100'>Coupon Code/ Gift Voucher</p>
                                    <input
                                        type="text" 
                                        className='form-control py-2 rounded-pill' 
                                        placeholder='Enter Coupon Code' 
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        autoComplete='off'
                                    />
                                    <div className="d-flex justify-content-between w-100 mt-2 position-relative">
                                        <button 
                                            className='btn btn-primary py-2 w-100 rounded-pill' 
                                            onClick={applyCoupon}
                                            disabled={!couponCode || loading}
                                        >
                                            {loading ? 'Applying...' : 'Apply Coupon'}
                                        </button>
                                        {(discount !== null && discount > 0) && (
                                            <button 
                                                className='btn btn-outline-danger py-1 ms-2 rounded-pill resetCoupon position-absolute' 
                                                onClick={() => {
                                                    setCouponCode('');
                                                    setDiscount(null);
                                                    setFinalAmount(null);
                                                    setCouponMessage('');
                                                    setCouponError('');
                                                    setPayment_url(null);
                                                }}
                                            >
                                                Reset
                                            </button>
                                        )}
                                    </div>
                                    {couponMessage && <small className='text-success mt-2 mb-0'>{couponMessage}</small>}
                                    {couponError && <small className='text-danger mt-2 mb-0'>{couponError}</small>}
                                </li>

                                <li className='d-flex justify-content-between align-items-center'>
                                    <p className='mb-0'>price</p>
                                    <p className='mb-0'>
                                        <img src={poundIcon} alt="pound" className='gbp-icon' />
                                        {planData.listing.price}/m
                                    </p>
                                </li>

                                <li className='d-flex justify-content-between align-items-center'>
                                    <p className='mb-0'>Discount price</p>
                                    <p className='mb-0'>
                                        {discount !== null ? discount : 0}/-
                                    </p>
                                </li>

                                <li className='d-flex justify-content-between align-items-center'>
                                    <p className='mb-0'>original price</p>
                                    <p className='mb-0'>
                                        {planData.listing.original_price || planData.listing.price}/-
                                    </p>
                                </li>

                                <li className='d-flex justify-content-between align-items-center'>
                                    <p className='mb-0'>final price</p>
                                    <p className='mb-0'>
                                        <img src={poundIcon} alt="pound" className='gbp-icon' />
                                        {finalAmount !== null ? finalAmount : planData.listing.price}/-
                                    </p>
                                </li>

                                <li className='d-flex justify-content-between align-items-center'>
                                    {planData.listing.type !== 'free' ?  (
                                        <button 
                                            className='btn form-control checkoutButton' 
                                            onClick={handleCheckout}
                                            disabled={loading}
                                        >
                                            {loading ? 'Loading...' : payment_url ? 
                                                <a href={payment_url} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-white">
                                                    Proceed to Payment
                                                </a> : 'Checkout'}
                                        </button>
                                     ) : null}
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