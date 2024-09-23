import React, { useEffect, useState, useContext } from 'react';
import { FaUserCircle, FaSignInAlt, FaUsers } from 'react-icons/fa'; // React icons
import ButtonComponent from '../component/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import LoginDetailsContext from '../contextApis/LoginDetailsContext';

const Accountpage = () => {  
  const [token, setToken] = useState(false);
  
  // Navigator
  const navigate = useNavigate();

  // Context API
  const { userEmail } = useContext(LoginDetailsContext);

  useEffect(() => {
    const localstoreResult = localStorage.getItem('token');
    if (!localstoreResult || localstoreResult === 'null') {
      setToken(false);
    } else {
      setToken(true);
    }
  }, []);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <FaSignInAlt className="text-red-500 text-6xl mb-4" />
        <h1 className="text-3xl font-bold mb-4 text-red-500">Please Log In First</h1>
        <ButtonComponent 
          buttonText="Login" 
          onClick={() => navigate('/login')} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <FaUserCircle className="text-blue-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold mb-2">Account Page</h1>
      <h2 className="text-xl mb-6">Your email: <span className="font-semibold text-blue-600">{userEmail}</span></h2>

      <ButtonComponent 
        buttonText="Followers" 
        className="bg-green-500 text-white px-6 py-2 mb-4 rounded-full hover:bg-green-600 transition duration-300 flex items-center"
        icon={<FaUsers className="mr-2" />} // Add an icon to the button
      />

      {/* Post section component can be added here */}
      {/* <PostSectionComponent /> */}

    </div>
  );
}

export default Accountpage;
