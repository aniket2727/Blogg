/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const url = 'http://localhost:9009/app';

// Helper function for email validation
const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailPattern.test(email);
};

// Helper function for password validation (optional)
const validatePassword = (password) => {
    return password.length >= 6; // Require at least 6 characters, can be customized
};

const Registerapis = async ({ name, email, password }) => {
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);

    // Input validation
    if (!name || !email || !password) {
        setStatus("Please provide name, email, and password");
        setError(true);
        setLoading(false);
        return { status, loading, error, data };
    }

    if (!validateEmail(email)) {
        setStatus("Invalid email format");
        setError(true);
        setLoading(false);
        return { status, loading, error, data };
    }

    if (!validatePassword(password)) {
        setStatus("Password must be at least 6 characters");
        setError(true);
        setLoading(false);
        return { status, loading, error, data };
    }

    try {
        setLoading(true);
        const apiResponse = await fetch(`${url}/register`, {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
            // Add timeout (optional)
            signal: AbortSignal.timeout(5000) // 5 seconds timeout
        });

        const result = await apiResponse.json();

        if (!apiResponse.ok) {
            // Use specific HTTP status codes for better error handling
            let errorMessage = 'Failed to register';
            if (apiResponse.status === 400) {
                errorMessage = 'Bad request. Please check the input';
            }
            throw new Error(result.message || errorMessage);
        }

        // Save JWT token to localStorage (if applicable)
        if (result.token) {
            localStorage.setItem('token', result.token);
        }

        setData(result);
        setStatus("Registration successful");
        setError(false);
    } catch (error) {
        setStatus(error.message || "Failed to register");
        setError(true);
        console.error("Error:", error);
    } finally {
        setLoading(false);
    }

    return { status, loading, error, data };
};

export default Registerapis;
