from django.contrib import admin
from .models import GraphNode, NodeRelation


@admin.register(GraphNode)
class GraphNodeAdmin(admin.ModelAdmin):
    search_fields = ["title"]
    autocomplete_fields = ["concepts", "subjects"]
    list_filter = ["node_type"]


@admin.register(NodeRelation)
class NodeRelationAdmin(admin.ModelAdmin):
    autocomplete_fields = ["parent", "child"]
    list_filter = ["parent", "child"]
