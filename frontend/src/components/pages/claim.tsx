import {Page, Table, Checkbox} from '@geist-ui/react';
import { TableColumnRender } from '@geist-ui/react/esm/table';
import React from 'react';

function ClaimComponent() {
    type Item = {
        name: string
        price: number
        claim: boolean
      }
    const dataSource = [
        { name: 'Hamburger', price: '15', claim: true },
        { name: 'Pizza', price: '10', claim: false },
    ]
    const [data, setData] = React.useState(dataSource)
    const renderAction: TableColumnRender<Item> = (value, rowData, index) => {
        return (
            <Checkbox checked={rowData.claim}></Checkbox>
        )
    };
    return (
    <Page>
      <Page.Content>
        <h1>SPLITIT CLAIM</h1>
        
        <Table data={data} onChange={value => setData(value)}>
            <Table.Column prop="name" label="Name" />
            <Table.Column prop="price" label="Price" />
            <Table.Column prop="claim" label="Claim" width={150} render={renderAction} />
        </Table>
      </Page.Content>
    </Page>
  );
}

export default ClaimComponent;