from rest_framework import serializers
from .models import GraphNode, TYPE_CHOICES, NodeRelation
from apps.methodics.models import Subject, Concept


class TypeField(serializers.BaseSerializer):

    def to_representation(self, instance):
        for t in TYPE_CHOICES:
            if t[0] == instance:
                return t[1]
        return instance


class SubjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subject
        fields = ['pk', 'title']


class ConceptSerializer(serializers.ModelSerializer):

    class Meta:
        model = Concept
        fields = ['pk', 'title', 'is_active']


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
