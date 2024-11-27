from django.db import models

# Create your models here.


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
        null=True,
        verbose_name='Предметы',
        related_name='concepts'
    )

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
