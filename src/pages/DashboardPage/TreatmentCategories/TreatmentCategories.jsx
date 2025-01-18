import { React } from "react";
import {Container} from 'react-bootstrap';
import Sidebar from "../Sidebar/Sidebar";

const TreatmentCategories = () => {
    return (
        <>
            <Container fluid>
                <div className="dashboard-page-section w-100 h-auto d-flex justify-content-between align-items-start my-3" onClick={(e) => e.stopPropagation()}>
                    <Sidebar />

                    <div className="dashboard-content">
                        <div className="dashboard-content-body">
                            <h1>this is treatment categories page</h1>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default TreatmentCategories;