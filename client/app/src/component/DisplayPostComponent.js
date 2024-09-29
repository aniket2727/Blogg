/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FiSend, FiMessageSquare, FiTrash } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa'; // Import profile icon
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import debounce from 'lodash/debounce';

// Material UI components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Import custom hooks and components
import GetAllpostdata from '../customHook/GetallPostdataApi';
import { AddcommentByid } from '../customHook/AddCommentbyid';
import { DeleteCommentByIds } from '../customHook/React-quary/DeletecommentUsingid';
import ButtonComponent from './ButtonComponent';
import PaginationForDisplayAllpost from './PaginationForDisplayAllpost';
import LoginDetailsContext from '../contextApis/LoginDetailsContext';
import { Addfollowersinfo, Getfollowerslist } from '../customHook/AddfollowersApi';
import { selectuserid } from '../features/userID/userIdSlice';
import { Deletefollowersfromdata } from '../customHook/AddfollowersApi';


const DisplayPostComponent = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState({});
    const [visibleComments, setVisibleComments] = useState({});
    const [loginErrorPostId, setLoginErrorPostId] = useState(null);
    const [postid, setpostid] = useState([]);
    const [followerslist, setFollowersList] = useState([]);

    const { userEmail } = useContext(LoginDetailsContext);
    const userid = useSelector(selectuserid);
    const [open, setOpen] = React.useState(false);

    // Handle opening the dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Handle closing the dialog
    const handleClose = () => {
        setOpen(false);
    };

    // Fetch posts data
    const callApisforPostData = async () => {
        try {
            setLoading(true); // Set loading true when starting to fetch posts
            const result = await GetAllpostdata();
            setPosts(result.getallpostdata);
        } catch (error) {
            setError('Failed to fetch posts');
            console.error('The error is:', error);
        } finally {
            setLoading(false); // Ensure loading is set to false in the finally block
        }
    };

    // Fetch followers list
    const getFollowersList = async () => {
        if (userid) { // Check if userid is available
            try {
                const followersResponse = await Getfollowerslist({ userid });
                setFollowersList(followersResponse);
            } catch (error) {
                console.log("Error fetching followers list:", error);
            }
        } else {
            console.log("userid is undefined. Skipping followers fetch.");
        }
    };

    // useEffect to fetch posts and followers
    useEffect(() => {
        // Fetch posts data on mount
        callApisforPostData();

        // Fetch followers list if userid is available
        if (userid) {
            getFollowersList();
        }
    }, [userid]); // Add userid as a dependency


    // Handle adding comment
    const handleSend = async (item_post_id) => {
        if (!userid) {
            setLoginErrorPostId(item_post_id);
            return;
        }

        setpostid(prev => [...prev, item_post_id]);

        try {
            const newComment = comments[item_post_id];
            await AddcommentByid({
                postid: item_post_id,
                newpostcomment: newComment,
                author: userEmail,
                autherid: userid,
            });
            setComments(prev => ({ ...prev, [item_post_id]: '' }));
            callApisforPostData();
            setLoginErrorPostId(null);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const debouncedHandleSend = useCallback(debounce(handleSend, 300), [comments]);

    // Handle comment input change
    const handleCommentChange = (e, item_post_id) => {
        setComments(prev => ({ ...prev, [item_post_id]: e.target.value }));
    };

    // Handle deleting comment
    const handleDeleteCommentByid = async (postid, commentid, autherid) => {
        try {
            if (autherid === userid) {
                await DeleteCommentByIds({ postid, commentid });
                callApisforPostData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const debouncedHandleDeleteCommentByid = useCallback(debounce(handleDeleteCommentByid, 300), [userid]);

    // Handle following
    const handleFollow = async (postCreaterId, postCreatorEmail) => {
        try {
            const response = await Addfollowersinfo({
                userId: userid,
                newFollowerId: postCreaterId,
                newFollowerEmail: postCreatorEmail,
            });
            setFollowersList(prev => [...prev, postCreaterId]); // Add to the followers list
            console.log('Follow response:', response);
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle removing from the following list
    const handleRemovefromfollowinglist = async (followerid) => {
        // Open the dialog
        handleClickOpen();
        try {
            console.log("The follower's id:", followerid);
            // after handleclose the value of opern change to false means it allow to remove follower
            if (!open) {
                // Check if the follower is found
                if (followerslist.includes(followerid)) {
                    console.log("Found");

                    // Update the followers list locally
                    const newlist = followerslist.filter((item) => item !== followerid);
                    setFollowersList(newlist);

                    // Call the API to delete the follower from the backend
                    const response = await Deletefollowersfromdata({
                        userid: userid,
                        followerid: followerid,
                    });
                    console.log(response);

                    // Refresh the followers list after deletion
                    await Getfollowerslist();


                } else {
                    console.log("Not found");
                }
            }
        } catch (error) {
            console.log("The error is:", error);
        }
    };


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
                        <div className="flex items-center">
                            <FaUserCircle className="text-gray-400 mr-2" size={24} /> {/* Profile Icon */}
                            <h1 className="text-xl font-semibold underline">{item.email}</h1> {/* Underlined email */}
                        </div>
                        {/* Conditional rendering for follow button */}
                        {item.postcreaterId !== userid && (
                            followerslist.includes(item.postcreaterId) ? (
                                <ButtonComponent buttonText='following' onClick={() => handleRemovefromfollowinglist(item.postcreaterId)} />
                            ) : (
                                <ButtonComponent buttonText='follow' onClick={() => handleFollow(item.postcreaterId, item.email)} />
                            )
                        )}
                    </div>

                    <div>
                        <p className="text-gray-700">{item.postContent}</p>
                        {item.postContent.length < 50 && <div className="h-12 w-full"></div>}
                    </div>

                    {/* Button row for 'See Comment' and 'Send Comment' */}
                    <div className="flex space-x-2 mb-4">
                        <button
                            onClick={() => setVisibleComments((prevState) => ({ ...prevState, [item._id]: !prevState[item._id] }))}
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
                    {loginErrorPostId === item._id && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error">Please log in to add a comment</Alert>
                        </Stack>
                    )}

                    {/* Show comments */}
                    {visibleComments[item._id] && item.comments && item.comments.length > 0 && (
                        <div className="mt-2 space-y-2 w-full">
                            {item.comments.map((comment) => (
                                <div key={comment._id} className="flex items-center justify-between">
                                    <p>{comment.comment}</p>
                                    {comment.autherid === userid && (
                                        <button
                                            onClick={() => debouncedHandleDeleteCommentByid(item._id, comment._id, comment.autherid)}
                                            className="text-red-500"
                                        >
                                            <FiTrash />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    <PaginationForDisplayAllpost data={posts}/>
                </div>
              
            ))}

            {/* Dialog for removing followers */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to unfollow?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        After unfollowing, you will not be able to view their posts or updates.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DisplayPostComponent;
