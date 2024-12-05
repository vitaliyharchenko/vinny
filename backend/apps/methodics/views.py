from rest_framework import viewsets
from .serializers import SubjectSerializer, ConceptSerializer

from .models import Subject, Concept

# Create your views here.


class SubjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class ConceptViewSet(viewsets.ModelViewSet):
    queryset = Concept.objects.all()
    serializer_class = ConceptSerializer
