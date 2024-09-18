/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useCallback } from 'react';
import ButtonComponent from './ButtonComponent';
import debounce from 'lodash/debounce';
import LoginDetailsContext from '../contextApis/LoginDetailsContext';

const NavbarComponent = () => {
  // Use context APIs
  const { userEmail, setUserEmail, userId, setUserId } = useContext(LoginDetailsContext);

  // Local state for login status
  const [loginstatus, setLoginStatus] = useState('');

  // Debounced function for handling button click
  const handleButtonClick = useCallback(
    debounce(() => {
      console.log("Button was clicked");
    }, 300),
    []
  );

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
            <ButtonComponent buttonText="Login" backgroundColorprop="bg-red-500" onClick={handleButtonClick} />
            <ButtonComponent buttonText="Register" backgroundColorprop="bg-red-500" onClick={handleButtonClick} />
          </>
        )}

        {/* Show Logout button when logged in */}
        {loginstatus && (
          <ButtonComponent buttonText="Logout" backgroundColorprop="bg-red-500" onClick={handleButtonClick} />
        )}
      </div>
    </div>
  );
};

export default NavbarComponent;
