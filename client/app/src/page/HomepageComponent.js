import React from 'react';
import Typewriter from 'typewriter-effect';
import './homepage.css';
import homepageImage from '../static File/homepage-image.jpg';
import SlideComponent from '../component/SlideComponent';
const HomepageComponent = () => {
  return (
    <> 
    <div>
       <SlideComponent/>
    </div>
    <div className='main-parent-div'>
      <div className='left-side-div'>
        <img src={homepageImage} alt='Home Page' />
      </div>

      <div className='right-side-div'>
        <div className='title'>
          <h1 className='title1'>Welcome to Corporate Kattta</h1>
        </div>
        <div className='words-move-animation-container'>
          <div className='typewriter-container'>
            <Typewriter
              options={{
                strings: [
                  'Connect with your buddies\nand corporate friends',
                  'Chat, post sharing\nand much more'
                ],
                autoStart: true,
                loop: true,
                delay: 50, // Adjust typing speed
                deleteSpeed: 30, // Adjust deletion speed if needed
                cursor: '' // Remove the cursor if you don't want it to display
              }}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HomepageComponent;
