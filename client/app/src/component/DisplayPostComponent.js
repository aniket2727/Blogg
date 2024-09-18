import React, { useEffect, useState } from 'react';
import GetAllpostdata from '../customHook/GetallPostdataApi';
import ButtonComponent from './ButtonComponent';
import PaginationForDisplayAllpost from './PaginationForDisplayAllpost';

const DisplayPostComponent = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const callApisforPostData = async () => {
        try {
            const result = await GetAllpostdata();
            setPosts(result.getallpostdata);
            console.log("Data for all posts:", result.getallpostdata);

            // Example of accessing postContent length
            if (result.getallpostdata.length > 0) {
                console.log("First post content length:", result.getallpostdata[0]?.postContent?.length);
            }
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

    if (loading) return <p className="font-bold text-green-600">Loading...</p>; // Show loading message while data is being fetched

    if (error) return <p className="font-bold text-red-600">{error}</p>; // Show error message if there's an error

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
                        {item.postContent.length <50 && <div className="h-12 w-full"></div>}
                    </div>
                </div>
            ))}

            <PaginationForDisplayAllpost allpostdata={posts}/>
        </div>
    );
};

export default DisplayPostComponent;
