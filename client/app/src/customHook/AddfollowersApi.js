

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
    const response = await fetch(`${BASE_URL}/g`, {
      method: 'post',
      body: JSON.stringify({ userid }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Unable to get count");
    }

    const result = await response.json(); // Ensure this is `.json()`, not `.JSON()`
    return result.count; // Extract the count from the response
  } catch (error) {
    console.log("The error is ", error);
    return 0; // Return 0 or some default value in case of error
  }
};


const Deletefollowersfromdata = async ({ userid, followerid }) => {
  if (!userid || !followerid) {
    return "Please provide all data";
  }

  try {
    const response = await fetch(`${BASE_URL}/removefollower`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userid,
        newFollowerId: followerid,
      }),
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Return the response data after removal

  } catch (error) {
    console.log("The error is:", error);
    return `Error: ${error.message}`;
  }
};

export { Addfollowersinfo, Getfollowerslist,Getfollowerscount ,Deletefollowersfromdata};
