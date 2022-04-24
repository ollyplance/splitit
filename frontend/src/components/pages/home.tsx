import {Button, Spacer} from '@geist-ui/react';
import "./home.css"
import vectorImage from '../../assets/images/splitit.png';
import React from 'react';

function HomeComponent() {
  return (
    <div>
      <div className='cover'>
          <div className="landing-info">
            <div className="landing-text">
              <h1>Split your order today!</h1>
              <h3>Having trouble spliting reciepts at a restaurant with your friends? 
                Can't calculate it all in your head? Hate to cover the bill? 
                Wait no longer! Scan your receipts and send the link to your friends!</h3>
              <Spacer h="1" />
              <a href='/create'><Button auto type="secondary">SplitIt!</Button></a>
            </div>
            <img className='vector-img'
              src={vectorImage} alt="vector" />
          </div>
      </div>
    </div>
  );
}

export default HomeComponent;
