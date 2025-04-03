import { React, useState } from "react";
import {Container, Row} from 'react-bootstrap';
import { Outlet } from "react-router-dom";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import axios from "axios";
import "./Dashboard.css";
import "../../App.css";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import Sidebar from "./Sidebar/Sidebar";


const Dashboard = () =>{
    // const [dashboardData, setDashboardData] = useState({
    //     totalReviews: 100,
    //     activeListing: 10,
    //     wishlist: 5,
    //     message: 20
    // });

    const checkToken = async () => {
        const token = localStorage.getItem("token");
        if(!token){
            localStorage.removeItem("token");
            navigate("/login");
        } else{
            const response = await axios.get("http://3.8.140.227:8000/api/login", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if(response.status === 200){
                setDashboardData(response.data);
            } else{
                localStorage.removeItem("token");
                navigate("/login");
            }
        }
    }
    
    const [isOpen, setIsOpen] = useState(true)
    return(
        <>
        <Container fluid className="dashboard-page-main">
            <Row>
                <div className="dashboard-page-section w-100 h-auto d-flex justify-content-between align-items-start" 
                    onClick={(e) => e.stopPropagation()}>
                    <Sidebar />

                    <div className={`dashboard-content mb-5 ${isOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                        <Outlet />
                        <div className="dashboard-content-body">
                            <DashboardHeader />

                            <div className="dashboard-content-breadcrumbs w-100 h-auto d-block py-3 px-2 position-relative bg-green25 mb-3 rounded">
                                <Breadcrumb />
                            </div>
                            <h1 className="dashboard-content-title mb-0 h3 fw-bold text-capitalize headingFont">Dashboard</h1>
                            


                            {/* <div className="dashboard-message-notification">
                                <ul className="ps-0 mb-0 d-flex justify-content-between align-items-center">
                                    <li>
                                        <h3>{dashboardData.totalReviews}</h3>
                                        <strong>total admin</strong>
                                    </li>

                                    <li>
                                        <h3>{dashboardData.activeListing}</h3>
                                        <strong>news</strong>
                                    </li>

                                    <li>
                                        <h3>{dashboardData.wishlist}</h3>
                                        <strong>reports</strong>
                                    </li>

                                    <li>
                                        <h3>{dashboardData.message}</h3>
                                        <strong>online users</strong>
                                    </li>
                                </ul>
                            </div> */}

                            <div className="dashboard-active-packages">
                                <h5 className="default-font fw-bold mt-5">Active Packages</h5>
                                <hr/>

                                <table className="table table-responsive table-bordered table-striped table-hover">
                                    <thead className="text-capitalize">
                                        <tr>
                                            <th>details</th>
                                            <th>summary</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-capitalize">

                                        <tr>
                                            <td>Package name</td>
                                            <td>basic</td>
                                        </tr>
                                        <tr>
                                            <td>Package price</td>
                                            <td>&#163; 0.00</td>
                                        </tr>
                                        <tr>
                                            <td>purchase date</td>
                                            <td>24 dec 2024</td>
                                        </tr>
                                        <tr>
                                            <td>Expiry date</td>
                                            <td>23 dec 2025</td>
                                        </tr>
                                        <tr>
                                            <td>maximum listing</td>
                                            <td>10</td>
                                        </tr>
                                        <tr>
                                            <td>maximum amenities</td>
                                            <td>10</td>
                                        </tr>
                                        <tr>
                                            <td>maximum photos</td>
                                            <td>10</td>
                                        </tr>
                                        <tr>
                                            <td>maximum videos</td>
                                            <td>10</td>
                                        </tr>
                                        <tr>
                                            <td>feature listing available</td>
                                            <td>yes</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
        </>
    );
}
    

export default Dashboard;