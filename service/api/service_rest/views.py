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
        "vip",
    ]


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
        "customer",
        "date_time",
        "technician",
        "reason",
        "vip",
        "status",
    ]


@require_http_methods(["GET", "POST"])
def technicianlist(request, tech_id=None):
    if request.method == "GET":
        if tech_id is not None:
            techs = Technician.objects.filter(technician=tech_id)
        else:
            techs = Technician.objects.all()
        return JsonResponse(
            {"techs": techs},
            encoder=TechnicianListEncoder
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        tech = Technician.objects.create(**content)
        return JsonResponse(
            tech,
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


@require_http_methods(["GET", "POST"])
def appointmentlist(request, apt_id=None):
    if request.method == "GET":
        if apt_id is not None:
            apts = Appointment.objects.filter(id=apt_id)
        else:
            apts = Appointment.objects.all()
        return JsonResponse(
            {"apts": apts},
            encoder=AppointmentListEncoder
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        try:
            apt_href = content["id"]
            id = AutomobileVO.objects.get(import_href=apt_href)
            content["id"] = id
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )
        apt = Appointment.objects.create(**content)
        return JsonResponse(
            apt,
            encoder=AppointmentDetailEncoder,
            safe=False
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def appointmentdetail(request, pk):
    try:
        apt = Appointment.objects.get(pk=pk)
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment not found."}, status=400)
    if request.method == "GET":
        return JsonResponse(apt, encoder=AppointmentDetailEncoder, safe=False)
    elif request.method == "PUT":
        pass
    elif request.method == "DELETE":
        apt.delete()
        return JsonResponse({"message": "Appointment deleted successfully."}, status=200)
