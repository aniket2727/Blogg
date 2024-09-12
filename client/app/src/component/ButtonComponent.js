import React from 'react';

const ButtonComponent = ({
  buttonText = "Button",
  onClick,
  heightprop = "40px",
  widthprop = "100px",
  backgroundColorprop = "bg-blue-500",  // Tailwind class for background color
  borderRadiusprop = "rounded-md",      // Tailwind class for rounded corners
  fontprop = "font-bold"                // Tailwind class for font styling
}) => {
  return (
    <div>
      <button 
        onClick={onClick}
        className={`${backgroundColorprop} ${borderRadiusprop} ${fontprop} text-white hover:bg-green-500 transition duration-300 ease-in-out`}  // Combined Tailwind classes
        style={{ height: heightprop, width: widthprop }}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default ButtonComponent;
