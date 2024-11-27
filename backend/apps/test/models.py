from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField


# политики проверки
class PolicyType:
    ONE_WRONG_MINUS_ONE = 1
    ONE_WRONG_MINUS_ALL = 2


POLICY_CHOICES = [
    (PolicyType.ONE_WRONG_MINUS_ONE, 'Один неверный ответ, минус один балл.'),
    (PolicyType.ONE_WRONG_MINUS_ALL, 'Один неверный ответ, минус все баллы.'),
]

# типы заданий


class QuestionType:
    STRING = 'string'
    FLOAT = 'numeric'
    FLOAT_TOLERANCE = 'numeric_tolerance'
    ORDERED_SET = 'ordered_set'
    UNORDERED_SET = 'unordered_set'
    SINGLE_CHOICE = 'single_choice'
    MULTIPLE_CHOICE = 'multiple_choice'


QUESTION_TYPE_CHOICES = [
    (QuestionType.STRING, 'Обычная проверка строки'),
    (QuestionType.FLOAT, 'Проверка числа'),
    (QuestionType.ORDERED_SET, 'Набор символов в строгом порядке'),
    (QuestionType.UNORDERED_SET, 'Набор символов в случайном порядке'),
    (QuestionType.SINGLE_CHOICE, 'Выбор одного верного ответа'),
    (QuestionType.MULTIPLE_CHOICE, 'Выбор нескольких верных ответов'),
]


class Question(models.Model):
    content = RichTextUploadingField(verbose_name='Условие задания')

    question_type = models.CharField(
        max_length=50, choices=QUESTION_TYPE_CHOICES, verbose_name='Тип задания')

    max_score = models.SmallIntegerField(
        verbose_name='Максимальный балл',
        default=1,
    )

    # все про проверку
    tolerance = models.FloatField(
        null=True, blank=True, verbose_name='допустимая погрешность (для численного ответа)', default=0)
    checking_policy = models.SmallIntegerField(
        verbose_name='Политика проверки заданий',
        choices=POLICY_CHOICES,
        default=PolicyType.ONE_WRONG_MINUS_ONE,
    )

    # привязка к графу
    graph_nodes = models.ManyToManyField(
        'graph.GraphNode', verbose_name='привязан к вершинам графа:', related_name='questions', blank=True)

    class Meta:
        verbose_name = 'задание'
        verbose_name_plural = 'задания'

    def __str__(self):
        return f'#{self.pk}. {self.content[:30]}...'

    def all_options(self):
        opts = QuestionOption.objects.filter(question=self)
        return opts


class QuestionOption(models.Model):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="options"
    )
    is_correct = models.BooleanField(default=False, verbose_name='Правильный?')
    option_text = RichTextUploadingField(
        verbose_name='Текст варианта с разметкой', blank=True, null=True)
    help_text = RichTextUploadingField(
        verbose_name='Подсказка', blank=True, null=True)

    class Meta:
        verbose_name = 'Вариант ответа'
        verbose_name_plural = 'Варианты ответов'

    def __str__(self):
        return f"Option {self.id} for Question {self.question.id}"
