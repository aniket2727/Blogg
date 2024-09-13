// Loginapis.js


// Helper function for email validation
const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailPattern.test(email);
};

const Loginapis = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("Please provide both email and password");
    }

    if (!validateEmail(email)) {
        throw new Error("Invalid email format");
    }

    try {
        const apiResponse = await fetch(`http://localhost:9009/app1/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
            signal: AbortSignal.timeout(5000) // 5 seconds timeout
        });

        console.log(apiResponse);

        const result = await apiResponse.json();
        console.log("result",result);

        if (!apiResponse.ok) {
            let errorMessage = 'Failed to login';
            if (apiResponse.status === 401) {
                errorMessage = 'Unauthorized access. Check credentials';
            } else if (apiResponse.status === 400) {
                errorMessage = 'Bad request. Please check the input';
            }
            else if(apiResponse.status===404){
                errorMessage="email is not register or register";
            }
            throw new Error(result.message || errorMessage);
        }

        return result;
    } catch (error) {
      
        throw new Error(error.message || "Failed to login");
    }
};

export default Loginapis;
