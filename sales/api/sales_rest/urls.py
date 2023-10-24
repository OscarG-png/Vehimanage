from django.urls import path
from .views import (api_list_salespeople,
                    api_salesperson_details,
                    api_list_customer,
                    api_customer_details)


urlpatterns = [
    path("salespeople/", api_list_salespeople, name="api_list_salespeople"),
    path(
        "salespeople/<int:id>/",
        api_salesperson_details,
        name="api_salesperson_details"
    ),
    path("customers/", api_list_customer, name="api_list_customer"),
    path(
        "customers/<int:id>/",
        api_customer_details,
        name="api_customer_details"
    ),
]
