'use client'

import { useEffect, useRef, useState, useCallback } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

function Game() {
	const clientRef = useRef<W3CWebSocket | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const contextRef = useRef<CanvasRenderingContext2D | null>(null);
	const [squareX, setSquareX] = useState(0);
	const [squareY, setSquareY] = useState(0);
	const [score1, setScore1] = useState(0);
	const [score2, setScore2] = useState(0);
	const [paddle1Y, setPaddle1Y] = useState(200); // Начальная позиция ракетки
	const [paddle2Y, setPaddle2Y] = useState(200); // Начальная позиция ракетки
	const squareSize = 2;
	const paddleWidth = 2;
	const paddleHeight = 50;
	const screen = { w: 780, h: 400 }
	const [pressedKeys, setPressedKeys] = useState<{ [key: string]: boolean }>({});

	const drawSquare = useCallback((x: number, y: number) => {
		const canvas = canvasRef.current;
		const context = contextRef.current;
		if (canvas && context) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillRect(x, y, squareSize, squareSize);
		// Рисуем ракетку
		context.fillRect(0, paddle1Y - paddleHeight/2, paddleWidth, paddleHeight);
		context.fillRect(screen.w-paddleWidth, paddle2Y - paddleHeight/2, paddleWidth, paddleHeight);
		}
	}, [squareSize, paddle1Y, paddle2Y, screen.w]);

	const handleKeyDown = useCallback((event: KeyboardEvent) => {
		setPressedKeys((prevKeys) => ({
		  ...prevKeys,
		  [event.key]: true,
		}));
	  }, []);
	  
	  const handleKeyUp = useCallback((event: KeyboardEvent) => {
		setPressedKeys((prevKeys) => ({
		  ...prevKeys,
		  [event.key]: false,
		}));
	  }, []);
	  
	  useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);
	  
		return () => {
		  window.removeEventListener('keydown', handleKeyDown);
		  window.removeEventListener('keyup', handleKeyUp);
		};
	  }, [handleKeyDown, handleKeyUp]);
	  
	  useEffect(() => {
		let newPaddle1Y = paddle1Y;
		let newPaddle2Y = paddle2Y;
	  
		if (pressedKeys['q'] || pressedKeys['Q']) {
		  newPaddle1Y = Math.max(0 + paddleHeight/2, newPaddle1Y - 0.1);
		}
		if (pressedKeys['a'] || pressedKeys['A']) {
		  newPaddle1Y = Math.min(screen.h - paddleHeight/2, newPaddle1Y + 0.1);
		}
		if (pressedKeys['ArrowUp']) {
		  newPaddle2Y = Math.max(0 + paddleHeight/2, newPaddle2Y - 0.1);
		}
		if (pressedKeys['ArrowDown']) {
		  newPaddle2Y = Math.min(screen.h - paddleHeight/2, newPaddle2Y + 0.1);
		}
	  
		setPaddle1Y(newPaddle1Y);
		setPaddle2Y(newPaddle2Y);
	  }, [pressedKeys, paddle1Y, paddle2Y, screen.h, paddleHeight]);
	  

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
			const [x, y, raquet_1, raquet_2, score1, score2] = (message.data as string).split(',').map(Number);
			setSquareX(x);
			setSquareY(y);
			setScore1(score1);
			setScore2(score2);
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
			// округлить paddle1Y до целого числа
			clientRef.current.send(Math.round(paddle1Y)+','+Math.round(paddle2Y));
		}
	}, [paddle1Y, paddle2Y]);

	return (
		<div>
			<canvas ref={canvasRef} width={screen.w} height={screen.h} className='bg-white w-full h-auto'/>
			<div className='flex justify-between pt-32 absolute text-5xl top-32 w-full opacity-50'>
                <div className='flex-1 text-black text-center pt-24'>{score1}</div>
                <div className='flex-1 text-black text-center pt-24'>{score2}</div>
            </div>
		</div>
	);
}

export default Game;