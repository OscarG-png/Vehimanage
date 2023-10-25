from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField(default=False)


class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=10)


class Appointment(models.Model):
    vin = models.CharField(max_length=17)
    vip = models.BooleanField(default=False)
    customer = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    reason = models.TextField()
    status = models.CharField(max_length=20, default="scheduled")
    technician = models.ForeignKey(
        Technician,
        on_delete=models.CASCADE
    )
