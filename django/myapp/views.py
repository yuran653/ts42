from rest_framework import generics
from rest_framework import viewsets
from .models import Games
from .serializers import UserSerializer, GameSerializer
from django.contrib.auth.models import User


# class UserViewSet(viewsets.ModelViewSet):
# 	queryset = Users.objects.all()
# 	serializer_class = UserSerializer

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GameViewSet(viewsets.ModelViewSet):
	queryset = Games.objects.all()
	serializer_class = GameSerializer