from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio

class TestConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		await self.accept()

		# Инициализация переменных
		self.screen_width = 780
		self.screen_height = 400
		self.ball_x = self.screen_width / 2
		self.ball_y = self.screen_height / 2
		self.move_x = 10  # Увеличьте значение для ускорения
		self.move_y = 10  # Увеличьте значение для ускорения
		self.raquet_1 = self.screen_height / 2

		# Запуск задачи для обновления состояния мяча
		self.update_task = asyncio.create_task(self.update_ball_position())

	async def disconnect(self, close_code):
		# Отмена задачи при отключении
		self.update_task.cancel()

	async def receive(self, text_data):
		# Принимаем данные от клиента
		try:
			self.raquet_1 = int(text_data)
		except ValueError:
			pass  # Игнорировать некорректные данные

	async def update_ball_position(self):
		while True:
			# Мяч попал в ракетку
			if (self.ball_x < 1 or self.ball_x > self.screen_width - 1):
				if self.ball_y >= self.raquet_1 - 25 and self.ball_y <= self.raquet_1 + 25:
					self.move_x *= -1
				else:
					self.ball_x = self.screen_width / 2
					self.ball_y = self.screen_height / 2

			# Логика движения мяча
			if self.ball_y >= self.screen_height or self.ball_y <= 0:
				self.move_y *= -1

			# if self.ball_x >= self.screen_width or self.ball_x <= 0:
			# 	self.move_x *= -1
			self.ball_y += self.move_y
			self.ball_x += self.move_x

			# Формирование строки с координатами
			self.count = f"{self.ball_x},{self.ball_y}"

			# Отправка данных через WebSocket
			await self.send(text_data=self.count)

			# Задержка для обновления
			await asyncio.sleep(0.04)  # Уменьшите значение для ускорения обновлений