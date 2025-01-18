import React from "react";
import { useParams } from "react-router-dom";

function SidebarDashNew(){

    const params = useParams();
    

    return(
        <>
            <Link to="/">dashboard</Link>
            <Link to="/">All Listing</Link>
            <Link to="/">Amenity</Link>
            <Link to="/">Location</Link>
            <Link to="/">Practitioner Qualification</Link>
            <Link to="/">Tags</Link>
            <Link to="/">Treatment Categories</Link>
            <Link to="/">Treatment Packages</Link>
            <Link to="/">Treatment</Link>
        </>
    )
}

export default SidebarDashNew;