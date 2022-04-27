import {Button, Input, Spacer} from '@geist-ui/react';
import "./input-claim.css"
import React from 'react';
import {useNavigate} from 'react-router-dom';

function InputClaimComponent() {
  const navigate = useNavigate();
  const [splitID, setSplitID] = React.useState('')

  const claimItem = () => {
    navigate({pathname: '/claim/'+splitID});
  }

  return (
    <div>
      <div className='cover'>
          <div className="page-info">
            <h1>Enter Split ID:</h1>
            <Input scale={2} onChange={(e) => setSplitID(e.target.value)} type="secondary"/>
            <Spacer h='1' />
            <Button scale={2} onClick={claimItem} type="secondary" auto>Claim</Button>
          </div>
      </div>
    </div>
  );
}

export default InputClaimComponent;
