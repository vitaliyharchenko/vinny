from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from .models import GraphNode, NodeRelation, TYPE_CHOICES
from .serializers import GraphNodeSerializer, NodeRelationSerializer


# Create your views here.
class GraphView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        nodes = GraphNode.objects.all()
        nodes_serializer = GraphNodeSerializer(nodes, many=True)

        edges = NodeRelation.objects.all()
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
