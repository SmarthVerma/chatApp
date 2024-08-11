import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.user.authStatus);

    useEffect(() => {
       
        if (authentication && !authStatus) {
            // User is not authenticated and authentication is required
            // console.log('worked auth to login')
            navigate("/login");
        } else if (!authentication && authStatus) {
            // User is authenticated but authentication is not required
            navigate("/");
        }
    }, [authStatus, navigate, authentication]);

    return (
        <>
            {children}
        </>
    );
}