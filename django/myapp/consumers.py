from channels.generic.websocket import AsyncWebsocketConsumer
import json
import random

class TestConsumer(AsyncWebsocketConsumer):
	count = 0
	async def connect(self):
		await self.accept()

	async def disconnect(self, close_code):
		pass

	async def receive(self, text_data):
		# text_data_json = json.loads(text_data)
		# message = text_data_json['message']

		# await self.send(text_data=json.dumps({
		#     'message': message
		# }))
		self.count = str(random.randint(1, 9)) + ', ' + str(random.randint(1, 9))
		await self.send(self.count)