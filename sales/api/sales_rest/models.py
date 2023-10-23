from django.db import models


class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)


class Sale(models.Model):
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sale",
        on_delete=models.PROTECT
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sale",
        on_delete=models.PROTECT
    )


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=50, unique=True)
    sold = models.BooleanField(default=False)
