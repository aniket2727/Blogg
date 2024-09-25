const url = 'http://localhost:9009/app/deletepost';

const Deletepostbyid = async ({ postId }) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ postId }), // Corrected stringify
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Unable to fetch data: ${response.statusText}`); // Corrected Error constructor and message
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.log("The error is", error);
    }
}

module.exports = { Deletepostbyid };
