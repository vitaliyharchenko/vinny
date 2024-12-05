from rest_framework import serializers
from .models import GraphNode, TYPE_CHOICES, NodeRelation
from apps.methodics.serializers import SubjectSerializer, ConceptSerializer


class TypeField(serializers.BaseSerializer):

    def to_representation(self, instance):
        for t in TYPE_CHOICES:
            if t[0] == instance:
                return t[1]
        return instance


class GraphNodeSerializer(serializers.ModelSerializer):
    node_type = TypeField()
    subjects = SubjectSerializer(many=True)
    concepts = ConceptSerializer(many=True)

    class Meta:
        model = GraphNode
        fields = ['pk', 'title', 'node_type', 'subjects',
                  'concepts', 'testability']


class NodeRelationSerializer(serializers.ModelSerializer):

    class Meta:
        model = NodeRelation
        fields = ['pk', 'parent', 'child']
