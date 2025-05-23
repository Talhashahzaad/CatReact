import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./PaypalCancel.css";

const PaypalCancel = () => {
    return (
        <>
        <div className="paypal-cancel-container">
            <Container>
                <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className='paypal-cancel-container d-flex justify-content-center align-items-center flex-column py-5'>
                            <h1 className="mb-4 display-3">Payment Canceled</h1>

                            <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                                <g>
                                    <path fill="#f44336" d="M256 0C114.836 0 0 114.836 0 256s114.836 256 256 256 256-114.836 256-256S397.164 0 256 0zm0 0"/>
                                    <path fill="#fafafa" d="M350.273 320.105c8.34 8.344 8.34 21.825 0 30.168a21.275 21.275 0 0 1-15.086 6.25c-5.46 0-10.921-2.09-15.082-6.25L256 286.164l-64.105 64.11a21.273 21.273 0 0 1-15.083 6.25 21.275 21.275 0 0 1-15.085-6.25c-8.34-8.344-8.34-21.825 0-30.169L225.836 256l-64.11-64.105c-8.34-8.344-8.34-21.825 0-30.168 8.344-8.34 21.825-8.34 30.169 0L256 225.836l64.105-64.11c8.344-8.34 21.825-8.34 30.168 0 8.34 8.344 8.34 21.825 0 30.169L286.164 256zm0 0"/>
                                </g>
                            </svg>
                            
                            <h4 className="b-0 pt-3 text-normal text-dark text-center lh-lg">Payment canceled. Please try again.</h4>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    );
};

export default PaypalCancel;