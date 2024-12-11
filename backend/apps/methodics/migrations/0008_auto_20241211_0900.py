# Generated by Django 3.2.25 on 2024-12-11 09:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('methodics', '0007_alter_concept_subjects'),
    ]

    operations = [
        migrations.AddField(
            model_name='concept',
            name='class_from',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='methodics.classfromtag', verbose_name='C какого класса преподается?'),
        ),
        migrations.CreateModel(
            name='ConceptRelation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('child', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='child_node', to='methodics.concept', verbose_name='...к концепту')),
                ('parent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='parent_node', to='methodics.concept', verbose_name='От концепта...')),
            ],
            options={
                'verbose_name': 'ребро в графе концептов',
                'verbose_name_plural': 'ребра в графе концептов',
                'unique_together': {('parent', 'child')},
            },
        ),
    ]