from django.contrib import admin
from .models import Question, QuestionOption


class QuestionOptionInline(admin.TabularInline):
    model = QuestionOption
    extra = 1


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'question_type')
    autocomplete_fields = ['graph_nodes']
    inlines = [QuestionOptionInline]
