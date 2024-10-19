import React from "react";
import '../styles/LoginButton.css';

const LoginButton = ({ onClick }) => {
    return (
        <button className="login-button" onClick={onClick}>
            Войти
        </button>
    );
};

export default LoginButton;
