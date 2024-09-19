import React, { useEffect, useState } from 'react';
import ButtonComponent from '../component/ButtonComponent';
import { useNavigate } from 'react-router-dom';

const Accountpage = () => {  
  const [token, setToken] = useState(false);
  
  // Navigator
  const navigate = useNavigate();

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
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
      <h1 className="text-4xl font-bold mb-4 text-green-500">Account Page</h1>
    </div>
  );
}

export default Accountpage;
