from django.db import models

class Users(models.Model):
	name = models.CharField(max_length=100)
	email = models.EmailField(unique=True)
	password = models.CharField(max_length=100, default='')
	avatar = models.CharField(max_length=200, default='')
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

class Games(models.Model):
	user_one_id = models.IntegerField()
	user_two_id = models.IntegerField()
	user_one_score = models.IntegerField()
	user_two_score = models.IntegerField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	status = models.CharField(max_length=100)
