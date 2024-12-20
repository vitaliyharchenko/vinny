from django.db import models

# Сюда попадут все теги, которые могут относиться и к графу и к заданиям
# Это например Предметы, концепты, номера классов, с которого можно давать такое по ФГОС


class Subject(models.Model):
    """
        Предмет: физика, математика, etc
    """
    title = models.CharField(
        verbose_name='Название предмета',
        max_length=300)

    description = models.TextField(
        verbose_name='Комментарий методиста', null=True)

    class Meta:
        verbose_name = 'предмет'
        verbose_name_plural = 'предметы'

    def __str__(self):
        return self.title


class ClassFromTag(models.Model):
    """
        Номер класса, с которого можно задавать такое задание
    """
    title = models.CharField(
        verbose_name='Название класса',
        max_length=300)

    class_number = models.PositiveIntegerField(
        verbose_name='Номер класса',
        unique=True
    )

    description = models.TextField(
        verbose_name='Комментарий методиста', null=True, blank=True)

    class Meta:
        verbose_name = 'класс'
        verbose_name_plural = 'классы'
        ordering = ['class_number']

    def __str__(self):
        return self.title


class Concept(models.Model):
    """
    Большая тема, объединяющая несколько вершин в подграф
    Пример: Квадратные уравнения
    """
    title = models.CharField(
        verbose_name='Название концепта',
        max_length=300)

    description = models.TextField(
        verbose_name='Комментарий методиста', null=True)

    subjects = models.ManyToManyField(
        Subject,
        default=None,
        verbose_name='Предметы',
        related_name='concepts'
    )

    class_from = models.ForeignKey(
        ClassFromTag, default=None, null=True, verbose_name='C какого класса преподается?', on_delete=models.CASCADE)

    is_active = models.BooleanField(
        default=False,
        verbose_name='Активен?'
    )

    class Meta:
        verbose_name = 'концепт'
        verbose_name_plural = 'концепты'

    def __str__(self):
        subjects_titles = ", ".join(
            subject.title for subject in self.subjects.all())
        return f"#{self.pk} {self.title} ({subjects_titles})"


class ConceptRelation(models.Model):
    """
        Связь в графе концептов
    """
    parent = models.ForeignKey(
        Concept,
        related_name='parent_node',
        verbose_name='От концепта...',
        on_delete=models.CASCADE
    )
    child = models.ForeignKey(
        Concept,
        related_name='child_node',
        verbose_name='...к концепту',
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = 'ребро в графе концептов'
        verbose_name_plural = 'ребра в графе концептов'
        unique_together = ('parent', 'child',)

    def __str__(self):
        return f"Ребро от концепта {self.parent.title[:20]} к {self.child.title[:20]}"
