from django.views.generic import TemplateView
from django.core import serializers
from .models import Node, NodeRelation
import json



# Create your views here.
class GraphView(TemplateView):

    template_name = "graph.html"

    def get_context_data(self,*args, **kwargs):
        context = super(GraphView, self).get_context_data(*args,**kwargs)

        graph = {
            'nodes': [],
            'links': []
        }

        for node in Node.objects.all():
            node_data = {
                'id': node.pk,
                'label': node.title
            }
            graph['nodes'].append(node_data)

        for edge in NodeRelation.objects.all():
            edge_data = {
                'from': edge.parent.pk,
                'to': edge.child.pk
            }
            graph['links'].append(edge_data)

        context['graph'] = graph

        return context

    # def get(self, request, format=None):
    #     nodes = Node.objects.all()
    #     nodes_serializer = NodeSerializer(nodes, many=True)
    #     edges = NodeRelation.objects.all()
    #     edges_serializer = NodeRelationSerializer(edges, many=True)
    #     return Response({'nodes': nodes_serializer.data, 'edges': edges_serializer.data})
