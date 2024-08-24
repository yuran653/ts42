'use client'

import { useEffect, useRef, useState, useCallback } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

function New() {
  const clientRef = useRef<W3CWebSocket | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [squareX, setSquareX] = useState(0);
  const [squareY, setSquareY] = useState(0);
  const [paddleY, setPaddleY] = useState(200); // Начальная позиция ракетки
  const squareSize = 2;
  const paddleWidth = 2;
  const paddleHeight = 50;
  const screen = { w: 780, h: 400 }

  const drawSquare = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillRect(x, y, squareSize, squareSize);
      // Рисуем ракетку
      context.fillRect(0, paddleY - paddleHeight/2, paddleWidth, paddleHeight);
    }
  }, [squareSize, paddleY]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      setPaddleY((prev) => Math.max(0 + paddleHeight/2, prev - 10));
    } else if (event.key === 'ArrowDown') {
      setPaddleY((prev) => Math.min(screen.h - paddleHeight/2, prev + 10));
    }
  }, [screen.h]);

  useEffect(() => {
    const client = new W3CWebSocket('ws://localhost:8000/test/');

    client.onopen = () => {
      console.log('WebSocket Client Connected ✅');
      startUpdatingSquarePosition();
    };

    const startUpdatingSquarePosition = () => {
      if (clientRef.current && clientRef.current.readyState === clientRef.current.OPEN) {
        clientRef.current.send('get_position');
        setTimeout(startUpdatingSquarePosition, 100);
      } else {
        console.log('Cannot update square position: WebSocket is not open');
      }
    };

    client.onmessage = (message) => {
    //   console.log('Received message:', message.data);
      const [x, y] = (message.data as string).split(',').map(Number);
      setSquareX(x);
      setSquareY(y);
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

    // Setup canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        contextRef.current = context;
      }
    }

    // Добавляем обработчик клавиатуры
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      client.close();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    drawSquare(squareX, squareY);
  }, [squareX, squareY, drawSquare]);

  useEffect(() => {
    // Отправляем новую позицию ракетки на сервер
    if (clientRef.current && clientRef.current.readyState === clientRef.current.OPEN) {
		// console.log('Sending paddleY:', paddleY);
    	clientRef.current.send(paddleY);
    }
  }, [paddleY]);

  return (
    <div>
      <canvas ref={canvasRef} width={screen.w} height={screen.h} className='bg-white w-full h-auto'/>
    </div>
  );
}

export default New;