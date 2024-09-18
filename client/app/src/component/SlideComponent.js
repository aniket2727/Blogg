import React from 'react';
import ButtonComponent from './ButtonComponent';

const SlideComponent = () => {


  const handleButtonClick=(item)=>{
         
  }
  return (
    <div className="flex justify-center items-center space-x-4 mt-1 bg-gray-500 p-5 rounded-md h-12"> 
    
      <ButtonComponent buttonText="Home" heightprop="30px" backgroundColorprop="bg-red-500" />
      <ButtonComponent buttonText="Post" heightprop="30px" backgroundColorprop="bg-red-500" />
      <ButtonComponent buttonText="Create Post" heightprop="30px" backgroundColorprop="bg-red-500" />

      {/* Input field */}
      <input className="border p-2 rounded-md h-8" placeholder="Enter details" />

      <ButtonComponent buttonText="Account" heightprop="30px" backgroundColorprop="bg-red-500" />
    </div>
  );
}

export default SlideComponent;
