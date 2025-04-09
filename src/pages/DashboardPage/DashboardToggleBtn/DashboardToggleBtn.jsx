import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const DashboardToggleBtn = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <>
            <button className="btn btn-primary toggle-sidebar-btn-dashboard" onClick={toggleSidebar}>
                <FaArrowRight className={`${isSidebarOpen ? "d-none" : "d-block"}`} />
                <FaArrowLeft className={`${isSidebarOpen ? "d-block" : "d-none"}`} />
            </button>
        </>
    )
}

export default DashboardToggleBtn;