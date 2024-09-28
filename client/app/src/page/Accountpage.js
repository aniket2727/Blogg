/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { FaUserCircle, FaSignInAlt, FaUsers } from 'react-icons/fa'; // React icons
import ButtonComponent from '../component/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import LoginDetailsContext from '../contextApis/LoginDetailsContext';
import { Getallpostbyemails } from '../customHook/GetpostByEmailApi';
import Postbyuser from '../component/PostByuser';
import { useSelector } from 'react-redux';
import { selectToken } from '../features/token/tokenSlice'; // Adjust the path accordingly
import { selectuserid } from '../features/userID/userIdSlice';
import { Getfollowerscount } from '../customHook/AddfollowersApi';

const Accountpage = () => {
  const [data, setData] = useState([]);
  const [followersCount, setFollowersCount] = useState(0); // Initialize as a number
  const navigate = useNavigate();
  const { userEmail } = useContext(LoginDetailsContext);
  const token = useSelector(selectToken);
  const userId = useSelector(selectuserid);

  // Fetch all posts by email
  useEffect(() => {
    const fetchPosts = async () => {
      if (userEmail) {
        try {
          const result = await Getallpostbyemails({ email: userEmail });
          console.log("The user post in account page", result);
          setData(result);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    };

    fetchPosts();
    handleFollowersCount();
  }, [userEmail]);

  const handleFollowersCount = async () => {
    if (userId) {
      try {
        const count = await Getfollowerscount({ userid: userId });
        setFollowersCount(count); // Set followers count
      } catch (error) {
        console.error("Error fetching followers count:", error);
        setFollowersCount(0); // Optional: set to 0 on error
      }
    }
  };

  // If user is not logged in
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

  // If user is logged in
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <FaUserCircle className="text-blue-500 text-6xl mb-4" />
        <h1 className="text-3xl font-bold mb-2">Account Page</h1>
        <h2 className="text-xl mb-6">
          Your email: 
          <span className="font-semibold text-blue-600 underline flex items-center">
            <FaUserCircle className="mr-2" /> {/* Profile icon */}
            {userEmail}
          </span>
        </h2>

        <h2 className="text-xl mb-6">
          Followers : 
          <span className="font-semibold text-blue-600">{followersCount}</span>
        </h2>

        <ButtonComponent
          buttonText="Followers"
          className="bg-green-500 text-white px-6 py-2 mb-4 rounded-full hover:bg-green-600 transition duration-300 flex items-center"
          icon={<FaUsers className="mr-2" />}
        />
      </div>
      <Postbyuser data={data} />
    </div>
  );
};

export default Accountpage;
