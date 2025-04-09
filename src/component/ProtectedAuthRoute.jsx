import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedAuthRoute = (WrappedComponent) => { 
    const ProtectedComponent = (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const token = localStorage.getItem("token") || JSON.parse(localStorage.getItem("token"));
            const role = localStorage.getItem("role") || JSON.parse(localStorage.getItem("role"));
            if (token) {
                navigate("/dashboard");
            }
        }, [navigate]);

        return <WrappedComponent {...props} />;
    };

    return ProtectedComponent;
};

export default ProtectedAuthRoute; 