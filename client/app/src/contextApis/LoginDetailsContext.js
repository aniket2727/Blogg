import React, { useState, createContext } from 'react';

// Create the context
export const Contextprovider = createContext();

const LoginDetailsContext = ({ children }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');

  return (
    <Contextprovider.Provider value={{ userEmail, setUserEmail, userId, setUserId }}>
      {children}
    </Contextprovider.Provider>
  );
};

export default LoginDetailsContext;
