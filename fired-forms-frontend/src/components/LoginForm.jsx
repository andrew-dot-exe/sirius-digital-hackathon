// Update the LoginForm.js as follows
import React, { useState } from "react";
import '../styles/LoginForm.css';
import CloseButton from "./CloseButton";
import { loginUser } from '../api/authService';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import Cookies from 'js-cookie';

function LoginForm({ onClose, onLoginSuccess }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault();
        if (!login || !password) {
            setError('Пожалуйста, введите логин и пароль.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const token = await loginUser(login, password);
            const decodedToken = jwtDecode(token);
            const userLevel = decodedToken.userLevel;
            const userFIO = decodedToken.username; // Assuming FIO is included in the token
            
            Cookies.set('authToken', token); // Store the token in cookies
            Cookies.set('userFIO', userFIO); // Store the user's FIO in cookies

            onLoginSuccess(userFIO); // Call the onLoginSuccess prop to update the userFIO in Home

            if (userLevel === "manager") {
                navigate('/report');
            } 
            // else {
            //     console.log("another logging");
            // }
            if (userLevel === "hr"){
                navigate('/hr');
            }
            if (userLevel === "default"){
                navigate('default');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-form">
            <CloseButton onClick={onClose} />
            <p>Вход</p>
            <form onSubmit={handleForm}>
                <label htmlFor="login">Введите Ваш логин</label>
                <input
                    type="text"
                    id="login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                />
                <label htmlFor="password">Введите Ваш пароль</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Загрузка...' : 'Отправить'}
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
