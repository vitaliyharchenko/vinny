from rest_framework import serializers
from .models import Subject, Concept, ConceptRelation


class SubjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subject
        fields = ['pk', 'title']


class ConceptSerializer(serializers.ModelSerializer):

    class Meta:
        model = Concept
        fields = ['pk', 'title', 'is_active', 'subjects']


class ConceptRelationSerializer(serializers.ModelSerializer):
    parent = serializers.PrimaryKeyRelatedField(queryset=Concept.objects.all())
    child = serializers.PrimaryKeyRelatedField(queryset=Concept.objects.all())

    class Meta:
        model = ConceptRelation
        fields = ['parent', 'child']
