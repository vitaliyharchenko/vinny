from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.graph.views import GraphView, NodeViewSet, EdgeViewSet, NodeTypeChoicesView
from apps.methodics.views import SubjectViewSet, ConceptViewSet
from apps.users.views import UserViewSet


router = DefaultRouter()
router.register(r'nodes', NodeViewSet, basename='node')
router.register(r'edges', EdgeViewSet, basename='edge')
router.register(r'concepts', ConceptViewSet, basename='concept')
router.register(r'subjects', SubjectViewSet, basename='subject')
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('node_type_choices/', NodeTypeChoicesView.as_view(),
         name='node_type_choices'),
    path('graph/', GraphView.as_view()),
]

# •	GET /graph/ – весь граф
# •	GET /graph/?subject=Математика отфильтрует узлы, связанные с предметом “Математика”.
# •	GET /graph/?subject=Математика&concept=Квадратные%20уравнения отфильтрует узлы, сначала по предмету, затем из этих узлов — по концепту “Квадратные уравнения”.

# •	GET /nodes/ – список всех узлов
# •	POST /nodes/ – создать узел
# •	GET /nodes/{pk}/ – получить узел по pk
# •	PUT /nodes/{pk}/ – обновить узел
# •	DELETE /nodes/{pk}/ – удалить узел

# •	GET /node_type_choices/ – список всех типов ребер

# •	GET /edges/ – список всех ребер
# •	POST /edges/ – создать ребро (указать parent, child)
# •	GET /edges/{pk}/ – получить ребро
# •	PUT /edges/{pk}/ – обновить ребро
# •	DELETE /edges/{pk}/ – удалить ребро

# •	GET /subjects/ для получения списка всех subjects
# •	GET /subjects/{pk}/ для получения конкретного subject по его pk

# •	GET concepts/: список всех концептов
# •	POST concepts/: создание нового концепта
# •	GET concepts/{pk}/: получить концепт по pk
# •	PUT concepts/{pk}/: обновить концепт
# •	DELETE concepts/{pk}/: удалить концепт

# •	GET /users/: получить список всех пользователей
# •	POST /users/: создать нового пользователя
# •	GET /users/{pk}/: получить конкретного пользователя по pk
# •	PUT /users/{pk}/: обновить пользователя
# •	PATCH /users/{pk}/: частично обновить
