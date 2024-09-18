/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import ButtonComponent from './ButtonComponent';
import debounce from 'lodash/debounce';
import LoginDetailsContext from '../contextApis/LoginDetailsContext';
import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
  // Use context APIs
  const { userEmail, setUserEmail, userId, setUserId } = useContext(LoginDetailsContext);

  // Use navigate
  const navigate = useNavigate();

  // Local state for login status
  const [loginstatus, setLoginStatus] = useState('');

  // Debounced navigation handler
  const handleButtonClick = debounce((action) => {
    console.log("Button was clicked");
    
    if (action === 'login') {
      navigate('/login');
    } else if (action === 'register') {
      navigate('/signup');
    } else if (action === 'logout') {
      setUserEmail(''); // Clear user data on logout
      setUserId('');
      setLoginStatus(''); // Clear local login status
      console.log('Logged out');
    }
  }, 300);

  // Update login status based on userId in context
  useEffect(() => {
    if (userId) {
      setLoginStatus(userId); // Set login status if logged in
    } else {
      setLoginStatus(''); // Clear login status if logged out
    }
  }, [userId]);

  return (
    <div className="bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-3xl font-bold">Corporate Katta</h1>
      </div>

      <div className="p-4 flex items-center space-x-4">
        {/* Show Login and Register buttons when not logged in */}
        {!loginstatus && (
          <>
            <ButtonComponent buttonText="Login" backgroundColorprop="bg-red-500" onClick={() => handleButtonClick('login')} />
            <ButtonComponent buttonText="Register" backgroundColorprop="bg-red-500" onClick={() => handleButtonClick('register')} />
          </>
        )}

        {/* Show Logout button when logged in */}
        {loginstatus && (
          <ButtonComponent buttonText="Logout" backgroundColorprop="bg-red-500" onClick={() => handleButtonClick('logout')} />
        )}
      </div>
    </div>
  );
};

export default NavbarComponent;
