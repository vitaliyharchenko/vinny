from django.contrib import admin

from .models import Node, NodeRelation

# Register your models here.
class NodeAdmin(admin.ModelAdmin):
    pass


class NodeRelationAdmin(admin.ModelAdmin):
    pass


admin.site.register(Node, NodeAdmin)
admin.site.register(NodeRelation, NodeRelationAdmin)