const url = 'http://localhost:9009/app/addfollower';

const Addfollowersinfo = async ({ userId, newFollowerId, newFollowerEmail }) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ userId, newFollowerId, newFollowerEmail }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Check if response is not ok
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    console.log('The error is:', error.message);
  }
};

module.exports = { Addfollowersinfo };
