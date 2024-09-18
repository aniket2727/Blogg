import axios from 'axios';

const Savedpostwithemail = async ({ email, post, token }) => {
  try {
    // Check if email, post, or token is missing
    if (!email || !post) {
      throw new Error("Email or post data is missing");
    }

    if (!token) {
      throw new Error("Token is missing");
    }

    // Define your API endpoint
    const API_URL = 'http://localhost:9009/app/post/addpost';

    // Send a POST request to the API with token in headers
    const response = await axios.post(
      API_URL,
      { email, post }, // Data to send in the body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Token in Authorization header
        },
      }
    );

    // Handle success
    console.log('Post saved successfully:', response.data);
  } catch (error) {
    // Handle error (either from missing data or failed API request)
    console.error('Error saving post:', error.message || error);
  }
};

export default Savedpostwithemail;
