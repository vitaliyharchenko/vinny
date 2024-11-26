from django.urls import path

from . import views

urlpatterns = [
    path('', views.GraphView.as_view()),
]