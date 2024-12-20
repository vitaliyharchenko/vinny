# Generated by Django 3.2.25 on 2024-11-28 11:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('methodics', '0006_alter_classfromtag_description'),
        ('graph', '0003_graphnode_testability'),
    ]

    operations = [
        migrations.AlterField(
            model_name='graphnode',
            name='concepts',
            field=models.ManyToManyField(default=None, related_name='graph_nodes', to='methodics.Concept', verbose_name='Концепты'),
        ),
        migrations.AlterField(
            model_name='graphnode',
            name='description',
            field=models.TextField(blank=True, null=True, verbose_name='Комментарий методиста'),
        ),
        migrations.AlterField(
            model_name='graphnode',
            name='subjects',
            field=models.ManyToManyField(default=None, related_name='graph_nodes', to='methodics.Subject', verbose_name='Предметы'),
        ),
    ]
