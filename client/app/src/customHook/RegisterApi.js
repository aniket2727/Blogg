// RegisterApi.js
const Registerapis = async ({ name, email, password }) => {
  

    // Input validation
    if (!name || !email || !password) {
        throw new Error("Please provide name, email, and password");
    }
    console.log(name,email,password)

    // API request
    try {
        const apiResponse = await fetch('http://localhost:9009/app/adduser', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
            signal: AbortSignal.timeout(5000) // 5 seconds timeout
        });

        const result = await apiResponse.json();

        if (!apiResponse.ok) {
            // Use specific HTTP status codes for better error handling
            let errorMessage = 'Failed to register';
            if (apiResponse.status === 400) {
                errorMessage = result.message || 'Bad request. Please check the input';
            }
            throw new Error(errorMessage);
        }

        // Save JWT token to localStorage (if applicable)
        if (result.token) {
            localStorage.setItem('token', result.token);
        }

        return result; // return the result for further processing
    } catch (error) {
        throw new Error(error.message || "Failed to register");
    }
};

export default Registerapis;
