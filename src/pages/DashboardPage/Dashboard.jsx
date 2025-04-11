import { React, useState, useEffect } from "react";
import {Container, Row} from 'react-bootstrap';
import { Outlet } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import axios from "axios";
import "./Dashboard.css";
import "../../App.css";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import Sidebar from "./Sidebar/Sidebar";
import { $siteURL } from "../../common/SiteURL";


const Dashboard = () =>{
    const checkToken = async () => {
        const token = localStorage.getItem("token");
        if(!token){
            localStorage.removeItem("token");
            navigate("/login");
        } else{
            const response = await axios.get(`${$siteURL}/api/login`, {
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
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const [dashboardData, setDashboardData] = useState(null);

    const convertToYesNo = (value) => {
        return String(value) === '1' ? 'Yes' : 'No';
    }; 

    const convertToListingData = (value) => {
        return String(value) === '10' ? 'Unlimited' : String(value);
    }; 

    

    const fetchDashboardData = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${$siteURL}/api/listing-packages`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        if(Array.isArray(response.data) && response.data.length > 0){
            setDashboardData(response.data);
        }
    }

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return(
        <>
        <Container fluid className="dashboard-page-main">
            <Row>
                    <div className={`dashboard-page-section w-100 h-auto d-flex justify-content-between align-items-start ${isSidebarOpen ? "sidebar-open" : "sidebar-close"}`} 
                    onClick={(e) => e.stopPropagation()}>

                    <Sidebar />

                    <div className="dashboard-content mb-5">
                        
                        <button className="btn btn-primary toggle-sidebar-btn-dashboard" onClick={toggleSidebar}>
                            <FaArrowRight className={`${isSidebarOpen ? "d-none" : "d-block"}`} />
                            <FaArrowLeft className={`${isSidebarOpen ? "d-block" : "d-none"}`} />
                        </button>

                        <Outlet />
                        <div className="dashboard-content-body">
                            <DashboardHeader />

                            <div className="dashboard-content-breadcrumbs w-100 h-auto d-block py-3 px-2 position-relative bg-green25 mb-3 rounded">
                                <Breadcrumb />
                            </div>
                            <h1 className="dashboard-content-title mb-0 h3 fw-bold text-capitalize headingFont">Dashboard</h1>
                            
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
                                    {dashboardData && dashboardData.length > 0 && (
                                        <tbody className="text-capitalize">
                                            <tr>
                                                <td>Package name</td>
                                                <td>{dashboardData[0].name}</td>
                                            </tr>
                                            <tr>
                                                <td>Package price</td>
                                                <td>&#163; {dashboardData[0].price}</td>
                                            </tr>
                                            <tr>
                                                <td>number of listing</td>
                                                <td>{convertToListingData(dashboardData[0].num_of_listing)}</td>
                                            </tr>
                                            <tr>
                                                <td>plan active for</td>
                                                <td>{dashboardData[0].number_of_days} days</td>
                                            </tr>
                                            
                                            <tr>
                                                <td>ecommerce</td>
                                                <td>{convertToYesNo(dashboardData[0].cat_ecommarce)}</td>
                                            </tr>
                                            <tr>
                                                <td>status</td>
                                                <td>{convertToYesNo(dashboardData[0].status)}</td>
                                            </tr>
                                            <tr>
                                                <td>pro social media</td>
                                                <td>{convertToYesNo(dashboardData[0].cat_pro_social_media)}</td>
                                            </tr>
                                            <tr>
                                                <td>featured listing</td>
                                                <td>{convertToYesNo(dashboardData[0].featured_listing)}</td>
                                            </tr>
                                            <tr>
                                                <td>live chat</td>
                                                <td>{convertToYesNo(dashboardData[0].live_chat)}</td>
                                            </tr>
                                            <tr>
                                                <td>multiple locations</td>
                                                <td>{convertToYesNo(dashboardData[0].multiple_locations)}</td>
                                            </tr>
                                        </tbody>
                                    )}
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