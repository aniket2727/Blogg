/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useForm } from 'react-hook-form';
import debounce from 'lodash/debounce';
import { useCallback } from 'react';
import Loginapis from '../customHook/LoginApi';

const MyLoginform = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Debounced function for form submission
  const handleLoginSubmit = useCallback(debounce(async (data) => {
    console.log("Submitted data:", data);
    try {
      const result = await Loginapis({ email: data.email, password: data.password }); // Pass as an object
      console.log("The result of login API is:", result);
    } catch (error) {
      console.error("Error in login API:", error);
    }
  }, 300), []);

  // Wrap the debounced function call
  const onSubmit = (data) => {
    handleLoginSubmit(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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

        <button 
          type="submit" 
          className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MyLoginform;
