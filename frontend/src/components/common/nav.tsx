import React from 'react';
import {Button} from '@geist-ui/react';
import logo from '../../assets/images/logo.png';
import './nav.css';

function NavComponent() {
  return (
    <div className="navbar">
       <div>
          <a href='/'>
            <img className='logo-img'
              src={ logo } alt='logo'/>
          </a>
      </div>
      <div className='link'>
        <a href='/create'><Button>Create</Button></a>
      </div>
      <div className='link'>
        <a href='/claim'><Button>Claim</Button></a>
      </div>
    </div>
  );
}

export default NavComponent;