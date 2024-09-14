import React, { useEffect, useState } from 'react';
import GetAllpostdata from '../customHook/GetallPostdataApi';

const DisplayPostComponent = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const callApisforPostData = async () => {
        try {
            const result = await GetAllpostdata(); // Await the result here
            setPosts(result.getallpostdata); // Store the result in state
            console.log("data for all post", result.getallpostdata);
        } catch (error) {
            setError("Failed to fetch posts"); // Set an error message in state
            console.error("The error is:", error); // Log the error
        } finally {
            setLoading(false); // Set loading to false once data is fetched or error occurs
        }
    };

    useEffect(() => {
        callApisforPostData();
    }, []);

    if (loading) return <p>Loading...</p>; // Show loading message while data is being fetched

    if (error) return <p>{error}</p>; // Show error message if there's an error

    if (posts.length < 0 && !posts) {
        return (
            <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <p style={{fontWeight:'bold', color:"red"}}>Oops curruntly no post available</p>
            </div>
        )
    }

    return (
        <div>
            <h1>Display Post</h1>

        </div>
    );
};

export default DisplayPostComponent;
