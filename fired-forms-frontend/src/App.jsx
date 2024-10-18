import { useState } from 'react';
import './App.css';
import LoginButton from './components/LoginButton';
import LoginForm from './components/LoginForm';

function App() {
    const [isFormVisible, setFormVisible] = useState(false);
    const [isLoginButtonVisible, setLoginButtonVisible] = useState(true);

    const ToggleVisibleLoginForm = () => {
        setFormVisible(true); // Показываем форму
        setLoginButtonVisible(false); // Скрываем кнопку "Войти"
    };

    const CloseLoginForm = () => {
        setFormVisible(false); // Скрываем форму
        setLoginButtonVisible(true); // Показываем кнопку "Войти"
    };

    return (
        <div className='App'>
            {isLoginButtonVisible && <LoginButton onClick={ToggleVisibleLoginForm} />} {/* Кнопка "Войти" */}
            {isFormVisible && <LoginForm onClose={CloseLoginForm} />} {/* Форма входа */}
        </div>
    );
}

export default App;
