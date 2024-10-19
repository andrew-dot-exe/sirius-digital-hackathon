// src/components/UserGreeting.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserGreeting = ({ userFIO, onLogout }) => {
    
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout(); 
        navigate('/'); 
    };

    return (
        <div className="user-greeting">
            <p>{userFIO}</p>
            <button onClick={handleLogout}>Выйти</button> 
        </div>
    );
};

export default UserGreeting;
