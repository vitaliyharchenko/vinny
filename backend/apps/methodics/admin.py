from django.contrib import admin
from .models import Subject, Concept, ClassFromTag

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


@admin.register(ClassFromTag)
class ClassFromAdmin(admin.ModelAdmin):
    search_fields = ["class_number"]
    search_help_text = "Поиск по классам"
