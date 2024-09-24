const url = 'http://localhost:9009/c/deletecomment'; // Ensure this URL is correct

const DeleteCommentByIds = async ({ postid, commentid }) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ postid, commentid }),
            headers: {
                'Content-Type': 'application/json', // Corrected header
            },
        });

        if (!response.ok) {
            throw new Error("Something went wrong in deleting the comment");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.log("The error is", error);
        throw error; // Rethrow the error for further handling if needed
    }
};

export { DeleteCommentByIds }; // Corrected export
