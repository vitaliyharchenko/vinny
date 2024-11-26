from django.views.generic import TemplateView
from .models import Node, NodeRelation


# Create your views here.
class GraphView(TemplateView):

    template_name = "graph.html"

    def get_context_data(self, *args, **kwargs):
        context = super(GraphView, self).get_context_data(*args, **kwargs)

        # достаем граф из базы
        graph = {
            'nodes': [],
            'links': []
        }

        for node in Node.objects.filter(concept_id=1):
            node_data = {
                'id': node.pk,
                'title': node.title,
                'type': node.type
            }
            graph['nodes'].append(node_data)

        for edge in NodeRelation.objects.all():
            edge_data = {
                'from': edge.parent.pk,
                'to': edge.child.pk
            }
            graph['links'].append(edge_data)

        context['graph'] = graph

        # граф из запроса GPT
        context['graph_gpt'] = '''{
            "nodes": [
                {"id": 1, "title": "Определение квадратного уравнения", "type": "KN"},
                {"id": 2, "title": "Стандартная форма квадратного уравнения", "type": "KN"},
                {"id": 3, "title": "Вывод формулы корней через дискриминант", "type": "UN"},
                {"id": 4, "title": "Решение примеров квадратных уравнений", "type": "CS"},
                {"id": 5, "title": "Решение квадратных уравнений через дискриминант", "type": "SK"},
                {"id": 6, "title": "Теорема Виета и её применение", "type": "UN"},
                {"id": 7, "title": "Решение квадратных уравнений по теореме Виета", "type": "SK"},
                {"id": 8, "title": "Решение текстовых задач с использованием квадратных уравнений", "type": "SK"},
                {"id": 9, "title": "Неполные квадратные уравнения", "type": "KN"},
                {"id": 10, "title": "Решение неполных квадратных уравнений", "type": "SK"},
                {"id": 11, "title": "Приведенные квадратные уравнения", "type": "KN"},
                {"id": 12, "title": "Преобразование квадратных уравнений к приведенной форме", "type": "SK"},
                {"id": 13, "title": "Анализ зависимости корней от значения дискриминанта", "type": "UN"}
            ],
            "links": [
                {"from": 1, "to": 2},
                {"from": 2, "to": 3},
                {"from": 3, "to": 4},
                {"from": 4, "to": 5},
                {"from": 3, "to": 6},
                {"from": 6, "to": 7},
                {"from": 2, "to": 9},
                {"from": 9, "to": 10},
                {"from": 2, "to": 11},
                {"from": 11, "to": 12},
                {"from": 5, "to": 8},
                {"from": 3, "to": 13},
                {"from": 5, "to": 13},
                {"from": 7, "to": 8},
                {"from": 10, "to": 8}
            ]
        }'''

        context['graph_gpt_1'] = '''{
            "nodes": [
                {"id": 1, "title": "Определение квадратного уравнения", "type": "KN"},
                {"id": 2, "title": "Стандартная форма квадратного уравнения", "type": "KN"},
                {"id": 3, "title": "Коэффициенты квадратного уравнения", "type": "KN"},
                {"id": 4, "title": "Дискриминант квадратного уравнения", "type": "KN"},
                {"id": 5, "title": "Корни квадратного уравнения", "type": "KN"},
                {"id": 6, "title": "Виета теорема и её применение", "type": "KN"},
                {"id": 7, "title": "Решение квадратных уравнений с помощью факторизации", "type": "SK"},
                {"id": 8, "title": "Решение квадратных уравнений с помощью квадратной формулы", "type": "SK"},
                {"id": 9, "title": "Решение квадратных уравнений с помощью завершения квадрата", "type": "SK"},
                {"id": 10, "title": "Анализ влияния коэффициентов на график квадратичной функции", "type": "UN"},
                {"id": 11, "title": "Графическое решение квадратных уравнений", "type": "CS"},
                {"id": 12, "title": "Применение квадратных уравнений в физике", "type": "CS"}
            ],
            "links": [
                {"from": 1, "to": 2},
                {"from": 2, "to": 3},
                {"from": 3, "to": 4},
                {"from": 4, "to": 5},
                {"from": 2, "to": 5},
                {"from": 3, "to": 10},
                {"from": 5, "to": 6},
                {"from": 4, "to": 8},
                {"from": 5, "to": 8},
                {"from": 4, "to": 9},
                {"from": 5, "to": 9},
                {"from": 5, "to": 7},
                {"from": 7, "to": 11},
                {"from": 8, "to": 11},
                {"from": 9, "to": 11},
                {"from": 10, "to": 11},
                {"from": 12, "to": 11}
            ]
        }'''

        return context
