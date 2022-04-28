import {Page, Table, Spacer, Input, Button, useInput} from '@geist-ui/react';
import { TableColumnRender } from '@geist-ui/react/esm/table';
import React from 'react';

function ClaimComponent() {
    type Item = {
        name: string
        price: number
        claimer: string
    }
    const dataSource = [
        { name: 'Hamburger', price: 15, claimer: "John" },
        { name: 'Pizza', price: 10},
        { name: 'Taco', price: 12},
    ]
    const [data, setData] = React.useState(dataSource)
    const { state, bindings } = useInput("")

    const renderAction: TableColumnRender<Item> = (value, rowData, rowIndex) => {
        const updateHandler = () => {
            setData(last => {
                return last.map((item, dataIndex) => {
                    if (dataIndex !== rowIndex) return item;
                    if (state == null || state === "") return item;
                    else {
                        return {
                            name: rowData.name,
                            price: rowData.price,
                            claimer: state
                        }
                    }
                })
            })
        }
        if(!rowData.claimer) {
            return <Button onClick={updateHandler}>Claim</Button>
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
                <Input {...bindings} />
                <Spacer h='1' />
                <Table data={data} onChange={value => setData(value)}>
                    <Table.Column prop="name" label="Name" />
                    <Table.Column prop="price" label="Price" />
                    <Table.Column prop="claimer" label="Claim" width={150} render={renderAction} />
                </Table>
                <Spacer h='1' /> 
            </Page.Content>
        </Page>
    </div> 
  );
}

export default ClaimComponent;