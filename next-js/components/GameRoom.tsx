'use client'

import { useEffect, useRef, useState, useCallback } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

function GameRoom({mode, players, scoresUpdate}: {mode: number, players: any, scoresUpdate: any}) {
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
		context.fillStyle = 'white';
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
		let intervalId: ReturnType<typeof setInterval> | null = null;
	  
		const updatePaddle = () => {
		  setPaddle1Y((prevPaddle1Y) => {
			let newPaddle1Y = prevPaddle1Y;
			if (pressedKeys['q'] || pressedKeys['Q']) {
			  newPaddle1Y = Math.max(0 + paddleHeight / 2, newPaddle1Y - 5);
			}
			if (pressedKeys['a'] || pressedKeys['A']) {
			  newPaddle1Y = Math.min(screen.h - paddleHeight / 2, newPaddle1Y + 5);
			}
			return newPaddle1Y;
		  });
	  
		  setPaddle2Y((prevPaddle2Y) => {
			let newPaddle2Y = prevPaddle2Y;
			if (pressedKeys['ArrowUp']) {
			  newPaddle2Y = Math.max(0 + paddleHeight / 2, newPaddle2Y - 5);
			}
			if (pressedKeys['ArrowDown']) {
			  newPaddle2Y = Math.min(screen.h - paddleHeight / 2, newPaddle2Y + 5);
			}
			return newPaddle2Y;
		  });
		};
	  
		const startUpdatingPaddles = () => {
		  intervalId = setInterval(updatePaddle, 16); // 16ms = 60 FPS
		};
	  
		const stopUpdatingPaddles = () => {
		  if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		  }
		};
		startUpdatingPaddles();	  
		return stopUpdatingPaddles;
	  }, [pressedKeys, screen.h, paddleHeight]);

	useEffect(() => {
		const client = new W3CWebSocket('wss://localhost/ws/');

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
			const [x, y, raquet_1, raquet_2, score1, score2] = (message.data as string).split(',').map(Number)
			setSquareX(x)
			setSquareY(y)
			if (score1 == 3 || score2 == 3) {
				scoresUpdate(score1, score2)
				client.close()
			}
			setScore1(score1)
			setScore2(score2)
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
	}, [handleKeyDown, scoresUpdate]);

	useEffect(() => {
		drawSquare(squareX, squareY);
	}, [squareX, squareY, drawSquare]);

	useEffect(() => {
		// Отправляем координаты ракеток на сервер
		if (clientRef.current && clientRef.current.readyState === clientRef.current.OPEN) {
			clientRef.current.send(Math.round(paddle1Y)+','+Math.round(paddle2Y));
		}
	}, [paddle1Y, paddle2Y]);

	return (
		<div className='flex flex-col h-screen items-center justify-center relative'>
			<div className='flex w-full justify-center absolute top-0 h-screen items-center'>
				<div className='flex-1 text-white text-center'>{score1}</div>
				<div className='flex-1 text-white text-center'>{score2}</div>
			</div>
			<canvas ref={canvasRef} width={screen.w} height={screen.h} className='bg-black w-full h-full'/>
		</div>
	);
}

export default GameRoom