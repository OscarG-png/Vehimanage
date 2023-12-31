from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
import json
from .models import Salesperson, Sale, Customer, AutomobileVO


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
        "id",
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id",
    ]


class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "price",
        "id",
    ]
    encoders = {"automobile": AutomobileVOEncoder(),
                "salesperson": SalespersonEncoder(),
                "customer": CustomerDetailEncoder()}


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespersons = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salespersons},
            encoder=SalespersonEncoder,
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_salesperson_details(request, id):
    if request.method == "GET":
        salesperson = Salesperson.objects.get(id=id)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        count, _ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse(
            {"message": count > 0},
            status=200,
        )


@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerDetailEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_customer_details(request, id):
    if request.method == "GET":
        customer = Customer.objects.get(id=id)
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerDetailEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse(
            {"message": count > 0},
            status=200,
        )


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleDetailEncoder
        )
    else:
        content = json.loads(request.body)
        salesperson_id = content.get("salesperson")
        salesperson = Salesperson.objects.get(id=salesperson_id)
        customer_id = content.get("customer")
        customer = Customer.objects.get(id=customer_id)
        automobile_vin = content.get("vin")
        automobile = AutomobileVO.objects.get(vin=automobile_vin)
        content["salesperson"] = salesperson
        content["customer"] = customer
        content.pop("vin")
        sale = Sale.objects.create(
            automobile=automobile,
            **content)
        return JsonResponse(
            sale,
            encoder=SaleDetailEncoder,
            safe=False
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_sale_details(request, id):
    if request.method == "GET":
        sale = Sale.objects.get(id=id)
        return JsonResponse(
            {"sale": sale},
            encoder=SaleDetailEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        count, _ = Sale.objects.get(id=id).delete()
        return JsonResponse(
            {"message": count > 0},
            status=200,
        )


@require_http_methods(["GET"])
def api_list_automobiles(request):
    if request.method == "GET":
        automobile = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles": automobile},
            encoder=AutomobileVOEncoder,
        )
    else:
        return JsonResponse(
            {"Error": "Unable to get vehicles"}
        )
