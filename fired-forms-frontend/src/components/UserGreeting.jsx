import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserGreeting.css'; // Импорт стилей

const UserGreeting = ({ userFIO, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout(); 
        navigate('/'); 
    };

    return (
        <div className="user-greeting">
            <p className="greeting-message">{userFIO}</p>
            <button className="logout-button" onClick={handleLogout}>Выйти</button> 
        </div>
    );
};

export default UserGreeting;
