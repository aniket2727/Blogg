/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ButtonComponent from './ButtonComponent';

const PaginationForDisplayAllpost = ({ allpostdata = [] }) => { // Default to an empty array
    const [basicCount, setBasicCount] = useState(10);
    const [postdatalength, setPostDataLength] = useState(0);
    const [pagescount, setPagesCount] = useState(1);
    const [movingCounter, setMovingCounter] = useState(1);

    const handleMovingCounter = (direction) => {
        if (direction === 1) {
            setMovingCounter((prev) => Math.min(prev + 1, pagescount));
        } else {
            setMovingCounter((prev) => Math.max(prev - 1, 1));
        }
    };

    useEffect(() => {
        const result = allpostdata.length || 0; // Ensure length is calculated safely
        setPostDataLength(result);
        setPagesCount(Math.ceil(result / basicCount)); // Correct the calculation
    }, [allpostdata, basicCount]);

    return (
        <div>
            {
                pagescount <= 1 ? null : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {movingCounter > 1 && (
                            <ButtonComponent 
                                buttonText="Prev" 
                                onClick={() => handleMovingCounter(-1)} // Passing function with direction
                            />
                        )}
                        {movingCounter < pagescount && (
                            <ButtonComponent 
                                buttonText="Next" 
                                onClick={() => handleMovingCounter(1)} // Passing function with direction
                            />
                        )}
                    </div>
                )
            }
        </div>
    );
};

export default PaginationForDisplayAllpost;
