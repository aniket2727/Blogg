import axios from 'axios';

// Configure default Axios settings if needed
axios.defaults.baseURL = 'http://localhost:9009/app';
//axios.defaults.headers.common['Authorization'] = 'Bearer YOUR_TOKEN'; // Example header, adjust as needed

const GetAllpostdata = async () => {
  try {
    const response = await axios.get('/getallpost');

    // Check for successful response status
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      // Handle unexpected status codes
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    // Enhanced error handling
    if (error.response) {
      // Server responded with a status code other than 2xx
      console.error("Server responded with an error:", error.response.data);
      console.error("Status code:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received from server:", error.request);
    } else {
      // Something else happened while setting up the request
      console.error("Error setting up the request:", error.message);
    }
    throw error;
  }
}

export default GetAllpostdata;
