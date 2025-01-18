import React from "react";
import { Col } from "react-bootstrap";
// import "./Routes/Routes";

const DashNew = () =>{
    return(
        <>
            <div className="dashboard-section w-100 h-auto d-flex bg-white position-relative">
                <Col xxl={3} xl={3} lg={3} md={3} sm={12}>
                    <div className="dashboard-sidebar">
                        <div className="dashboard-user-profile">
                            
                        </div>

                        <div className="dashboard-sidebar-nav">

                        </div>
                    </div>
                </Col>

                <Col xxl={9} xl={9} lg={9} md={9} sm={12}>
                    <h1>this is dash new page</h1>
                </Col>
            </div>
        </>
    )
}

export default DashNew;