import React from "react";
import '../styles/LoginForm.css';
import { useState } from "react";
import './CloseButton';
import CloseButton from "./CloseButton";

function LoginForm({onClose}) //передаём пропс в качестве параметра
{
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleForm= (e) => {
        e.preventDefault();
        if (!login || !password) {
            setError('Пожалуйста, введите логин и пароль.');
            return;
        }
        setError('');   
        console.log('Вход с:', { login, password });
    };
    return (
        <div className="login-form">
            <CloseButton onClick={onClose} />
            <p>Вход</p>
            <form onSubmit={handleForm}>
                <label htmlFor="login">Введите Ваш логин</label>
                <input
                    type="login"
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
                <button type = "enter"></button>
            </form>
        </div>
    );
};

export default LoginForm;