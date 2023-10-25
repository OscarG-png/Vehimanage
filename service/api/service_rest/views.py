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
        "date",
        "time",
        "reason",
        "status",
        "vin",
        "customer",
        "vip",
        "technician",
    ]
    encoders = {"technician": TechnicianDetailEncoder()}


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
        "customer",
        "date",
        "time",
        "technician",
        "reason",
        "vip",
        "status",
    ]
    encoders = {"technician": TechnicianDetailEncoder()}


@require_http_methods(["GET", "POST"])
def technicianlist(request):
    if request.method == "GET":
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
def appointmentlist(request):
    if request.method == "GET":
        apts = Appointment.objects.all()
        for apt in apts:
            apt.time = apt.time.strftime("%H:%M:%S")
        return JsonResponse(
            {"apts": apts},
            encoder=AppointmentListEncoder
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        tech_id = content.get('technician')
        technician = Technician.objects.get(id=tech_id)
        content["technician"] = technician
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
