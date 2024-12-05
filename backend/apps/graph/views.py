from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from .models import GraphNode, NodeRelation, TYPE_CHOICES
from .serializers import GraphNodeSerializer, NodeRelationSerializer


class GraphView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        # Получаем параметры фильтра из запроса
        subject_query = request.query_params.get('subject')
        concept_query = request.query_params.get('concept')
        subject_id = request.query_params.get('subject_id')
        concept_id = request.query_params.get('concept_id')

        # Начинаем с базового queryset
        nodes = GraphNode.objects.all()

        # Фильтр по subject (если указан)
        if subject_query:
            # Предполагается, что subject имеет поле title и у узлов ManyToMany к subjects
            nodes = nodes.filter(subjects__title__icontains=subject_query)

        if subject_id:
            nodes = nodes.filter(subjects__pk=subject_id)

        # Фильтр по concept (если указан)
        if concept_query:
            # Аналогично для concepts
            nodes = nodes.filter(concepts__title__icontains=concept_query)

        if concept_id:
            nodes = nodes.filter(concepts__pk=concept_id)

        # После фильтрации узлов, нам нужно отфильтровать ребра, чтобы показывать только те,
        # которые соединяют узлы из отфильтрованного набора
        node_pks = nodes.values_list('pk', flat=True)
        edges = NodeRelation.objects.filter(
            parent__in=node_pks, child__in=node_pks)

        nodes_serializer = GraphNodeSerializer(nodes, many=True)
        edges_serializer = NodeRelationSerializer(edges, many=True)

        return Response({'nodes': nodes_serializer.data, 'edges': edges_serializer.data})


class NodeViewSet(viewsets.ModelViewSet):
    queryset = GraphNode.objects.all()
    serializer_class = GraphNodeSerializer


class EdgeViewSet(viewsets.ModelViewSet):
    queryset = NodeRelation.objects.all()
    serializer_class = NodeRelationSerializer


class NodeTypeChoicesView(APIView):
    def get(self, request):
        data = [{'value': choice[0], 'label': choice[1]}
                for choice in TYPE_CHOICES]
        return Response(data)
