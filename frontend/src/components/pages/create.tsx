import {Progress, Button, Divider, Input, Page, Spacer, Table, Textarea} from '@geist-ui/react';
import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
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

  // OCR Stuff
  const [ocr, setOcr] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageData, setImageData] = useState("");
  const worker = createWorker({
    logger: (m) => {
      console.log(m);
      setProgress(Math.round(parseFloat(m.progress) * 100.0));
    },
  });

  const convertImageToText = async () => {
    if (!imageData) return;
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(imageData);
    setOcr(text);
    parseOCR(text);
  };

  useEffect(() => {
    convertImageToText();
  }, [imageData]);

  function handleImageChange(e : any) {
    const file = e.target.files[0];
    if(!file)return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri : string = reader.result as string;
      console.log({ imageDataUri });
      setImageData(imageDataUri);
    };
    reader.readAsDataURL(file);
  }

  function parseOCR(s : string) {
    var wordArr = s.split("\n");
    var skipWords = ["TOTAL", "CASH", "CHANGE", "PURCHASE"];
    var quantityArr = [];
    var nameArr = [];
    var priceArr = [];

    exit_loops:
    for (var word of wordArr) {
      for (var skipWord of skipWords){
        var re = new RegExp(skipWord, 'i');
        if(word.search(re) !== -1) {
          console.log(word);
          continue exit_loops;
        }
      }
      
      var pos = word.indexOf("$");
      if(pos !== -1) {
        var tempArr = (word.substring(0, pos)).split(" ");
        if(isNaN(parseInt(tempArr[0]))) {
          quantityArr.push("1");
          nameArr.push(word.substring(0, pos));
        }
        else {
          quantityArr.push(tempArr[0]);
          var len = tempArr[0].length;
          nameArr.push(word.substring(len, pos));
        }
        priceArr.push(word.substring(pos));
      }
    }
    var newDataSource = [];
    for (let i = 0; i < quantityArr.length; i++) {
      const newItem = {'name': nameArr[i], 'price': priceArr[i], 'quantity': quantityArr[i], 'edit': '', 'claimed':''};
      newDataSource.push(newItem);
    }
    setData(newDataSource);
  }

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
          <input type="file" name="" id="" onChange={handleImageChange} accept="image/*" />
          <Spacer h='1' />
          {progress !== 0 && progress !== 100 && <div><Progress value = {progress}/></div>}
          <Spacer h='1' />
          <img className = "imageData" src={imageData} alt="" />
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