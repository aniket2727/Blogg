/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import Registerapis from '../customHook/RegisterApi';

const RegisterPageComponent = () => {
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value,
        });
    };

    // Debounced function for form submission
    const handleSubmit = useCallback(debounce(async (data) => {
        setLoading(true);  // Set loading true when submission starts
        setError(false);
        setStatus('');

        try {
            const result = await Registerapis(data);

            if (result.error) {
                throw new Error(result.error); // Throw an error for failed registration
            }

            setStatus("Registration successful");
            setData(result);
        } catch (error) {
            setStatus(error.message || "Failed to register");
            setError(true);
        } finally {
            setLoading(false); // Set loading to false once request is finished
        }
    }, 300), []);

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(registerData); // Pass the data to the debounced function
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form 
                onSubmit={onSubmit} 
                className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                {error && <p className="text-red-500 mb-4">{status}</p>}
                {!error && status && <p className="text-green-500 mb-4">{status}</p>}

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                        name="name"
                        value={registerData.name}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        type="text"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                        name="email"
                        value={registerData.email}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        type="email"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input 
                        name="password"
                        value={registerData.password}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        type="password"
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    disabled={loading} // Disable button when loading
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default RegisterPageComponent;
