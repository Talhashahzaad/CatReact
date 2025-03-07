import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Error404 from '../../images/Error404.gif';
import { Link } from 'react-router-dom';
import './Error404.css';
import { IoIosArrowRoundBack } from "react-icons/io";

const Error404Page = () => {
    return (
        <>
            <Container className='not-found-container'>
                <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            <figure>
                                <img src={Error404} alt="404 Error" className="img-fluid" />
                            </figure>
                            <h1 className='pb-4'>This page can't be found</h1>
                            <p className='text-center'>The page you are looking for does not exist.</p>
                            <Link to="/" className='buttonStyle'><IoIosArrowRoundBack className='me-2' /> Go to Home</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Error404Page;