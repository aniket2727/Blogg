// Function to add comments by post ID
// Sends a POST request to the given URL with post ID, comment, and author details.

const url = 'http://localhost:9009/c/addcomment';

// Async function to add a comment by post ID
const AddcommentByid = async ({ postid, newpostcomment, author }) => {
    try {
        // Sending a POST request to the API
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ postid, newpostcomment, author }), // Corrected JSON.stringify syntax
            headers: {
                'Content-Type': 'application/json', // Corrected content type format
            },
        });

        // Check if response is not OK
        if (!response.ok) {
            throw new Error("An error occurred while adding the comment"); // Custom error message
        }

        // Parse and return the response as JSON
        return response.json();
    } catch (error) {
        console.error(error); // Log the error for debugging
        throw error; // Rethrow the error to be handled by the caller
    }
};

// Exporting the function for external use
module.exports = { AddcommentByid };
