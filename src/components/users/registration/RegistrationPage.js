import { Link } from 'react-router-dom';
import { useState } from 'react';
import UserForm from './UserForm';
import userBlankData from '../utils/userHelpers';
import client from '../../../utils/client';
import './style.css';
import { Alert } from '@mui/material';

const RegistrationPage = () => {
  const [user, setUser] = useState(userBlankData());
  const [registerResponse, setRegisterResponse] = useState('');
  const [emailError, setEmailError] = useState(false);

  const registerUser = event => {
    event.preventDefault();
    client
      .post('/user', user, false)
      .then(res => setRegisterResponse(res.data))

      .catch(err => {
        console.log(err.response);
        setEmailError(true);
        setTimeout(() => {
          setEmailError(false);
        }, '3000');
      });
  };

  const handleChange = event => {
    event.preventDefault();
    const { value, name } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="registration-page">
      <Link id="user-registration-link" to="/signup">
        sign up
      </Link>{' '}
      <Link id="user-login-link" to="/">
        login
      </Link>
      <h1>Sign up</h1>
      {emailError && (
        <Alert severity="error">
          An account has already been registered with this email
        </Alert>
      )}
      <p>Status: {registerResponse.status}</p>
      <UserForm handleChange={handleChange} handleSubmit={registerUser} />
    </div>
  );
};

export default RegistrationPage;
