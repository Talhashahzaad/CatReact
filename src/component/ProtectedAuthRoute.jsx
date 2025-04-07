import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedAuthRoute = (WrappedComponent) => {
    const ProtectedComponent = (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const token = localStorage.getItem("token");
            if (token) {
                navigate("/dashboard");
            }
        }, [navigate]);

        return <WrappedComponent {...props} />;
    };

    return ProtectedComponent;
};

export default ProtectedAuthRoute; 