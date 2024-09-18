import { createContext, useState } from 'react';

const LoginDetailsContext = createContext();

export const LoginDetailsProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');

  return (
    <LoginDetailsContext.Provider value={{ userEmail, setUserEmail, userId, setUserId }}>
      {children}
    </LoginDetailsContext.Provider>
  );
};

export default LoginDetailsContext;
