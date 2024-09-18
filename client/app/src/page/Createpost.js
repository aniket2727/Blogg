import React, { useState, useEffect } from 'react';
import ButtonComponent from '../component/ButtonComponent';

const Createpost = () => {
  const [loginstatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const getToken = localStorage.getItem('token');
    console.log("Token status:", getToken);

    // Check if token exists and is not 'null'
    if (getToken && getToken !== 'null') {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, []);

  console.log("Current login status:", loginstatus);

  if (!loginstatus) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Please log in first</h1>
        <ButtonComponent buttonText='Login' className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Create a Post</h1>
        <textarea 
          placeholder='Write your post here...' 
          className='w-full h-40 p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        ></textarea>
        <ButtonComponent 
          buttonText='Add Post' 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        />
      </div>
    </div>
  );
};

export default Createpost;
