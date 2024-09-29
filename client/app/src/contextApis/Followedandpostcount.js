import { createContext, useState } from "react";

// Create the context
const PostcountAndFollowedcountDetailsContext = createContext();

// Provider component
export const PostcountAndFollowedcountProvider = ({ children }) => {
    const [postcount, setpostcount] = useState(0); // Initialize as a number
    const [followedcount, setfollowedcount] = useState(0); // Initialize as a number

    return (
        <PostcountAndFollowedcountDetailsContext.Provider value={{ postcount, setpostcount, followedcount, setfollowedcount }}>
            {children}
        </PostcountAndFollowedcountDetailsContext.Provider>
    );
};

// Export the context to be used in other components
export default PostcountAndFollowedcountDetailsContext;
