import {Button, Input} from '@geist-ui/react';
import "./input-claim.css"
import React from 'react';

function InputClaimComponent() {
  return (
    <div>
      <div className='cover'>
          <div className="page-info">
            <h3>Enter Split ID:</h3>
            <Input />
            <Button auto>Claim</Button>
          </div>
      </div>
    </div>
  );
}

export default InputClaimComponent;
