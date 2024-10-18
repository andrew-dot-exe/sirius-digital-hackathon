import { useState } from 'react'
import LoginButton from '../components/LoginButton';
import LoginForm  from '../components/LoginForm';

function Home() {

  const [isFormVisible, setFormVisible] = useState(false);

  const ShowLoginForm = () => {
    setFormVisible(true);
  };

  return (
    <div>
      <LoginButton onClick = {ShowLoginForm} />
      {isFormVisible && <LoginForm />}
    </div>
  )
}

export default Home;