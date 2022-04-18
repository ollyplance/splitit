import {Input, Page, Spacer, Spinner, Textarea} from '@geist-ui/react';
import "./create.css"
import React from 'react';

function CreateComponent() {
  return (
    <div className='nav-offset'>
      <Page>
        <Page.Content>
          <h1>Create a new SplitIt</h1>
          <h3>Add a name, scan your receipt, edit, and send to your friends! It is that SIMPLE.</h3>
          <Spacer h='1' />
          <h3>Event name:</h3>
          <Input scale={4/3} placeholder="Ski Trip" />
          <Spacer h='1' />
          <h3>Comments:</h3>
          <Textarea scale={4/3} placeholder="Best trip ever!" />
          <Spacer h='1' />
          <h3>Upload Receipt:</h3>
          <Input scale={4/3} placeholder="Ski Trip" />
          <Spacer h='1' />
          <h3>Event receipt:</h3>
          <Spinner />
        </Page.Content>
      </Page>
    </div>
  );
}

export default CreateComponent;