import React from 'react';
import {Button} from '@geist-ui/react';
import './nav.css';

function NavComponent() {
  return (
    <div className="navbar">
      <div className='link'>
        <a href='/'><Button>Home</Button></a>
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