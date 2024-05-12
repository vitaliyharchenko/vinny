# Generated by Django 5.0.6 on 2024-05-11 14:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('graph', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Concept',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300, verbose_name='Концепт')),
            ],
            options={
                'verbose_name': 'концепт',
                'verbose_name_plural': 'концепты',
            },
        ),
        migrations.AddField(
            model_name='node',
            name='concept',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_DEFAULT, to='graph.concept'),
        ),
    ]