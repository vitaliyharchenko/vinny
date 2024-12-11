from django.conf import settings
from django.shortcuts import render
from django.views import View
from django.http import JsonResponse

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from openai import OpenAI

from .serializers import SubjectSerializer, ConceptSerializer, ConceptRelationSerializer
from .models import Subject, Concept, ConceptRelation


# API views
class SubjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class ConceptViewSet(viewsets.ModelViewSet):
    queryset = Concept.objects.all()
    serializer_class = ConceptSerializer


class ConceptRelationViewSet(viewsets.ModelViewSet):
    queryset = ConceptRelation.objects.all()
    serializer_class = ConceptRelationSerializer


class ConceptGraphAPIView(APIView):
    def get(self, request, *args, **kwargs):
        concepts = Concept.objects.all()
        relations = ConceptRelation.objects.all()

        concept_data = ConceptSerializer(concepts, many=True).data
        relation_data = ConceptRelationSerializer(relations, many=True).data

        # Возвращаем оба массива в одном JSON
        return Response({
            "nodes": concept_data,
            "edges": relation_data
        })


# Real views
class GenerateConceptGraphView(View):
    def get(self, request):
        # Стартовая страница с формой
        return render(request, "generate_graph.html")

    def post(self, request):
        query = request.POST.get("query")
        if not query:
            return JsonResponse({"error": "Запрос не может быть пустым"}, status=400)

        client = OpenAI(
            # This is the default and can be omitted
            api_key=settings.OPENAI_API_KEY,
        )

        try:
            # Запрос к ChatGPT
            response = client.chat.completions.create(
                messages=[
                    {
                        "role": "Ты помощник-методист. Твоя задача — создать программу преподавания по математике.",
                        "content": query,
                    }
                ],
                model="gpt-3.5-turbo",
            )

            # Парсинг ответа
            generated_content = response["choices"][0]["message"]["content"]
            return JsonResponse({"content": generated_content})
        except Exception as e:
            print(e)
            return JsonResponse({"error": str(e)}, status=500)
