'use client'

import { useEffect, useRef } from 'react';

function Ws() {
  const ws = useRef(null) as any;

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000/ws/test/');

    ws.current.onmessage = (event) => {
      console.log('Received message:', event.data);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  return (
    <div>
      <h1>Test Page</h1>
    </div>
  );
}

export default Ws;