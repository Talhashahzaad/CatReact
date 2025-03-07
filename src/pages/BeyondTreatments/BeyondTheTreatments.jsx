import React from 'react';
import beyondTreatments from '../../images/beyondTheTreatments.jpg';
import beyondTreatmentsVideo1 from '../../images/clip1.mp4';
import beyondTreatmentsVideo2 from '../../images/clip2.mp4';
import beyondTreatmentsVideo3 from '../../images/clip3.mp4';
import beyondTreatmentsVideo4 from '../../images/clip4.mp4';
import { Container, Row, Col } from 'react-bootstrap';
import './BeyondTheTreatments.css';

const BeyondTheTreatments = () => {
    return (
        <>
            <div className='beyond-treatments-banner position-relative'>
                <img src={beyondTreatments} alt='beyondTreatments' />
                <div className='position-absolute top-50 start-50 translate-middle text-center'>
                    <h1 className='text-white fw-normal'>Beyond The Treatments</h1>
                </div>
            </div>
            
            <div className='beyond-treatments-clips position-relative w-100 h-auto d-block pt-5'>
                <Container>
                    <Row>
                        <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12} className='pb-5'>
                            <div className='beyond-treatments-clips-item'>
                                <h3 className='text-black text-capitalize mb-3'>clip 01</h3>
                                <video className='w-100' src={beyondTreatmentsVideo1} playsInline loop muted controls={true}>
                                    <source src={beyondTreatmentsVideo1} type='video/mp4' />
                                </video>
                            </div>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12} className='pb-5'>
                            <div className='beyond-treatments-clips-item'>
                                <h3 className='text-black text-capitalize mb-3'>clip 02</h3>
                                <video className='w-100' src={beyondTreatmentsVideo2} playsInline loop muted controls={true}>
                                    <source src={beyondTreatmentsVideo2} type='video/mp4' />
                                </video>
                            </div>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12} className='pb-5'>
                            <div className='beyond-treatments-clips-item'>
                                <h3 className='text-black text-capitalize mb-3'>clip 03</h3>
                                <video className='w-100' src={beyondTreatmentsVideo3} playsInline loop muted controls={true}>
                                    <source src={beyondTreatmentsVideo3} type='video/mp4' />
                                </video>
                            </div>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12} className='pb-5'>
                            <div className='beyond-treatments-clips-item'>
                                <h3 className='text-black text-capitalize mb-3'>clip 04</h3>
                                <video className='w-100' src={beyondTreatmentsVideo4} playsInline loop muted controls={true}>
                                    <source src={beyondTreatmentsVideo4} type='video/mp4' />
                                </video>
                            </div>
                        </Col>
                    </Row>
                </Container>

            </div>
        </>
    );
};

export default BeyondTheTreatments;