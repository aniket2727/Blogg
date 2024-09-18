import React, { useState } from 'react';
import ButtonComponent from './ButtonComponent';
import { useNavigate } from 'react-router-dom';

const SlideComponent = () => {
  const navigate = useNavigate();

  // State to capture input field value (optional)
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = (item) => {
    navigate(`/${item}`);
  };

  // Handle input change (optional)
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-1 bg-gray-500 p-5 rounded-md h-12">
      <ButtonComponent 
        buttonText="Home" 
        heightprop="30px" 
        backgroundColorprop="bg-red-500" 
        onClick={() => handleButtonClick('home')} 
      />
      <ButtonComponent 
        buttonText="Post" 
        heightprop="30px" 
        backgroundColorprop="bg-red-500"  
        onClick={() => handleButtonClick('postpage')} 
      />
      <ButtonComponent 
        buttonText="Create Post" 
        heightprop="30px" 
        backgroundColorprop="bg-red-500"  
        onClick={() => handleButtonClick('createpost')} 
      />

      {/* Input field */}
      <input 
        className="border p-2 rounded-md h-8" 
        placeholder="Enter details" 
        value={inputValue} 
        onChange={handleInputChange} 
      />

      {/* Account button with navigation */}
      <ButtonComponent 
        buttonText="Account" 
        heightprop="30px" 
        backgroundColorprop="bg-red-500" 
        onClick={() => handleButtonClick('account')}  
      />
    </div>
  );
};

export default SlideComponent;
