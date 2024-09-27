/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector to access Redux state
import ButtonComponent from '../component/ButtonComponent';
import Savedpostwithemail from '../customHook/SavepostApi';
import LoginDetailsContext from '../contextApis/LoginDetailsContext';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { selectToken } from '../features/token/tokenSlice'; // Selector to get token
import { selectuserid } from '../features/userID/userIdSlice'; // Selector to get userId

const Createpost = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [postContext, setPostContext] = useState('');
  const [alertMessage, setAlertMessage] = useState(''); // State to store alert messages
  const [alertSeverity, setAlertSeverity] = useState('error'); // State to manage alert type

  // Get token and userId from Redux state
  const token = useSelector(selectToken); // Fetch token from Redux
  const userId = useSelector(selectuserid); // Fetch userId from Redux

  console.log("user id ",userId);

  console.log("the value of redux token is ",token);

  // Use context to get email from LoginDetailsContext
  const { userEmail } = useContext(LoginDetailsContext);

  // Set login status based on token availability in Redux
  useEffect(() => {
    console.log("Redux Token status:", token);

    if (token && token !== 'null') {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, [token]); // Re-run effect whenever token changes

  const handleSubmit = async () => {
    // Validate post content
    if (!postContext) {
      setAlertMessage("Please provide post content");
      setAlertSeverity("error");
      return;
    }

    // Ensure user is authenticated
    if (!userEmail || !token) {
      console.log("User email:", userEmail);
      setAlertMessage("Please log in");
      setAlertSeverity("error");
      return;
    }

    // API call to save the post
    try {
      const result = await Savedpostwithemail({
        email: userEmail,
        postContent: postContext,
        postcreaterId:userId,
        token: token, // Use token from Redux
      });
      console.log("Result of saved post:", result);

      // Clear the post content and show success alert
      setPostContext('');
      setAlertMessage("Post saved successfully");
      setAlertSeverity("success");
    } catch (error) {
      console.error("Error saving post:", error);
      setAlertMessage("Error saving post");
      setAlertSeverity("error");
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

        {alertMessage && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity={alertSeverity}>{alertMessage}</Alert>
          </Stack>
        )}

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
