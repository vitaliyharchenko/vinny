from rest_framework import serializers
from .models import Subject, Concept


class SubjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subject
        fields = ['pk', 'title']


class ConceptSerializer(serializers.ModelSerializer):

    class Meta:
        model = Concept
        fields = ['pk', 'title', 'is_active', 'subjects']
