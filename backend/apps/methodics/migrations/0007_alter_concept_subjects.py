# Generated by Django 3.2.25 on 2024-11-28 12:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('methodics', '0006_alter_classfromtag_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='concept',
            name='subjects',
            field=models.ManyToManyField(default=None, related_name='concepts', to='methodics.Subject', verbose_name='Предметы'),
        ),
    ]
