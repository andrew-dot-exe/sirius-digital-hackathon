import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LoginButton from '../components/LoginButton';
import LoginForm from '../components/LoginForm';
import UserGreeting from '../components/UserGreeting';
import "../styles/Home.css";
import { useNavigate } from 'react-router-dom';

function Home() {
    const [isFormVisible, setFormVisible] = useState(false);
    const [isLoginButtonVisible, setLoginButtonVisible] = useState(true);
    const [userFIO, setUserFIO] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('authToken');
        const fio = Cookies.get('userFIO');
        if (token && fio) {
            setUserFIO(fio);
            setLoginButtonVisible(false);
        }
    }, []);

    const ToggleVisibleLoginForm = () => {
        setFormVisible(true);
        setLoginButtonVisible(false);
    };

    const CloseLoginForm = () => {
        setFormVisible(false);
        setLoginButtonVisible(true);
    };

    const handleLoginSuccess = (fio) => {
        setUserFIO(fio);
        setFormVisible(false);
        setLoginButtonVisible(false);
        Cookies.set('userFIO', fio);
        navigate('/dashboard'); // Перенаправление на главную страницу после входа
    };

    const handleLogout = () => {
        setUserFIO(null);
        Cookies.remove('authToken');
        Cookies.remove('userFIO');
        setLoginButtonVisible(true);
    };

    return (
        <div className='App'>
            <div className='login-button-container'>
                {isLoginButtonVisible && <LoginButton onClick={ToggleVisibleLoginForm} />}
            </div>
            <div className='home-content'>
                <div className='home-image'></div>
                <div className='home-text'>
                    <h1>Уважаемый сотрудник!</h1>
                    <p>Добро пожаловать на сайт, где Вы можете войти в личный кабинет сотрудника компании.</p>
                    <p>Введите корректный логин и пароль, выданный Вам системным администратором.</p>
                </div>
            </div>
            {isFormVisible && (
                <LoginForm onClose={CloseLoginForm} onLoginSuccess={handleLoginSuccess} />
            )}
            {userFIO && <UserGreeting userFIO={userFIO} onLogout={handleLogout} />}
        </div>
    );
}

export default Home;
