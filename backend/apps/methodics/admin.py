from django.contrib import admin
from .models import Subject, Concept

# Register your models here.


@admin.register(Concept)
class ConceptAdmin(admin.ModelAdmin):
    search_fields = ["title__icontains"]
    autocomplete_fields = ['subjects']
    search_help_text = "Поиск по названиям концептов"


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    search_fields = ["title__icontains"]
    search_help_text = "Поиск по названиям предметов"
