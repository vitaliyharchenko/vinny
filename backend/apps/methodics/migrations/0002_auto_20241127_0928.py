# Generated by Django 3.2.25 on 2024-11-27 09:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('methodics', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='concept',
            name='description',
            field=models.TextField(null=True, verbose_name='Комментарий методиста'),
        ),
        migrations.AddField(
            model_name='subject',
            name='description',
            field=models.TextField(null=True, verbose_name='Комментарий методиста'),
        ),
    ]
