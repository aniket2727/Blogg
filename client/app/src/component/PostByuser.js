import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Deletepostbyid } from '../customHook/DeletePostByPostId';

const Postbyuser = ({ data }) => {
    const [userdata, setuserdata] = useState([]); // Initialize as an empty array

    useEffect(() => {
        if (data && data.message) {
            setuserdata(data.message); // Assuming data.message is an array
        }
    }, [data]);

    console.log("the data props ",userdata);

    const handleDeletepost = async (postId) => {
       // console.log("the selected id is ",postId);
        try {
            const response = await Deletepostbyid({ id: postId }); // Send correct parameter name
            console.log("Response after deleting post", response);
            // Optionally, remove the post from UI after successful deletion
            setuserdata(userdata.filter(item => item._id !== postId));
        } catch (error) {
            console.log("Error deleting post", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-6">
            <h1 className="text-3xl font-bold text-center mb-6">All Your Posts</h1>
            <div className="space-y-6">
                {userdata && userdata.length > 0 ? (
                    userdata.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-1">{item.email}</h2>
                                    <p className="text-gray-600">{item.postContent}</p>
                                </div>
                                <button
                                    onClick={() => handleDeletepost(item._id)}
                                    className="ml-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
                                >
                                    <FaTrash className="mr-2" /> {/* Delete Icon */}
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No posts found.</p>
                )}
            </div>
        </div>
    );
};

export default Postbyuser;
