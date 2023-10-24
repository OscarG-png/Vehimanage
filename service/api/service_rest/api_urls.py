from django.urls import path
from .views import technicianlist


urlpatterns = [
    path("technicians/", technicianlist, name="tech-list")
]
