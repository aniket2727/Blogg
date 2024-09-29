/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { FaUserCircle, FaSignInAlt} from 'react-icons/fa';
import ButtonComponent from '../component/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import LoginDetailsContext from '../contextApis/LoginDetailsContext';
import { Getallpostbyemails } from '../customHook/GetpostByEmailApi';
import Postbyuser from '../component/PostByuser';
import { useSelector } from 'react-redux';
import { selectToken } from '../features/token/tokenSlice';
import { selectuserid } from '../features/userID/userIdSlice';
import usePostCount from '../customHook/GetPostCountApi';
import useFollowingCount from '../customHook/GetfollowingcountApi';
import { Getfollowerscount } from '../customHook/AddfollowersApi';

const Accountpage = () => {
  const [data, setData] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const navigate = useNavigate();
  const { userEmail } = useContext(LoginDetailsContext);
  const token = useSelector(selectToken);
  const userId = useSelector(selectuserid);

  // Use the custom hooks at the top level
  const postcount = usePostCount(userId);  // Call usePostCount here
  const followingcount = useFollowingCount(userId);  // Call useFollowingCount here

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
            <FaUserCircle className="mr-2" />
            {userEmail}
          </span>
        </h2>

        <h2 className="text-xl mb-6">
          Followers:
          <span className="font-semibold text-blue-600">{followersCount}</span>
        </h2>
        <h2 className="text-xl mb-6">
          Following:
          <span className="font-semibold text-blue-600">{followingcount}</span>
        </h2>
        <h2 className="text-xl mb-6">
          Posts:
          <span className="font-semibold text-blue-600">{postcount}</span>
        </h2>

      
      </div>
      <Postbyuser data={data} />
    </div>
  );
};

export default Accountpage;
