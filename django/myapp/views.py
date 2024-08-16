from rest_framework import viewsets
from .models import Users, Games
from .serializers import UsersSerializer, GamesSerializer

class UsersViewSet(viewsets.ModelViewSet):
	queryset = Users.objects.all()
	serializer_class = UsersSerializer

class GamesViewSet(viewsets.ModelViewSet):
	queryset = Games.objects.all()
	serializer_class = GamesSerializer