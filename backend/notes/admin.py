from django.contrib import admin
from .models import Note  # ✅ import your model

admin.site.register(Note)  # ✅ register it
