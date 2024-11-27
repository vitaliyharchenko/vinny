from django.contrib import admin
from .models import GraphNode


@admin.register(GraphNode)
class GraphNodeAdmin(admin.ModelAdmin):
    search_fields = ["title"]
    autocomplete_fields = ["concepts", "subjects"]
    list_filter = ["node_type"]
