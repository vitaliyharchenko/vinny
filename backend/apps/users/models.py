from django.db import models
from django.contrib.auth.models import AbstractUser


USER_ROLE_CHOICES = [
    ('student', 'Ученик'),
    ('parent', 'Родитель'),
    ('admin', 'Администратор'),
]


class User(AbstractUser):
    role = models.CharField(
        max_length=20, choices=USER_ROLE_CHOICES, default='student')
    additional_info = models.JSONField(blank=True, null=True)
    parents = models.ManyToManyField(
        'self', symmetrical=False, related_name='children', blank=True)

    class Meta:
        verbose_name = 'пользователь'
        verbose_name_plural = 'пользователи'
