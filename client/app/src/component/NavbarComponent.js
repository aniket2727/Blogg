import React from 'react';
import ButtonComponent from './ButtonComponent';

const NavbarComponent = () => {

    const handleButtonClick=()=>{
           console.log("button get clicked")
    }
  return (
    <div className="bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-3xl font-bold">Corporate Katta</h1>
      </div>

      <div className="p-4 flex items-center  space-x-4">
        <ButtonComponent buttonText="Login" backgroundColorprop="bg-red-500" onClick={handleButtonClick} /> 
        <ButtonComponent buttonText="Register" backgroundColorprop="bg-red-500" onClick={handleButtonClick} />
        <ButtonComponent buttonText="Logout" backgroundColorprop="bg-red-500" onClick={handleButtonClick} /> {/* Example of custom button styling */}
      </div>
    </div>
  );
}

export default NavbarComponent;
