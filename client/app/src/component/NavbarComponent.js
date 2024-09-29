/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import { IconButton, Avatar } from '@mui/material';
import { blue } from '@mui/material/colors';
import { FaUserCircle } from 'react-icons/fa'; // Import the user icon from react-icons

import ButtonComponent from './ButtonComponent'; // Custom Button Component
import ProfileDialog from '../helper/NavbarHelperforProfileShow'; // ProfileDialog for user info
import LoginDetailsContext from '../contextApis/LoginDetailsContext'; // Context for login details
import { clearToken, selectToken } from '../features/token/tokenSlice'; // Redux slice for token
import { clearUserId, selectuserid } from '../features/userID/userIdSlice'; // Redux slice for userId

const NavbarComponent = () => {
  // Context API hooks
  const {userEmail, setUserEmail } = useContext(LoginDetailsContext);

  // Redux hooks
  const dispatch = useDispatch();
  const token = useSelector(selectToken); // Fetch token from Redux
  const userId = useSelector(selectuserid); // Fetch userId from Redux

  // Router hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Local state for dialog and login status
  const [open, setOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  // Example user data (can be passed as props if needed)
  const userInfo = {
    email: userEmail,
    followers: 120,
    postCount: 45,
  };

  // Handle profile dialog open/close
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Debounced button click handler for navigation and actions
  const handleButtonClick = debounce((action) => {
    if (action === 'login') {
      navigate('/login');
    } else if (action === 'register') {
      navigate('/signup');
    } else if (action === 'logout') {
      setUserEmail(''); // Clear context email
      dispatch(clearUserId()); // Clear user ID in Redux
      dispatch(clearToken()); // Clear token in Redux
      localStorage.removeItem('token'); // Clear token from local storage
      setLoginStatus(false); // Update login status
    } else if (action === 'home') {
      navigate('/home');
    }
  }, 300);

  // Update login status based on token and userId from Redux
  useEffect(() => {
    if (userId && token) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, [userId, token]);

  // Determine if current route is not home
  const isNotHome = location.pathname !== '/home';

  return (
    <div className="bg-gray-800 text-white">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Corporate Katta</h1>

        {/* Profile Icon and Dialog */}
        <IconButton onClick={handleClickOpen}>
          <FaUserCircle size={30} color="white" /> {/* Icon with customizable size and color */}
        </IconButton>
        <ProfileDialog open={open} onClose={handleClose} userInfo={userInfo} />
      </div>

      <div className="p-4 flex items-center space-x-4">
        {/* Home Button */}
        {isNotHome && (
          <ButtonComponent
            buttonText="Home"
            backgroundColorprop="bg-blue-500"
            onClick={() => handleButtonClick('home')}
          />
        )}

        {/* Conditional Rendering: Login/Register or Logout */}
        {!loginStatus ? (
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
        ) : (
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
