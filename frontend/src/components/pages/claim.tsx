import {Page, Table, Checkbox, Spacer, Input, Button} from '@geist-ui/react';
import { TableColumnRender } from '@geist-ui/react/esm/table';
import { useParams } from 'react-router-dom';
import React from 'react';

function ClaimComponent() {
    const { id } = useParams();
    console.log(id);
    type Item = {
        name: string
        price: number
        claimer: string
      }
    const dataSource = [
        { name: 'Hamburger', price: '15', claimer: "John" },
        { name: 'Pizza', price: '10'},
    ]
    const [data, setData] = React.useState(dataSource)
    const renderAction: TableColumnRender<Item> = (value, rowData, index) => {
        if(!rowData.claimer) {
            return <Checkbox></Checkbox>
        }
        else {
            return <p>{`Claimed by ${rowData.claimer}`}</p>
        }
        
    };
    return (
    <div className='nav-offset'>
        <Page>
            <Page.Content>
                <h1>Claim SplitIt</h1>
                <p>Fill in your name and claim your items</p>
                <Spacer h='1' />
                <Input scale={4/3} placeholder="John Smith">Username</Input>
                <Spacer h='1' />
                <Table data={data} onChange={value => setData(value)}>
                    <Table.Column prop="name" label="Name" />
                    <Table.Column prop="price" label="Price" />
                    <Table.Column prop="claimer" label="Claim" width={150} render={renderAction} />
                </Table>
                <Spacer h='1' />
                <Button>Claim Selected Items</Button> 
            </Page.Content>
        </Page>
    </div> 
  );
}

export default ClaimComponent;