import { useState } from 'react'
import LoginButton from '../components/LoginButton';
import LoginForm  from '../components/LoginForm';
import "../styles/Home.css"

function Home() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [isLoginButtonVisible, setLoginButtonVisible] = useState(true);

  const ToggleVisibleLoginForm = () => {
      setFormVisible(true);
      setLoginButtonVisible(false);
  };

  const CloseLoginForm = () => {
      setFormVisible(false);
      setLoginButtonVisible(true);
  };

  return (
    <div className='App'>
        <div className='home-content'>
          <div className='home-image'></div>
          <div className='home-text'>
            <h1>Уважаемый сотрудник!</h1>
            <p>Добро пожаловать на сайт, где Вы можете войти в линчый кабинет сотрудника компании.</p>
            <p>Введите корректный логин и пароль, выданный Вам системным администратором.</p>
          </div>
        </div>
        {isLoginButtonVisible && <LoginButton onClick={ToggleVisibleLoginForm} />}
        {isFormVisible && <LoginForm onClose={CloseLoginForm} />}
    </div>
  )
}

export default Home;