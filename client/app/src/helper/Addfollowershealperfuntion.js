import { useState, useEffect } from "react";
import { Addfollowersinfo } from "../customHook/AddfollowersApi";

// Custom hook to add followers into the list
const useAddFollowersToList = ({ userid, followerid, followeremail }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const addFollowers = async () => {
      setLoading(true); // Start loading
      setError(false); // Reset error state
      try {
        const response = await Addfollowersinfo({
          userId: userid,
          newFollowerId: followerid,
          newFollowerEmail: followeremail,
        });
        setData(response); // Set data if successful
      } catch (err) {
        setError(true); // Set error state if request fails
      } finally {
        setLoading(false); // Stop loading
      }
    };

    // Trigger the function when hook is used
    if (userid && followerid && followeremail) {
      addFollowers();
    }
  }, [userid, followerid, followeremail]); // Dependencies to re-run on change

  console.log("the data is after follow button ",data);
  console.log("the error is after follow button ",error)
  

  return { data, error, loading }; // Return state values
};

export default useAddFollowersToList;
