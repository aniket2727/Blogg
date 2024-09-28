// AddfollowersApi.js
const url = 'http://localhost:9009/app/addfollower';

const Addfollowersinfo = async ({ userId, newFollowerId, newFollowerEmail }) => {
  console.log('aaa',userId,newFollowerId,newFollowerEmail);
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ userId, newFollowerId, newFollowerEmail }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding follower:', error.message);
    throw error; // Rethrow the error for handling in the hook
  }
};


const Getfollowerslist = async ({ userid }) => {
  try {
    const response = await fetch(url, {
      method: 'POST', // Corrected capitalization
      body: JSON.stringify({ userid }), // Fixed JSON.stringify syntax
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error("Unable to get data of user followers list"); // Corrected Error instantiation
    }

    const data = await response.json(); // Await the response
    return data; // Return the parsed data

  } catch (error) {
    console.log("There is an error:", error); // Improved error logging
    throw error; // Optionally, rethrow the error for further handling
  }
};
export {Addfollowersinfo,Getfollowerslist};
