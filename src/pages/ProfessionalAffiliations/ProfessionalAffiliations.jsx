import {React} from "react";
import {Link} from 'react-router-dom';


const ProfessionalAffiliations = () =>{

    return(
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="fw-normal">Professional Affiliations Certificates</h4>
                <Link to="/treatmentCategories" className="createButtonDash">+ create</Link>
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
                            <th>name</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
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
        </>
    );
}

export default ProfessionalAffiliations;