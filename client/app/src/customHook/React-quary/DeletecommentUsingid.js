const url = 'http://localhost:9009/c/deletecomment';

const deleteCommentByIds = async ({ postid, commentid }) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postid, commentid }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("The error is:", error);
    throw error; // Important to rethrow the error so that React Query can catch it
  }
};

export { deleteCommentByIds };
