/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import GetAllpostdata from '../customHook/GetallPostdataApi';
import ButtonComponent from './ButtonComponent';
import PaginationForDisplayAllpost from './PaginationForDisplayAllpost';
import { AddcommentByid } from '../customHook/AddCommentbyid';
import LoginDetailsContext from '../contextApis/LoginDetailsContext';

// Importing the arrow icon from react-icons
import { FiArrowRight } from 'react-icons/fi';

const DisplayPostComponent = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [comments, setComments] = useState({}); // Store comments for each post

    // useContext to get user email from context
    const { userEmail } = useContext(LoginDetailsContext);

    const handleSend = async (item_post_id) => {
        try {
            // Get the comment for the specific post
            const newComment = comments[item_post_id];

            // Call AddcommentByid function
            const result = await AddcommentByid({ postid: item_post_id, newpostcomment: newComment, author: userEmail });
            console.log('Comment added:', result);

            // Clear the comment input for the post after sending
            setComments((prevComments) => ({ ...prevComments, [item_post_id]: '' }));
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    // Update the comment for the specific post in the state
    const handleCommentChange = (e, item_post_id) => {
        setComments((prevComments) => ({
            ...prevComments,
            [item_post_id]: e.target.value,
        }));
    };

    const callApisforPostData = async () => {
        try {
            const result = await GetAllpostdata();
            setPosts(result.getallpostdata);
            console.log("Data for all posts:", result.getallpostdata);
        } catch (error) {
            setError("Failed to fetch posts");
            console.error("The error is:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        callApisforPostData();
    }, []);

    if (loading) return <p className="font-bold text-green-600">Loading...</p>;

    if (error) return <p className="font-bold text-red-600">{error}</p>;

    if (posts.length === 0) {
        return (
            <div className="flex items-center justify-center p-4">
                <p className="font-bold text-red-600">Oops, currently no posts available</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {posts.map((item, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-semibold">{item.email}</h1>
                        <ButtonComponent buttonText="Follow" />
                    </div>
                    <div>
                        <p className="text-gray-700">{item.postContent}</p>
                        {item.postContent.length < 50 && <div className="h-12 w-full"></div>}
                    </div>
                    <input
                        placeholder='Comment'
                        value={comments[item._id] || ''} // Use the comment specific to the post
                        onChange={(e) => handleCommentChange(e, item._id)} // Update comment for this specific post
                        className="border p-2 w-full mb-2"
                    />
                    <button
                        onClick={() => handleSend(item._id)} // Send the comment for the specific post
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                    >
                        Send <FiArrowRight className="ml-2" /> {/* Adding the arrow icon */}
                    </button>
                </div>
            ))}

            <PaginationForDisplayAllpost allpostdata={posts} />
        </div>
    );
};

export default DisplayPostComponent;
