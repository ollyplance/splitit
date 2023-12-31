
   
import {Page, Table, Spacer, Input, Button, useInput, Text, Divider} from '@geist-ui/react';
import { TableColumnRender } from '@geist-ui/react/esm/table';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc, updateDoc } from "firebase/firestore";
import {db} from '../../firebase.js'
import ReactDOM from "react-dom";
import { setEnvironmentData } from 'worker_threads';

function ClaimComponent() {
    const { id } = useParams();
    type Item = {
        name: string
        price: number
        quantity: number,
        claimed: string
    }

    type myItem = {
        price: number
        quantity: number,
        total: number
    }
    

    const splitInformation = {'name': 'Ski Trip', 'comments': 'I loved this trip! Now pay up! :)'}
    const dataSource = [
        { name: 'Hamburger', quantity: 1, price: 15, claimed: "John" },
        { name: 'Pizza', quantity: 1, price: 10, claimed: ''},
        { name: 'Taco', quantity: 1, price: 12, claimed: ''},
    ]
    const myClaimedItems : myItem[] = []

    const [splitInfo, setSplitInfo] = React.useState(splitInformation)
    const [data, setData] = React.useState(dataSource)
    const [myItems, setMyItems] = React.useState(myClaimedItems)
    const [docExists, setDocExists] = React.useState(false)
    const { state, bindings } = useInput("")

    useEffect( () => {
        const fetchData = async () => {
            if(id) {
                const docRef = doc(db, "split", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setDocExists(true);
                    setSplitInfo({'name': data.name, 'comments': data.comments});
                    setData(data.items)
                } else {
                    setDocExists(false);
                    console.log("No such document!");
                }
            }
        }
        fetchData().catch(console.error);

        return () => {}
    }, []);

    const updateSplit = async () => {
        if(id) {
            const docRef = doc(db, "split", id);
            await updateDoc(docRef, {
                items: data
            });
        }
    }


    /**
     * Description: Adding an item based on the item that is splittable
     * Adds a new object to a list
     * @param item  Item Object
     */
    const addItem = (item: Item) => {
        const myItem = {'price': item.price, 'quantity': item.quantity, 
            'total': item.price * item.quantity}
        const newData = [...myItems];
        newData.push(myItem);
        setMyItems(newData);
    }

    const removeItem = (newItem: myItem) => {
        const res = [];
        console.log("myItem");
        console.log(newItem);
        for (var item of myItems){
            console.log("not my item");
            console.log(item);
            if (item.price !== newItem.price && item.total !== newItem.total){
                res.push(item);
            }
        }
        setMyItems(res);
    }


            
    const renderAction: TableColumnRender<Item> = (value, rowData, rowIndex) => {
        const removeHandler = () => {
            setData(last => {
                return last.map((item, dataIndex) => {
                    if (dataIndex !== rowIndex) return item;
                    else {
                        const newItem = {
                            name: rowData.name,
                            price: rowData.price,
                            quantity: rowData.quantity,
                            claimed: ""
                        }
                        const newMyItem = {
                            price: newItem.price,
                            quantity: newItem.quantity,
                            total: newItem.price * newItem.quantity,
                        }
                        removeItem(newMyItem);
                        return newItem
                    }
                })
            });
        }

        const updateHandler = () => {
            setData(last => {
                return last.map((item, dataIndex) => {
                    if (dataIndex !== rowIndex) return item;
                    if (state == null || state === "") return item;
                    else {
                        const newItem = {
                            name: rowData.name,
                            price: rowData.price,
                            quantity: rowData.quantity,
                            claimed: state
                        }
                        addItem(newItem);
                        return newItem
                    }
                })
            });
        }


        if(!rowData.claimed) {
            return <Button onClick={updateHandler}>Claim</Button>
        }
        else {
            //adding a button to declaim the status
            return <p>{`Claimed by ${rowData.claimed}`}
                        <Button onClick={removeHandler}>De-Claim</Button>
                    </p>
            

        }
    };

    const getTotal = () => {
        let total = 0;
        for (let i = 0; i < myItems.length; i++) {
            total += myItems[i].total;
        }
        return total.toFixed(2);
    }

    const pay = () => {
        updateSplit();
    }

    if (docExists) {
        return (
            <div className='nav-offset'>
                <Page>
                    <Page.Content>
                        <h1>Claim SplitIt #{id}</h1>
                        <h2>{splitInfo.name}</h2>
                        <Text blockquote my={0}>{splitInfo.comments}</Text>
                        <Spacer h='1' />
                        <p>Fill in your name and claim your items</p>
                        <h3>Name:</h3>
                        <Input {...bindings} placeholder='John Doe'/>
                        <Spacer h='1' />
                        <h3>Receipt:</h3>
                        <Table data={data} onChange={value => setData(value)}>
                            <Table.Column prop="name" label="Name" />
                            <Table.Column prop="price" label="Price" />
                            <Table.Column prop="quantity" label="Quantity" />
                            <Table.Column prop="claimed" label="Claim" width={150} render={renderAction} />
                        </Table>
                        <Spacer h='3' />
                        <h2>My Claimed Items</h2>
                        <Table data={myItems} onChange={value => setMyItems(value)}>
                            <Table.Column prop="price" label="Price" />
                            <Table.Column prop="quantity" label="Quantity" />
                            <Table.Column prop="total" label="Total" />
                        </Table>
                        <Spacer h='1'/>
                        <Divider />
                        <h3>Total: ${getTotal()}</h3>
                        <Spacer h='1' />
                        <Button onClick={pay}>Pay Now</Button>
                    </Page.Content>
                </Page>
            </div> 
        );
    } else {
        return (
            <div className='nav-offset'>
                <Page>
                    <Page.Content>
                        <h1>Loading...</h1>
                    </Page.Content>
                </Page>
            </div>
        )
    }
    
}

export default ClaimComponent;