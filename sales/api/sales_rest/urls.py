from django.urls import path
from .views import api_list_salespeople, api_salesperson_details


urlpatterns = [
    path("salespeople/", api_list_salespeople, name="api_list_salespeople"),
    path(
        "salespeople/<int:id>/",
        api_salesperson_details,
        name="api_salesperson_details"
    ),
]
