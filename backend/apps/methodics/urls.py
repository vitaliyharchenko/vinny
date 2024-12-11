from django.urls import path
from .views import GenerateConceptGraphView

urlpatterns = [
    path('graph/', GenerateConceptGraphView.as_view()),
]
