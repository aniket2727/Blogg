




// src/components/EmailManager.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, clearEmail } from '../features/email/emailSlice';

const EmailManager = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.email.email);

  const handleSetEmail = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const handleClearEmail = () => {
    dispatch(clearEmail());
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100">
      <h2 className="text-xl font-semibold mb-4">Email Manager</h2>
      <input
        type="email"
        value={email}
        onChange={handleSetEmail}
        className="mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your email"
      />
      <button
        onClick={handleClearEmail}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Clear Email
      </button>
      <p className="mt-4">Current Email: {email}</p>
    </div>
  );
};

export default EmailManager;
