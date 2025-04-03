import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import paypalIcon from '../../images/paypalicon.svg';
import './Checkout.css';
import axios from 'axios';

const Checkout = () => {
    const location = useLocation();
    const [planData, setPlanData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSubscriptionPlan = async (planId) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://3.8.140.227:8000/api/checkout/${planId}`);
            setPlanData(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching subscription plan:', error);
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

    return (
        <>
        <div className="checkout-page w-100 h-auto d-block bg-white">
            <Container>
                <Row>
                    <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={12}>
                        <h1 className="text-start text-capitalize text-center position-relative pb-3 mb-5">payment</h1>
                        <p className='text-center'>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                        <img src={paypalIcon} alt="paypal" className='w-25 mx-auto d-block' />
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
                                    <p className='mb-0'>{planData.name}</p>
                                </li>
                                <li className='d-flex justify-content-between align-items-center'>
                                    <p className='mb-0'>package type</p>
                                    <p className='mb-0'>{planData.type}</p>
                                </li>
                                <li className='d-flex justify-content-between align-items-center'>
                                    <p className='mb-0'>price</p>
                                    <p className='mb-0'>£{planData.price}/m</p>
                                </li>
                                <li className='d-flex justify-content-between align-items-center'>
                                    <Link to='/' className='btn form-control'>checkout</Link>
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