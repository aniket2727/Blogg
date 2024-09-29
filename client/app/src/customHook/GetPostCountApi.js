

// create post count apis wit the axios

import axios from 'axios';

// Function to get post count by creator ID
export const getPostCountByCreator = async (postcreaterId) => {
    try {
        const response = await axios.post('http://localhost:9009/app/postcount', { postcreaterId });
        return response.data.postCount;
    } catch (error) {
        console.error('Error fetching post count:', error);
        throw error;
    }
};
