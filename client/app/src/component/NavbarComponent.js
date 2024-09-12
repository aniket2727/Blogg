/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useCallback } from 'react';
import ButtonComponent from './ButtonComponent';
import debounce from 'lodash/debounce';
const NavbarComponent = () => {

    
    const handleButtonClick = useCallback(debounce(() => {
        console.log("Button was clicked");
    }, 300), []); 
  return (
    <div className="bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-3xl font-bold">Corporate Katta</h1>
      </div>

      <div className="p-4 flex items-center  space-x-4">
        <ButtonComponent buttonText="Login" backgroundColorprop="bg-red-500" onClick={handleButtonClick} /> 
        <ButtonComponent buttonText="Register" backgroundColorprop="bg-red-500" onClick={handleButtonClick} />
        <ButtonComponent buttonText="Logout" backgroundColorprop="bg-red-500" onClick={handleButtonClick} /> 
      </div>
    </div>
  );
}

export default NavbarComponent;
