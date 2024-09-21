from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio

class TestConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		await self.accept()

		self.screen_width = 780
		self.screen_height = 400
		self.ball_x = self.screen_width / 2
		self.ball_y = self.screen_height / 2
		self.move_x = 8  # Увеличьте значение для ускорения
		self.move_y = 6  # Увеличьте значение для ускорения
		self.raquet_1 = self.screen_height / 2
		self.raquet_2 = self.screen_height / 2
		self.score_1 = 0
		self.score_2 = 0

		# Запуск задачи для обновления состояния мяча
		self.update_task = asyncio.create_task(self.update_ball_position())

	async def disconnect(self, close_code):
		# Отмена задачи при отключении
		self.update_task.cancel()

	async def receive(self, text_data):
		# Принимаем данные от клиента
		try:
			raquet_1, raquet_2 = map(int, text_data.split(','))
			self.raquet_1 = int(raquet_1)
			self.raquet_2 = int(raquet_2)
		except ValueError:
			pass  # Игнорировать некорректные данные

	async def update_ball_position(self):
		while True:
			# ball hit the raquet
			# ... or self.ball_x > self.screen_width - 1
			if self.ball_x < 3: 
				if self.ball_y >= self.raquet_1 - 25 and self.ball_y <= self.raquet_1 + 25:
					self.move_x *= -1
				else:
					self.ball_x = self.screen_width / 2
					self.ball_y = self.screen_height / 2
					self.score_2 += 1
			
			if self.ball_x > self.screen_width - 3:
				if self.ball_y >= self.raquet_2 - 25 and self.ball_y <= self.raquet_2 + 25:
					self.move_x *= -1
				else:
					self.ball_x = self.screen_width / 2
					self.ball_y = self.screen_height / 2
					self.score_1 += 1
					
			# reflect from up and down
			if self.ball_y >= self.screen_height or self.ball_y <= 0:
				self.move_y *= -1

			self.ball_y += self.move_y
			self.ball_x += self.move_x
			# Lock ball_x and ball_y within their respective intervals
			self.ball_x = max(0, min(self.ball_x, self.screen_width))
			self.ball_y = max(0, min(self.ball_y, self.screen_height))


			# prepare coordinates, {new_positions} and score
			self.count = f"{self.ball_x},{self.ball_y},{self.move_x},{self.move_y},{self.raquet_1},{self.raquet_2},{self.score_1},{self.score_2}"

			# send to websocket
			await self.send(text_data=self.count)

			# delay before update
			await asyncio.sleep(0.03)  # Уменьшите значение для ускорения обновлений