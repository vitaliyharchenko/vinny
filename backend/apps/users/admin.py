from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group

from .models import User


class UserAdmin(BaseUserAdmin):
    list_display = ["first_name", "last_name", "username"]
    list_filter = ["is_staff"]
    readonly_fields = ['date_joined']
    search_fields = ["first_name", "last_name"]
    ordering = ["date_joined"]
    fieldsets = [
        (None, {"fields": ["username", "password"]}),
        ("Персональная информация", {"fields": [
         "first_name", "last_name"]}),
        ("Доступы", {"fields": ["is_staff", "is_active"]}),
        ("Дополнительно", {"fields": ["date_joined"]}),
    ]
    filter_horizontal = []


admin.site.register(User, UserAdmin)
admin.site.unregister(Group)
