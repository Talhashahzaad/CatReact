import { React, useState } from "react";
import {Container} from 'react-bootstrap';
//import { Outlet } from "react-router-dom";
import Breadcrumb from "./Breadcrumb/Breadcrumb";

import "./Dashboard.css";
import "../../App.css";
import Sidebar from "./Sidebar/Sidebar";


const Dashboard = () =>{
    const [dashboardData, setDashboardData] = useState({
        totalReviews: 100,
        activeListing: 10,
        wishlist: 5,
        message: 20
    });
    
    return(
        <>
        <Container className="dashboard-page-main">
            <div className="dashboard-page-section w-100 h-auto d-flex justify-content-between align-items-start py-5" onClick={(e) => e.stopPropagation()}>
                <Sidebar />

                <div className="dashboard-content">
                    {/* <Outlet /> */}
                    <div className="dashboard-content-body">
                        <div className="dashboard-content-breadcrumbs w-100 h-auto d-block py-3 px-2 position-relative bg-jetGreen mb-3 rounded">
                            <Breadcrumb />
                        </div>
                        <h1 className="dashboard-content-title mb-3 h3 default-font">Dashboard</h1>
                        <hr />


                        <div className="dashboard-message-notification">
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
                        </div>

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
        </Container>
        </>
    );
}
    

export default Dashboard;