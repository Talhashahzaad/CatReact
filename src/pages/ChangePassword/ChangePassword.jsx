import React from "react";
import lockIcon from "../../images/lock-icon.svg";
import arrowBack from "../../images/arrowBack.svg";
import { Link } from "react-router-dom";
import "./ChangePassword.css";

const ChangePassword = () => {
    return(
        <>
            <div className="changePassword-page">
                <div className="changePassword-icon">
                    <img src={lockIcon} alt="Change Password" title="Change Password" />
                </div>
                <h1 className="text-capitalize fw-normal text-center mb-3">change your password</h1>
                <h6 className="w-100 text-center mb-3 fw-normal">Enter your new password!</h6>
                <form action="" className="my-4">
                    <div className="form-group">
                        <label htmlFor="changePassword" className="fw-bold">New Password</label>
                        <input type="password" id="changePassword" className="form-control" placeholder="New Password" required="required"  />
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

export default ChangePassword;