import React from "react";
import lockIcon from "../../images/lock-icon.svg";
import arrowBack from "../../images/arrowBack.svg";
import { Link } from "react-router-dom";
import "./ForgetPassword.css";

const ForgetPassword = () => {
    return(
        <>
            <div className="forgetPassword-page">
                <div className="forgetPassword-icon">
                    <img src={lockIcon} alt="Forget Password" title="Forget Password" />
                </div>
                <h1 className="text-capitalize fw-normal text-center mb-3">forgot your password?</h1>
                <h6 className="w-100 text-center mb-3 fw-normal">Enter your email to reset it!</h6>
                <form action="" className="my-4">
                    <div className="form-group">
                        <label htmlFor="forgetEmail" className="fw-bold">Email ID</label>
                        <input type="email" id="forgetEmail" className="form-control" placeholder="Email Address" required="required"  />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="form-control text-uppercase">confirm</button>
                    </div>
                    <div className="form-group w-100 text-center h-auto pt-3">
                        <Link to="/login" className="text-decoration-none text-capitalize text-dark return-to-login">
                            <img src={arrowBack} alt="arrow back" title="arrow back" /> return to login screen
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ForgetPassword;