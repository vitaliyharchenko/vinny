from django.db import models


KNOW = 'KN'
UNDERSTAND = 'UN'
CASES = 'CS'
SKILLS = 'SK'
TYPE_CHOICES = [
    (KNOW, 'Понятие (знаю)'),
    (UNDERSTAND, 'Закономерность (понимаю)'),
    (CASES, 'Кейс (наблюдаю)'),
    (SKILLS, 'Навык (умею)'),
]


class GraphNode(models.Model):
    title = models.CharField("Название узла", max_length=200)
    description = models.TextField(verbose_name='Комментарий методиста')
    node_type = models.CharField(
        max_length=2, choices=TYPE_CHOICES, verbose_name='тип узла')

    class Meta:
        verbose_name = 'вершина графа'
        verbose_name_plural = 'вершины графа'

    def __str__(self):
        return f"{self.title}"


class NodeRelation(models.Model):
    """
        Связь в графе
    """
    parent = models.ForeignKey(
        GraphNode,
        related_name='parent_node',
        verbose_name='От вершины...',
        on_delete=models.CASCADE
    )
    child = models.ForeignKey(
        GraphNode,
        related_name='child_node',
        verbose_name='...к вершине',
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = 'ребро в графе'
        verbose_name_plural = 'ребра в графе'
        unique_together = ('parent', 'child',)

    def __str__(self):
        return f"Ребро от {self.parent.title[:20]} к {self.child.title[:20]}"
