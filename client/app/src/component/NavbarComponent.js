/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import ButtonComponent from './ButtonComponent';
import debounce from 'lodash/debounce';
import LoginDetailsContext from '../contextApis/LoginDetailsContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken  } from '../features/token/tokenSlice'; // Adjust the path accordingly
import { clearUserId } from '../features/userID/userIdSlice'; // Adjust the path accordingly
import { selectToken } from '../features/token/tokenSlice';
import { selectuserid } from '../features/userID/userIdSlice';

const NavbarComponent = () => {
  // Use context APIs
  const { setUserEmail } = useContext(LoginDetailsContext);

  // Redux hooks
  const dispatch = useDispatch();
 

  // Get token and userId from Redux state
  const token = useSelector(selectToken); // Fetch token from Redux
  const userId = useSelector(selectuserid); // Fetch userId from Redux
 
  console.log("navbar token",token);
  console.log("navbar userid",userId)

  // Use navigate and location
  const navigate = useNavigate();
  const location = useLocation();

  // Local state for login status
  const [loginStatus, setLoginStatus] = useState(false);

  // Debounced navigation handler
  const handleButtonClick = debounce((action) => {
    console.log("Button was clicked");

    if (action === 'login') {
      navigate('/login');
    } else if (action === 'register') {
      navigate('/signup');
    } else if (action === 'logout') {
      // Clear user data on logout
      setUserEmail(''); // Clear user email in context
      dispatch(clearUserId()); // Clear user ID in Redux
      dispatch(clearToken()); // Clear token in Redux
      localStorage.removeItem('token'); // Clear token from local storage
      setLoginStatus(false); // Clear local login status
      console.log('Logged out');
    } else if (action === 'home') {
      navigate('/home');
    }
  }, 300);

  // Update login status based on the presence of userId and token
  useEffect(() => {
    // Set login status based on the presence of userId and token
    if (userId && token) {
      setLoginStatus(true); // Set login status if logged in
    } else {
      setLoginStatus(false); // Clear login status if logged out
    }
  }, [userId, token]);

  // Check if current route is not home
  const isNotHome = location.pathname !== '/home';

  return (
    <div className="bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-3xl font-bold">Corporate Katta</h1>
      </div>

      <div className="p-4 flex items-center space-x-4">
        {/* Show "Home" button if not on home page */}
        {isNotHome && (
          <ButtonComponent
            buttonText="Home"
            backgroundColorprop="bg-blue-500"
            onClick={() => handleButtonClick('home')}
          />
        )}

        {/* Show Login and Register buttons when not logged in */}
        {!loginStatus && (
          <>
            <ButtonComponent
              buttonText="Login"
              backgroundColorprop="bg-red-500"
              onClick={() => handleButtonClick('login')}
            />
            <ButtonComponent
              buttonText="Register"
              backgroundColorprop="bg-red-500"
              onClick={() => handleButtonClick('register')}
            />
          </>
        )}

        {/* Show Logout button when logged in */}
        {loginStatus && (
          <ButtonComponent
            buttonText="Logout"
            backgroundColorprop="bg-red-500"
            onClick={() => handleButtonClick('logout')}
          />
        )}
      </div>
    </div>
  );
};

export default NavbarComponent;
