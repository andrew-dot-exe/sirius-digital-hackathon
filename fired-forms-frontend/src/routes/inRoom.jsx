// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";// Import the Unauthorized component

function inRoom() {
    const token = Cookies.get('authToken');
    if (!token) {
        return <Navigate to="/" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const userLevel = decodedToken.userLevel;

        switch(userLevel){
            case "manager":
                return <Navigate to="/report"/>;
            case "hr":
                return <Navigate to="/hr"/>;
            case "default":
                return <Navigate to="/default"/>;
            default:
                return <Navigate to="/"/>;
        }
    } catch (error) {
        return <Navigate to="/" />;
    }
}

export default inRoom;
