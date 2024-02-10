import React, { useState } from 'react';
import './css/AdminLogin.css';
import { loginUser, logoutUser } from '../service/api1'; // Assuming loginUser function is correctly implemented in api1.js
import SearchJob from './Jobi'; // Assuming SearchJob component is correctly implemented
import { NavLink } from 'react-router-dom';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await loginUser({ uname: username, adate: password });
      if (response.status === 200) {
        setError('');
        setIsLoggedIn(true);
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  if (isLoggedIn) {
    return (
      <div>
        <SearchJob />
        <button style={{marginLeft:'1400px',paddigTop:'-40px',display:'block',backgroundColor:'white',color:'wheat'}} onClick={handleLogout}>Logout</button>
        
      </div>
    );
  }

  return (
    <>
    <div className='ll' style={{backgroundColor:'aqua',height:'800px',width:'100%'}}>
    <div className="login-container">
      <h2 className="login-header">
      User Login</h2>
      <div className="input-container">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      </div>
      <div className="input-container">
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>
      <button className="login-button" onClick={handleLogin}>Login</button>
      {error && <div>{error}</div>}
      Don't have an account?
      <NavLink to="/Form1">create one</NavLink>
    </div>
    </div>
    </>
  );
};

export default UserLogin;
