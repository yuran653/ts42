import React, { useEffect, useRef } from 'react';

// pong game with two paddles and a ball

const Game = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
  
	useEffect(() => {
	  const canvas = canvasRef.current;
	  const context = canvas?.getContext('2d');
  
	  if (!context) {
		return;
	  }
  
	  const canvasWidth = canvas?.width
	  const canvasHeight = canvas?.height
  
	  const paddleWidth = 10;
	  const paddleHeight = 100;
	  const paddleSpeed = 5;
  
	  const player1 = {
		x: 0,
		y: canvasHeight / 2 - paddleHeight / 2,
		width: paddleWidth,
		height: paddleHeight,
		dy: 0,
	  };
  
	  const player2 = {
		x: canvasWidth - paddleWidth,
		y: canvasHeight / 2 - paddleHeight / 2,
		width: paddleWidth,
		height: paddleHeight,
		dy: 0,
	  };
  
	  const ball = {
		x: canvasWidth / 2,
		y: canvasHeight / 2,
		radius: 10,
		speed: 5,
		dx: 5,
		dy: 5,
	  };
  
	  const drawPaddle = (x: number, y: number, width: number, height: number) => {
		context.fillStyle = 'white';
		context.fillRect(x, y, width, height);
	  };
  
	  const drawBall = (x: number, y: number, radius: number) => {
		context.beginPath();
		context.arc(x, y, radius, 0, Math.PI * 2);
		context.fillStyle = 'white';
		context.fill();
		context.closePath();
	  };
  
	  const draw = () => {
		context.clearRect(0, 0, canvasWidth, canvasHeight);
  
		drawPaddle(player1.x, player1.y, player1.width, player1.height);
		drawPaddle(player2.x, player2.y, player2.width, player2.height);
		drawBall(ball.x, ball.y, ball.radius);
	  };
  
	  const update = () => {
		player1.y += player1.dy;
		player2.y += player2.dy;
  
		ball.x += ball.dx;
		ball.y += ball.dy;
  
		// Проверка столкновения с верхней и нижней стеной
		if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvasHeight) {
		  ball.dy = -ball.dy;
		}
  
		// Проверка столкновения с левой и правой ракеткой
		if (
		  ball.x - ball.radius <= player1.x + player1.width &&
		  ball.y >= player1.y &&
		  ball.y <= player1.y + player1.height
		) {
		  ball.dx = -ball.dx;
		}
  
		if (
		  ball.x + ball.radius >= player2.x &&
		  ball.y >= player2.y &&
		  ball.y <= player2.y + player2.height
		) {
		  ball.dx = -ball.dx;
		}
  
		// Проверка выхода за границы поля
		if (ball.x - ball.radius < 0) {
		  ball.x = canvasWidth / 2;
		  ball.y = canvasHeight / 2;
		  ball.dx = -ball.dx;
		}
  
		if (ball.x + ball.radius > canvasWidth) {
		  ball.x = canvasWidth / 2;
		  ball.y = canvasHeight / 2;
		  ball.dx = -ball.dx;
		}
  
		draw();
	  };
  
	  const keyDownHandler = (event: KeyboardEvent) => {
		switch (event.key) {
		  case 'w':
			player1.dy = -paddleSpeed;
			break;
		  case 's':
			player1.dy = paddleSpeed;
			break;
		  case 'ArrowUp':
			player2.dy = -paddleSpeed;
			break;
		  case 'ArrowDown':
			player2.dy = paddleSpeed;
			break;
		}
	  };
  
	  const keyUpHandler = (event: KeyboardEvent) => {
		switch (event.key) {
		  case 'w':
		  case 's':
			player1.dy = 0;
			break;
		  case 'ArrowUp':
		  case 'ArrowDown':
			player2.dy = 0;
			break;
		}
	  };
  
	  document.addEventListener('keydown', keyDownHandler);
	  document.addEventListener('keyup', keyUpHandler);
  
	  const gameLoop = setInterval(update, 1000 / 60);
  
	  return () => {
		clearInterval(gameLoop);
		document.removeEventListener('keydown', keyDownHandler);
		document.removeEventListener('keyup', keyUpHandler);
	  };
	}, []);
  
	return <canvas ref={canvasRef} width={900} height={300} />;
  };



export default Game