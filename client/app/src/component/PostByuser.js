import React, { useState, useEffect } from 'react';

const Postbyuser = ({ data }) => {
    const [userdata, setuserdata] = useState('');

    useEffect(() => {
        if (data) {
            setuserdata(data.message); // Assuming data.message is an array
        }
    }, [data]);

    return (
        <div className="max-w-4xl mx-auto py-6">
            <h1 className="text-2xl font-semibold text-center mb-6">All your posts</h1>
            <div className="space-y-4">
                {userdata && userdata.length > 0 ? (
                    userdata.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <h2 className="text-xl font-bold text-gray-800 mb-2">{item.email}</h2>
                            <p className="text-gray-600">{item.postContent}</p>
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
