# Generated by Django 3.2.25 on 2024-11-27 08:49

import ckeditor_uploader.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('graph', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', ckeditor_uploader.fields.RichTextUploadingField(verbose_name='Условие задания')),
                ('question_type', models.CharField(choices=[('string', 'Обычная проверка строки'), ('numeric', 'Проверка числа'), ('numeric_tolerance', 'Проверка числа с погрешностью'), ('ordered_set', 'Набор символов в строгом порядке'), ('unordered_set', 'Набор символов в случайном порядке'), ('single_choice', 'Выбор одного верного ответа'), ('multiple_choice', 'Выбор нескольких верных ответов')], max_length=50, verbose_name='Тип задания')),
                ('max_score', models.SmallIntegerField(default=1, verbose_name='Максимальный балл')),
                ('tolerance', models.FloatField(blank=True, null=True)),
                ('checking_policy', models.SmallIntegerField(choices=[(1, 'Один неверный ответ, минус один балл.'), (2, 'Один неверный ответ, минус все баллы.')], default=1, verbose_name='Политика проверки заданий')),
                ('graph_nodes', models.ManyToManyField(blank=True, related_name='questions', to='graph.GraphNode')),
            ],
            options={
                'verbose_name': 'задание',
                'verbose_name_plural': 'задания',
            },
        ),
        migrations.CreateModel(
            name='QuestionOption',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_correct', models.BooleanField(default=False, verbose_name='Правильный?')),
                ('option_text', ckeditor_uploader.fields.RichTextUploadingField(blank=True, null=True, verbose_name='Текст варианта с разметкой')),
                ('help_text', ckeditor_uploader.fields.RichTextUploadingField(blank=True, null=True, verbose_name='Подсказка')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='options', to='test.question')),
            ],
            options={
                'verbose_name': 'Вариант ответа',
                'verbose_name_plural': 'Варианты ответов',
            },
        ),
    ]
