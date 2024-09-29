/* eslint-disable no-unused-vars */
import { useContext, useEffect,useState } from 'react';
import axios from 'axios';
//import PostcountAndFollowedcountDetailsContext from '../contextApis/Followedandpostcount';

// Custom hook to get the following count for a user
const useFollowingCount = ( newFollowerId ) => {
    //const { followedcount, setfollowedcount } = useContext(PostcountAndFollowedcountDetailsContext);
    const [count,setcount]=useState(0);


    useEffect(() => {
        const fetchFollowingCount = async () => {
            try {
                const response = await axios.post('http://localhost:9009/app/f', {  newFollowerId  });
                console.log("this is following set ",response.data.result.length);
                setcount(response.data.result.length)
            } catch (error) {
                console.error('Error fetching following count:', error);
            }
        };

        if ( newFollowerId ) {
            fetchFollowingCount(); // Call the function when `userid` is provided
        }
    }, [ newFollowerId ]);

    return count;
};

export default useFollowingCount;
