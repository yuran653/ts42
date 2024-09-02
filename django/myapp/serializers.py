from rest_framework import serializers
from .models import Games
from django.contrib.auth.models import User

# class UserSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = Users
# 		fields = ['id', 'nickname', 'username', 'password', 'avatar', 'created_at', 'updated_at']
# 		extra_kwargs = {'password': {'write_only': True}}

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id', 'username', 'email', 'password']
		extra_kwargs = {'password': {'write_only': True, 'min_length': 8}}

class GameSerializer(serializers.ModelSerializer):
	class Meta:
		model = Games
		fields = ['id', 'user_one_id', 'user_two_id', 'user_one_score', 'user_two_score', 'created_at', 'updated_at', 'status']
	
class OTPRequestSerializer(serializers.Serializer):
	username = serializers.CharField()

class OTPVerifySerializer(serializers.Serializer):
	username = serializers.CharField()
	otp = serializers.CharField()