from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from .models import GraphNode, NodeRelation
from .serializers import GraphNodeSerializer, NodeRelationSerializer


# Create your views here.
class GraphView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        nodes = GraphNode.objects.all()
        nodes_serializer = GraphNodeSerializer(nodes, many=True)

        edges = NodeRelation.objects.all()
        edges_serializer = NodeRelationSerializer(edges, many=True)

        return Response({'nodes': nodes_serializer.data, 'edges': edges_serializer.data})
