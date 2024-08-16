from rest_framework import serializers
from .models import Users, Games

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'name', 'email', 'avatar', 'created_at', 'updated_at']

class GamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Games
        fields = ['id', 'user_one_id', 'user_two_id', 'user_one_score', 'user_two_score', 'created_at', 'updated_at', 'status']