import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import debounce from 'lodash/debounce';
import Loginapis from '../customHook/LoginApi';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';

const MyLoginform = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const navigate = useNavigate();

  // Debounced function for form submission
  const handleLoginSubmit = useCallback(debounce(async (data) => {
    console.log(data);
    setLoading(true);
    setError(false);
    setStatus("");
    setShowAlert(false);
    setShowLoader(true);

    try {
      const result = await Loginapis({ email: data.email, password: data.password });
      console.log("The result of login API is:", result);
      if (result.token) {
        localStorage.setItem('token', result.token);
      }
      setStatus("Login successful");
      setShowAlert(true);
      reset(); // Clear form fields after successful login

      // Redirect after showing loader and alert
      setTimeout(() => {
        setShowLoader(false);
        setShowAlert(false);
        navigate('/home'); // Redirect to the home page or desired path
      }, 3000); // Show for 3 seconds
    } catch (error) {
      console.log("Error:", error);
      setStatus(error.message || "Failed to login");
      setError(true);
      setShowLoader(false);
    } finally {
      setLoading(false);
    }
  }, 300), []);

  const onSubmit = (data) => {
    handleLoginSubmit(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!showAlert && !showLoader ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: 'Invalid email address'
                }
              })}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              type="email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters long' }
              })}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              type="password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {status && (
            <p className={`text-xs mt-1 ${error ? 'text-red-500' : 'text-green-500'}`}>
              {status}
            </p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      ) : (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center z-50">
        {/* Loader */}
        {showLoader && (
          <Box sx={{ width: '50%', mb: 2 }}>
            <LinearProgress sx={{ width: '100%' }} />
          </Box>
        )}
      
        {/* Alert */}
        {showAlert && (
          <Stack sx={{ width: '80%' }} spacing={2} className="mt-4">
            <Alert severity="success" sx={{ width: '100%',display:"flex" ,alignItems:'center',justifyContent:'center'}}>
              {status}
            </Alert>
          </Stack>
        )}
      </div>
      )}
    </div>
  );
};

export default MyLoginform;
