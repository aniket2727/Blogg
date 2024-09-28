// AddFollowersToList.js
import { useState, useEffect } from "react";
import Addfollowersinfo from '../customHook/AddfollowersApi';

const AddFollowersToList = ({ userid, followerid, followeremail }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const addFollowers = async () => {
      if (!userid || !followerid || !followeremail) return;

      setLoading(true);
      setError(null);
      try {
        const response = await Addfollowersinfo({
          userId: userid,
          newFollowerId: followerid,
          newFollowerEmail: followeremail,
        });
        setData(response);
      } catch (err) {
        setError(err.message); // Set error state
      } finally {
        setLoading(false);
      }
    };

    addFollowers();
  }, [userid, followerid, followeremail]);

  return { data, error, loading };
};

export default AddFollowersToList;
