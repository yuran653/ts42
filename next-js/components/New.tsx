'use client'

import { useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

function New() {
  const clientRef = useRef<W3CWebSocket | null>(null);
  const message = 'Hello from client!';

  useEffect(() => {
		const client = new W3CWebSocket('ws://localhost:8000/test/');
	
		client.onopen = () => {
		console.log('WebSocket Client Connected ✅');
		sendMessage();
		};
	
		const sendMessage = () => {
		if (client.readyState === client.OPEN) {
			client.send(message);
			setTimeout(sendMessage, 100);
		}
		};
	
		client.onmessage = (message) => {
		console.log('Received message:', message.data);	
		};
	
		client.onerror = (error) => {
		console.log('WebSocket Error:', error);	
		};
	
		client.onclose = (event) => {
			console.log('WebSocket Closed:', event);
			console.log('Close code:', event.code);
			console.log('Close reason:', event.reason);
		};
	
		clientRef.current = client;
	
		return () => {
		client.close();
		};
	}, []);
  
  const sendMessage = () => {
	if (clientRef.current && clientRef.current.readyState === clientRef.current.OPEN) {
	  clientRef.current.send('Hello from client!');
	} else {
	  console.log('Cannot send message: WebSocket is not open');
	}
  };

  return (
    <div>
      <button onClick={sendMessage}>Send WS (see console)</button>
    </div>
  );
}

export default New;