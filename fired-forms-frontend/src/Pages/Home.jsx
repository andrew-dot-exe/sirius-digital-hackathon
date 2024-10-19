import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie
import LoginButton from '../components/LoginButton';
import LoginForm from '../components/LoginForm';
import UserGreeting from '../components/UserGreeting';
import "../styles/Home.css";
import inRoom from "../routes/inRoom";

function Home() {
    const [isFormVisible, setFormVisible] = useState(false);
    const [isLoginButtonVisible, setLoginButtonVisible] = useState(true);
    const [userFIO, setUserFIO] = useState(null); // State to store user's FIO
    useEffect(() => {
        // Check if authToken exists in cookies
        const token = Cookies.get('authToken');
        const fio = Cookies.get('userFIO'); // Assuming you're storing FIO in cookies
        if (token && fio) {
            setUserFIO(fio); // Set userFIO if already authenticated
            setLoginButtonVisible(false); // Hide login button
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
        setUserFIO(fio); // Update the FIO state upon successful login
        setFormVisible(false); // Close the login form
        setLoginButtonVisible(false); // Hide the login button

        // Store user FIO in cookies for future reference
        Cookies.set('userFIO', fio); // Store the user's FIO in cookies
    };

    const handleLogout = () => {
        setUserFIO(null); // Clear the user's FIO
        Cookies.remove('authToken'); // Clear the authToken cookie
        Cookies.remove('userFIO'); // Clear the userFIO cookie
        setLoginButtonVisible(true); // Show the login button again
    };

    return (
        <div className='App'>
            <div className='home-content'>
                <div className='home-image'></div>
                <div className='home-text'>
                    <h1>Уважаемый сотрудник!</h1>
                    <p>Добро пожаловать на сайт, где Вы можете войти в личный кабинет сотрудника компании.</p>
                    <p>Введите корректный логин и пароль, выданный Вам системным администратором.</p>
                </div>
            </div>
            {isLoginButtonVisible && <LoginButton onClick={ToggleVisibleLoginForm} />}
            {isFormVisible && (
                <LoginForm onClose={CloseLoginForm} onLoginSuccess={handleLoginSuccess} />
            )}
            {userFIO && <UserGreeting userFIO={userFIO} onLogout={handleLogout} />}
            {userFIO && <button onClick={inRoom}/>}
        </div>
    );
}

export default Home;
