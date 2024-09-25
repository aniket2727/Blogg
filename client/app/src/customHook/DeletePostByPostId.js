const url = 'http://localhost:9009/d/d'; // Ensure this is the correct endpoint

const Deletepostbyid = async ({ id }) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ id }), // Sending id in request body
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Unable to fetch data: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.log("The error is", error.message); // Log more details about the error
    }
};

module.exports = { Deletepostbyid };
