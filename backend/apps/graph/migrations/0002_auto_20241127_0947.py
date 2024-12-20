# Generated by Django 3.2.25 on 2024-11-27 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('methodics', '0004_auto_20241127_0942'),
        ('graph', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='graphnode',
            name='concepts',
            field=models.ManyToManyField(default=None, null=True, related_name='graph_nodes', to='methodics.Concept', verbose_name='Концепты'),
        ),
        migrations.AddField(
            model_name='graphnode',
            name='subjects',
            field=models.ManyToManyField(default=None, null=True, related_name='graph_nodes', to='methodics.Subject', verbose_name='Предметы'),
        ),
    ]
