from django.contrib import admin
from .models import GraphNode


@admin.register(GraphNode)
class GraphNodeAdmin(admin.ModelAdmin):
    search_fields = ["title"]
    list_filter = ["node_type"]
