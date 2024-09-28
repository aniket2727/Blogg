// AddfollowersApi.js
const BASE_URL = 'http://localhost:9009/app';

const Addfollowersinfo = async ({ userId, newFollowerId, newFollowerEmail }) => {
  console.log('aaa', userId, newFollowerId, newFollowerEmail);
  try {
    const response = await fetch(`${BASE_URL}/addfollower`, {
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
    const response = await fetch(`${BASE_URL}/getf`, {
      method: 'post',
      body: JSON.stringify({ userid }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Unable to get data of user followers list: ${errorMessage}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.log("There is an error:", error);
    throw error; // Optionally, rethrow the error for further handling
  }
};

export { Addfollowersinfo, Getfollowerslist };
