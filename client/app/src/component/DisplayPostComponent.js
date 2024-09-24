import React, { useEffect, useState, useContext } from 'react';
import GetAllpostdata from '../customHook/GetallPostdataApi';
import ButtonComponent from './ButtonComponent';
import PaginationForDisplayAllpost from './PaginationForDisplayAllpost';
import { AddcommentByid } from '../customHook/AddCommentbyid';
import LoginDetailsContext from '../contextApis/LoginDetailsContext';
import { FiSend, FiMessageSquare, FiTrash } from 'react-icons/fi'; // Importing icons
import { DeleteCommentByIds } from '../customHook/React-quary/DeletecommentUsingid';
import { debounce } from 'lodash'; // Importing debounce from lodash

const DisplayPostComponent = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState({});
    const [visibleComments, setVisibleComments] = useState({}); // Track visibility of comments for each post

    const { userEmail } = useContext(LoginDetailsContext);

    // Handle adding comment
    const handleSend = async (item_post_id) => {
        try {
            const newComment = comments[item_post_id];
            const result = await AddcommentByid({ postid: item_post_id, newpostcomment: newComment, author: userEmail });
            console.log('Comment added:', result);

            // Clear the comment input for the post after sending
            setComments((prevComments) => ({ ...prevComments, [item_post_id]: '' }));
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    // Debounce the handleSend function
    const debouncedHandleSend = debounce(handleSend, 300); // Adjust the delay as needed

    // Update the comment for the specific post in the state
    const handleCommentChange = (e, item_post_id) => {
        setComments((prevComments) => ({
            ...prevComments,
            [item_post_id]: e.target.value,
        }));
    };

    // Toggle visibility of comments for a specific post
    const handleSeeComment = (postId) => {
        setVisibleComments((prevVisibleComments) => ({
            ...prevVisibleComments,
            [postId]: !prevVisibleComments[postId],
        }));
    };

    // Fetch post data
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

    // delete comment
    const handleDeleteCommentByid = async (postid, commentid) => {
        const response = await DeleteCommentByIds({ postid: postid, commentid: commentid });
        console.log(response);
    };

    // Debounce the delete comment function
    const debouncedHandleDeleteCommentByid = debounce(handleDeleteCommentByid, 300); // Adjust the delay as needed

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
                        placeholder="Comment"
                        value={comments[item._id] || ''}
                        onChange={(e) => handleCommentChange(e, item._id)}
                        className="border p-2 w-full mb-2"
                    />

                    {/* Display comments toggle */}
                    <button
                        onClick={() => handleSeeComment(item._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                    >
                        <FiMessageSquare className="mr-2" />
                        {visibleComments[item._id] ? 'Hide Comments' : 'See Comments'}
                    </button>

                    {/* Display the comments if visible */}
                    {visibleComments[item._id] && item.comments && item.comments.length > 0 && (
                        <div className="mt-2 space-y-2">
                            {item.comments.map((comment, commentIndex) => (
                                <div key={commentIndex} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                                    <div>
                                        <p className="font-semibold">{comment.author}</p>
                                        <p>{comment.text}</p>
                                    </div>
                                    <button onClick={() => debouncedHandleDeleteCommentByid(item._id, comment._id)} className="text-red-500">
                                        <FiTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Send comment button */}
                    <button
                        onClick={() => debouncedHandleSend(item._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center mt-2"
                    >
                        Send <FiSend className="ml-2" />
                    </button>
                </div>
            ))}

            <PaginationForDisplayAllpost allpostdata={posts} />
        </div>
    );
};

export default DisplayPostComponent;
