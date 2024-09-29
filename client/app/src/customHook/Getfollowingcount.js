



import axios from 'axios';

// Function to get the list of users being followed by a specific follower ID
export const getFollowersById = async (newFollowerId ) => {
    try {
        const response = await axios.post('http://localhost:9009/app/f', { newFollowerId  });
        return response.data.followers; // Assuming the API returns a list of followers
    } catch (error) {
        console.error('Error fetching followers:', error);
        throw error;
    }
};
