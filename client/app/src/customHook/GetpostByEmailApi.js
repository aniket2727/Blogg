const Getallpostbyemails = async ({ email }) => {
    console.log(email);
    try {
        const response = await fetch('http://localhost:9009/post/epost', {
            method: 'POST',
            body: JSON.stringify({ email }),  // Correct JSON formatting
            headers: {
                'Content-Type': 'application/json'  // Correct Content-Type
            }
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();
        console.log("Posts retrieved:", data);
        return data;

    } catch (error) {
        console.error("The error is", error);
    }
};

module.exports = { Getallpostbyemails };
