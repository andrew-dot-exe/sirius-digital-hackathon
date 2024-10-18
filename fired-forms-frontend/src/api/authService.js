// src/services/authService.js
import Cookies from 'js-cookie';

export async function loginUser(login, password) {
    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password }),
        });

        if (!response.ok) {
            throw new Error('Неверные данные для входа.');
        }

        const data = await response.json();

        if (data.access_token) {
            Cookies.set('authToken', data.access_token, { expires: 0.021, secure: false });
            return data.access_token;
        } else {
            throw new Error('Не удалось получить токен авторизации.');
        }
    } catch (error) {
        throw new Error(error.message || 'Произошла ошибка при авторизации.');
    }
}
