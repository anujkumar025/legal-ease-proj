// import OpenAI from "openai"
import React, { useEffect, useState } from 'react';
import './chat.css'; // Make sure to create an App.css file for your styles
// import { config } from "dotenv"
// const { spawn } = require('child_process');
// import { spawn } from 'child_process';
import axios from 'axios';

function Chat() {
  const [wish, setWish] = useState('');
  let [imageUrl, setImageUrl] = useState(false);
  // const [showWish, setShowWish] = useState(false);

  // const showImage = () => {
  //   setImageUrl(true);
  // }

  const handleWishChange = (e) => {
    setWish(e.target.value);
  };
  // useEffect(() => {
  //   fetch('/get-image-url')
  //   .then((response) => response.json())
  //   .then((data) => setImageUrl(data.outputpath));
  // } , [fetch])

    const handleShowWish = async () => {
      // setShowWish(true);
      const onj ={"txt" : wish};
      const response = await axios.post("http://localhost:5001/chat", onj)
      setImageUrl(true);
      if(response === "reached"){
        console.log("dshgsg");
      }
      
    };
  

  return (
    
    <div className="app-container">
    <p><br></br></p>
      <p><br></br></p>
      <p><br></br></p>
      <p><br></br></p>
      {/* <p><br></br></p> */}
      
      <h1>Write your wish</h1>
      <input
      id='abc'
        type="text"
        placeholder="Type your prompt here"
        value={wish}
        onChange={handleWishChange}
      /><br></br>
      <button onClick={handleShowWish}>Create Contract</button>

      {/* {showWish && (
        <div className="wish-box">
          <p>Your Wish:</p>
          <p>{wish}</p>
        </div>
      )} */}
      {/* <button onClick={showImage}>Show Image</button> 
      <div><img src = "./legalease000.jpg" id='outputImage'className='outputImage'/></div> */}
      {imageUrl && <p> Image created successfully</p>}
      <a href="http://localhost:5174">
      <button >Create NFT</button>

      </a>
    </div>
  );
}

export default Chat;