

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
    console.log(data);
    if(data.followers){
       const followersarray=data.followers.map((item)=>{
        return item.folllowerid;
       })

       return followersarray;
    }
    return data;

  } catch (error) {
    console.log("There is an error:", error);
    throw error; // Optionally, rethrow the error for further handling
  }
};

const Getfollowerscount = async ({ userid }) => {
  try {
    const response = await fetch(`${BASE_URL}/g`, { // Fixed the URL syntax
      method: 'POST', // POST method should be capitalized
      body: JSON.stringify({ userid: userid }), // Use 'body' instead of 'data'
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Unable to get count"); // Throw error if response is not ok
    }

    const result = await response.json(); // Corrected to 'json()'
    return result;

  } catch (error) {
    console.log("The error is", error); // Log the error
    throw error; // Optionally rethrow the error for further handling
  }
};

export { Addfollowersinfo, Getfollowerslist,Getfollowerscount };
