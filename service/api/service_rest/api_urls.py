from django.urls import path
from .views import technicianlist, techniciandetail, appointmentlist, appointmentdetail


urlpatterns = [
    path("technicians/", technicianlist, name="tech-list"),
    path("technicians/<int:pk>/", techniciandetail, name="tech-details"),
    path("appointments/", appointmentlist, name="apt-list"),
    path("appointments/<int:pk>/", appointmentdetail, name="apt-details"),
]
