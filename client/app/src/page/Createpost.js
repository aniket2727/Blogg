import React, { useState, useEffect, useContext } from 'react';
import ButtonComponent from '../component/ButtonComponent';
import Savedpostwithemail from '../customHook/SavepostApi';
import LoginDetailsContext from '../contextApis/LoginDetailsContext';



const Createpost = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [postContext, setPostContext] = useState('');
  const [getToken, setGetToken] = useState(null);

  // Use context to get email from LoginDetailsContext
  const { userEmail } = useContext(LoginDetailsContext);

  // Fetch token from localStorage and set login status
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token status:", token);

    if (token && token !== 'null') {
      setGetToken(token);
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, []);

  const handleSubmit = async () => {
    // Validate post content
    if (!postContext) {
      alert("Post content cannot be empty");
      return;
    }

    // Ensure user is authenticated
    if (!userEmail || !getToken) {
      console.log("User email:", userEmail);
      alert("User is not authenticated");
      return;
    }

    // API call to save the post
    try {
      const result = await Savedpostwithemail({
        email: userEmail,
        postContent: postContext,
        token: getToken,
      });
      console.log("Result of saved post:", result);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  // If the user is not logged in, show login prompt
  if (!loginStatus) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Please log in first</h1>
        <ButtonComponent 
          buttonText="Login" 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" 
        />
      </div>
    );
  }

  // If logged in, render the post creation form
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Create a Post</h1>
        <textarea
          placeholder="Write your post here..."
          value={postContext}
          onChange={(e) => setPostContext(e.target.value)}
          className="w-full h-40 p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <ButtonComponent
          buttonText="Add Post"
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        />
      </div>
    </div>
  );
};

export default Createpost;