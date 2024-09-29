/* eslint-disable no-unused-vars */
import {  useEffect ,useState} from 'react';
import axios from 'axios';
//import PostcountAndFollowedcountDetailsContext from '../contextApis/Followedandpostcount';

// Custom hook to get post count by creator ID
const usePostCount = (postcreaterId) => {
    // const { postcount, setpostcount } = useContext(PostcountAndFollowedcountDetailsContext);
    const [count,setcount]=useState(0);

    useEffect(() => {
        const fetchPostCount = async () => {
            try {
                const response = await axios.post('http://localhost:9009/app/postcount', { postcreaterId });
                console.log("this is post count",response.data.postCount)
                setcount(response.data.postCount);
            } catch (error) {
                console.error('Error fetching post count:', error);
            }
        };

        if (postcreaterId) {
            fetchPostCount();  // Call the function to get post count when `postcreaterId` changes
        }
    }, [postcreaterId])

    return count;
};

export default usePostCount;
