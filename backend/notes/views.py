from rest_framework import viewsets, permissions, generics
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from .models import Note
from .serializers import NoteSerializer, RegisterSerializer  # <-- ADD THIS


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all().order_by('-created_at')
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user).order_by('-created_at')

# User registration view

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = []

