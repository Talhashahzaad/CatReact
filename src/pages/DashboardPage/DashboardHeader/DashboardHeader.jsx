import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultAvatarPicture from "../../../images/default-profile-picture.webp";
import logoutIcon from "../../../images/logout-dashIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DashboardHeader.css';

const DashboardHeader = () => {
    const [profileInfo, setProfileInfo] = useState();
    const defaultAvatar = defaultAvatarPicture;
    const successNotify = () => toast.success('Logout successful');
    const errorNotify = () => toast.error('Logout failed');
    const [error, setError] = useState(null);
    const [loggedOutMessage, setLoggedOutMessage] = useState({
        show: false,
        message: ''
    });

    // We are handling the logout here

    const handleLogout = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.post("http://3.8.140.227:8000/api/logout", {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                localStorage.removeItem("token");
                setLoggedOutMessage({
                    show: true,
                    message: response.data.message
                });
                successNotify();
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
        } catch (error) {
            console.error("Logout error:", error);
            errorNotify();
        }
    };

    const navigate = useNavigate();


    useEffect(() => {
        if (loggedOutMessage.show) {
            setTimeout(() => {
                setLoggedOutMessage(false);
            }, 3000);
        }
    }, [loggedOutMessage.show, navigate]);

    // We are showing the profile picture here
    const fetchProfileInfo = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.get('http://3.8.140.227:8000/api/user-profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setProfileInfo(response.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    return (
        <>
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ zIndex: 9999 }}
            />
            <div className="dashboard-sidebar-header-top">
                <div className="dashboard-header-logout">
                    <Link to="#" onClick={handleLogout} className="text-decoration-none text-dark text-capitalize">
                        <span className="item-icon">
                            <img src={logoutIcon} alt="Logout" />
                        </span>
                        <span className="item-text">logout</span>
                    </Link>
                </div>

                <div className="dash-profile-picture d-flex justify-content-flex-end align-items-center text-end float-end">
                    <figure className="mb-0">
                        <img src={profileInfo?.user?.avatar ? `http://3.8.140.227:8000/${profileInfo?.user?.avatar}` : defaultAvatar} alt="Profile" />
                    </figure>
                    <div className="d-flex flex-column ms-2 text-white">
                        {profileInfo && (
                            <Link to="/dashboard/my-profile" className="text-dark">
                                hi, {profileInfo.user.name}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardHeader;