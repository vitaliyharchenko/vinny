# Generated by Django 3.2.25 on 2024-11-27 09:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('methodics', '0002_auto_20241127_0928'),
    ]

    operations = [
        migrations.RenameField(
            model_name='concept',
            old_name='subject',
            new_name='subjects',
        ),
    ]