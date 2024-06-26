# Generated by Django 5.0.6 on 2024-05-09 19:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Node',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='Название узла')),
                ('type', models.CharField(choices=[('KN', 'Понятие (знаю)'), ('UN', 'Закономерность (понимаю)'), ('CS', 'Кейс (наблюдаю)'), ('SK', 'Навык (умею)')], default='KN', max_length=2, verbose_name='тип узла')),
                ('testability', models.BooleanField(default=True, verbose_name='Проверяемая?')),
            ],
            options={
                'verbose_name': 'вершина графа',
                'verbose_name_plural': 'вершины графа',
            },
        ),
        migrations.CreateModel(
            name='NodeRelation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('child', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='child_node', to='graph.node', verbose_name='...к вершине')),
                ('parent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='parent_node', to='graph.node', verbose_name='От вершины...')),
            ],
            options={
                'verbose_name': 'ребро в графе',
                'verbose_name_plural': 'ребра в графе',
                'unique_together': {('parent', 'child')},
            },
        ),
    ]
