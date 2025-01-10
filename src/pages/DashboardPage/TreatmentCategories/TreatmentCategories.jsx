import {React, useState} from "react";
import {Link} from 'react-router-dom';
// import TableHead_TreatmentCategories from "./TableHead_TreatmentCategories.jsx";
// import TableBody_TreatmentCategories from "./TableBody_TreatmentCategories.jsx";
import "./TreatmentCategories.css";
import "../Dashboard.css";


const TreatmentCategories = () =>{

    // const [tableData, setTableData] = useState(0);
    
    // const columns = [
    //     { label: "id", accessor: "id" },
    //     { label: "icon", accessor: "icon" },
    //     { label: "background", accessor: "background" },
    //     { label: "name", accessor: "name" },
    //     { label: "parent category", accessor: "parent_category" },
    //     { label: "show at home", accessor: "show_at_home" },
    //     { label: "status", accessor: "status" },
    //     { label: "action", accessor: "action" },
    // ];

    return(
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="fw-normal">All Treatment Categories</h4>
                <Link to="/treatmentCategories" className="createButtonDash dash-treatmentCategories">+ create</Link>
            </div>
            <hr/>

            <div className="filter-and-search-dash d-flex w-100 h-auto justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                    <dd>show</dd>
                    <dd>
                        <select>
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                    </dd>
                    <dd>enteries</dd>
                </div>

                <div className="d-flex align-items-center">
                    <dd>search:</dd>
                    <dd>
                        <input type="search" />
                    </dd>
                </div>
            </div>


            <div className="treatmentCategories-Table-Dash">
                <table className="table table-responsive table-bordered">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>icon</th>
                            <th>background</th>
                            <th>name</th>
                            <th>parent category</th>
                            <th>show at home</th>
                            <th>status</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
                <small className="w-100 h-auto text-center d-block">No data available in table</small>
                <hr/>
                <small className="w-100 h-auto text-start d-block">Showing 0 to 0 of 0 entries</small>
            </div>




            <div className="create-treatment-categories-form">
                <h5>Create Treatment Category</h5>
                <hr/>

                <div className="create-treatment-category-picture">
                    <figure>
                        <img src="" alt="" className="picture-uploaded-treatmentCategory" />
                        <input type="file" className="picture-uploaded-treatmentCategory-btn" />
                    </figure>
                    

                </div>
            </div>
        </>
    );
}

export default TreatmentCategories;