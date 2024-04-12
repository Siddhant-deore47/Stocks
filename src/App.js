import './App.css';

import {useEffect,useState} from 'react';
import protobuf from 'protobufjs';
const { Buffer } = require('buffer/');

function formatter(price){

  return (Number(price).toFixed(2));
}

function App() {
  const [current,setCurrent] = useState(1);

  const [stock,setStock] = useState('NSEBANK');

  
  useEffect(()=>{
    const ws = new WebSocket('wss://streamer.finance.yahoo.com');
    protobuf.load('./YPricingData.proto',(error,root)=>{
      if(error){
        console.log(error);
      }
const Yaticker = root.lookupType('yaticker');

ws.onopen = function open() {
  console.log('connected');
  ws.send(JSON.stringify({
    subscribe: ['GME']
  }));
};

ws.onclose = function close() {
  console.log('disconnected');
};

ws.onmessage = function incoming(data) {
  console.log('comming message');
  const next = Yaticker.decode(new Buffer(data.data,'base64'));
  console.log(Yaticker.decode(new Buffer(data.data,'base64')));
  setCurrent(next);
};
});
},[]);
  return (
    <div>
      <h3>Stock Details</h3>
      {current && <h2>{formatter(current.price)}</h2>}
    </div>
  );
}

export default App;
