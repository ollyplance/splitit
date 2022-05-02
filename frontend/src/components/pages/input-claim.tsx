import {Button, Input, Spacer} from '@geist-ui/react';
import "./input-claim.css"
import React from 'react';

function InputClaimComponent() {
  const [splitID, setSplitID] = React.useState('')

  const claimRef = '/claim/'+splitID

  return (
    <div>
      <div className='cover'>
          <div className="page-info">
            <h1>Enter Split ID:</h1>
            <Input scale={2} onChange={(e) => setSplitID(e.target.value)} type="secondary"/>
            <Spacer h='1' />
            <div>
              <a href={claimRef}>
                <Button scale={2} type="secondary" auto>Claim
                </Button>
              </a>
            </div>
          </div>
      </div>
    </div>
  );
}

export default InputClaimComponent;
