import React from 'react';
import './homepage.css';
import homepageImage from '../static File/homepage-image.jpg'; 
const HomepageComponent = () => {
  return (
    <div className='main-parent-div'>
      <div className='left-side-div'>
        <img src={homepageImage} alt='Home Page' />
      </div>
       
      <div className='right-side-div'>
        <h1>This is context div</h1>
      </div>
    </div>
  );
};

export default HomepageComponent;
