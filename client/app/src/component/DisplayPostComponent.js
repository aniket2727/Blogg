/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext, useCallback } from 'react';
import GetAllpostdata from '../customHook/GetallPostdataApi';
import ButtonComponent from './ButtonComponent';
import PaginationForDisplayAllpost from './PaginationForDisplayAllpost';
import { AddcommentByid } from '../customHook/AddCommentbyid';
import LoginDetailsContext from '../contextApis/LoginDetailsContext';
import { FiSend, FiMessageSquare, FiTrash } from 'react-icons/fi';
import { DeleteCommentByIds } from '../customHook/React-quary/DeletecommentUsingid';
import debounce from 'lodash/debounce';
import { useSelector } from 'react-redux';
import { selectuserid } from '../features/userID/userIdSlice';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const DisplayPostComponent = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState({});
    const [visibleComments, setVisibleComments] = useState({});
    const [loginError, setLoginError] = useState(false); // Updated to show login error when trying to add a comment without login

    const { userEmail } = useContext(LoginDetailsContext);
    const userid = useSelector(selectuserid); // Get userid from Redux

    // Fetch posts data
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

    // Handle adding comment
    const handleSend = async (item_post_id) => {
        if (!userid) {
            setLoginError(true); // Set error if user not logged in
            return; // Stop function execution if not logged in
        }

        try {
            const newComment = comments[item_post_id];
            const result = await AddcommentByid({
                postid: item_post_id,
                newpostcomment: newComment,
                author: userEmail,
                autherid: userid
            });
            console.log('Comment added:', result);
            setComments((prevComments) => ({ ...prevComments, [item_post_id]: '' })); // Clear comment input
            callApisforPostData(); // Reload posts to show the new comment
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    // Debounce handleSend function to prevent rapid submissions
    const debouncedHandleSend = useCallback(debounce(handleSend, 300), [comments]);

    // Handle comment input change
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

    // Handle deleting comment
    const handleDeleteCommentByid = async (postid, commentid, autherid) => {
        try {
            if (autherid === userid) {
                const response = await DeleteCommentByIds({ postid, commentid });
                console.log(response);
                callApisforPostData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Debounce handleDeleteCommentByid function
    const debouncedHandleDeleteCommentByid = useCallback(debounce(handleDeleteCommentByid, 300), [userid]);

    // Show loading state
    if (loading) return <p className="font-bold text-green-600">Loading...</p>;

    // Show error if data fetching fails
    if (error) return <p className="font-bold text-red-600">{error}</p>;

    // Show message when there are no posts available
    if (posts.length === 0) {
        return (
            <div className="flex items-center justify-center p-4">
                <p className="font-bold text-red-600">Oops, currently no posts available</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {posts.map((item) => (
                <div key={item._id} className="bg-white shadow-md rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-semibold">{item.email}</h1>
                        <ButtonComponent buttonText="Follow" />
                    </div>
    
                    <div>
                        <p className="text-gray-700">{item.postContent}</p>
                        {item.postContent.length < 50 && <div className="h-12 w-full"></div>}
                    </div>
    
                    {/* Button row for 'See Comment' and 'Send Comment' with smaller button widths */}
                    <div className="flex space-x-2 mb-4">
                        <button
                            onClick={() => handleSeeComment(item._id)}
                            className="bg-blue-500 text-white py-1 px-3 rounded"
                        >
                            <FiMessageSquare /> 
                        </button>
                        <button
                            onClick={() => debouncedHandleSend(item._id)}
                            className="bg-blue-500 text-white py-1 px-3 rounded"
                        >
                            <FiSend /> 
                        </button>
                    </div>
    
                    {/* Input for comments */}
                    <input
                        placeholder="Comment"
                        value={comments[item._id] || ''}
                        onChange={(e) => handleCommentChange(e, item._id)}
                        className="border p-2 w-full mb-2"
                    />
    
                    {/* Display error if trying to comment without login */}
                    {loginError && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error">Please log in to add a comment</Alert>
                        </Stack>
                    )}
    
                    {/* Show comments when toggled */}
                    {visibleComments[item._id] && item.comments && item.comments.length > 0 && (
                        <div className="mt-2 space-y-2 w-full">
                            {item.comments.map((comment) => (
                                <div key={comment._id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                                    <div>
                                        <p className="font-semibold">{comment.author}</p>
                                        <p>{comment.text}</p>
                                    </div>
    
                                    {/* Allow delete if the comment author is the logged-in user */}
                                    {comment.autherid === userid && (
                                        <button
                                            onClick={() => debouncedHandleDeleteCommentByid(item._id, comment._id, comment.autherid)}
                                            className="text-red-500 p-2"
                                        >
                                            <FiTrash />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
    
            <PaginationForDisplayAllpost allpostdata={posts} />
        </div>
    );
    };
    
    export default DisplayPostComponent;
    