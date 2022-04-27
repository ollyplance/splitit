import {Button, Divider, Input, Page, Spacer, Table, Textarea} from '@geist-ui/react';
import "./create.css"
import { PlusCircle } from '@geist-ui/icons'
import React from 'react';
import { collection, addDoc } from "firebase/firestore";
import {db} from '../../firebase.js'
import {useNavigate} from 'react-router-dom';

function CreateComponent() {
  const navigate = useNavigate();
  const dataSource = [
    { name: 'Margarita Pizza', price: '11', quantity: '1', claimed: '' },
  ]
  const [data, setData] = React.useState(dataSource)

  const [splitName, setSplitName] = React.useState('')
  const [comments, setComments] = React.useState('')
  const [name, setName] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [quantity, setQuantity] = React.useState('')

  const renderAction = (value: any, rowData: any, index: any) => {
    const removeHandler = () => {
      setData(last => last.filter((_, dataIndex) => dataIndex !== index))
    }
    return (
      <Button type="error" auto scale={1/3} font="12px" onClick={removeHandler}>Remove</Button>
    )
  }

  const addItem = () => {
    const newItem = {'name': name, 'price': price, 'quantity': quantity, 'claimed': ''};
    const newData = [...data];
    newData.push(newItem);
    setData(newData);
  }

  const createSplitIt = async () => {
    const finalData = {'name': splitName, 'comments': comments, 'items': data}
    
    const docRef = await addDoc(collection(db, "split"), finalData);
    navigate({pathname: '/claim/'+docRef.id});
  }

  return (
    <div className='nav-offset'>
      <Page>
        <Page.Content>
          <h1>Create a new SplitIt</h1>
          <h3>Add a name, scan your receipt, edit, and send to your friends! It is that SIMPLE.</h3>
          <Spacer h='1' />
          <h3>Event name:</h3>
          <Input initialValue={splitName} onChange={(e) => setSplitName(e.target.value)}
            scale={4/3} placeholder="Ski Trip" />
          <Spacer h='1' />
          <h3>Comments:</h3>
          <Textarea initialValue={comments} onChange={(e) => setComments(e.target.value)}
            scale={4/3} placeholder="Best trip ever!" />
          <Spacer h='1' />
          <h3>Upload Receipt:</h3>
          <Input scale={4/3} placeholder="Ski Trip" />
          <Spacer h='1' />
          <h3>Event receipt:</h3>
          <div className='addItem'>
            <Input initialValue={name} onChange={(e) => setName(e.target.value)} 
              className='itemReceipt' scale={4/3} clearable={true} placeholder="Name" />
            <Input initialValue={price} onChange={(e) => setPrice(e.target.value)} 
              className='itemReceipt' scale={4/3} clearable={true} placeholder="Price" />
            <Input initialValue={quantity} onChange={(e) => setQuantity(e.target.value)} 
              className='itemReceipt' scale={4/3} clearable={true} placeholder="Quanitity" />
            <Button onClick={addItem} className='itemReceipt' iconRight={<PlusCircle />} auto scale={2/3} px={0.6} />
          </div>
          <Spacer h='1' />
          <div className='receipt'>
            <Table data={data}>
              <Table.Column prop="name" label="name" />
              <Table.Column prop="price" label="price" />
              <Table.Column prop="quantity" label="quantity" />
              <Table.Column prop="claimed" label="edit" width={150} render={renderAction} />
            </Table>
          </div>
          <Spacer h='3' />
          <Divider />
          <Button onClick={createSplitIt} auto scale={2}>SplitIt</Button>
        </Page.Content>
      </Page>
    </div>
  );
}

export default CreateComponent;