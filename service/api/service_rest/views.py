from django.shortcuts import render
from .models import Technician, AutomobileVO, Appointment
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
        "sold",
    ]


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]


class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
    ]


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
        "customer",
        "date_time",
        "technician",
        "reason",
    ]


@require_http_methods(["GET", "POST"])
def technicianlist(request, tech_id=None):
    if request.method == "GET":
        if tech_id is not None:
            techs = Technician.objects.filter(employee_id=tech_id)
        else:
            techs = Technician.objects.all()
        return JsonResponse(
            {"techs": techs},
            encoder=TechnicianListEncoder
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        try:
            tech_href = content["employee_id"]
            employee_id = AutomobileVO.objects.get(import_href=tech_href)
            content["employee_id"] = employee_id
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )
        hat = Technician.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=TechnicianDetailEncoder,
            safe=False
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def techniciandetail(request, pk):
    try:
        tech = Technician.objects.get(pk=pk)
    except Technician.DoesNotExist:
        return JsonResponse({"message": "Technician not found."}, status=400)
    if request.method == "GET":
        return JsonResponse(tech, encoder=TechnicianDetailEncoder, safe=False)
    elif request.method == "PUT":
        pass
    elif request.method == "DELETE":
        tech.delete()
        return JsonResponse({"message": "Technician deleted successfully."}, status=200)
