import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutomobileVO


def get_automobiles():
    url = "http://project-beta-inventory-api-1:8000/api/automobiles/"
    response = requests.get(url)
    content = json.loads(response.content)
    for auto in content["autos"]:
        try:
            existing_vehicle = AutomobileVO.objects.filter(vin=auto["vin"]).first()

            if existing_vehicle:
                existing_vehicle.sold = auto["sold"]
                existing_vehicle.save()
            else:
                AutomobileVO.objects.create(vin=auto["vin"], sold=auto["sold"])
        except Exception as e:
            print(e)


def poll(repeat=True):
    while True:
        print('Sales poller polling for data')
        try:
            get_automobiles()
            print("got data")
        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
