# CarCar

Team:

* Person 1 - Which microservice?
* Brandon Moghadam - Service.

# Instructions To Run

* clone our repository.
* from the root directory, run these commands, one after another:
 "docker volume create two-shot-pgdata"
 "docker-compose build"
 "docker-compose up"

 * Go to localhost:3000 to see our React Front-End.

## Design

## Service microservice
- poller.py
ability to pull updates from the database that can then be used in my microservice
- models.py
automobileVO - vin and sold status (ability to pull from the poller)
technician - first_name, last_name, and employee_id
appoointments - vin, vip, customer, date, time, reason, status, technician
- views.py
"GET "POST" and "PUT" methods to interact with the front end
created encoders for Automobile VO, technician, and appointments
- urls.py
connects to the main url which then sets links to localhost3000/api/(specific name in urls.py file)
- techlist.js
shows a list of all technicians in the database
- techcreate.js
ability to create a technician in the database with the given form specs
- serviceform.js
ability to create a service appointment in the database with the given specs
- servicehistory.js
shows a list of all previous service appointments, includes a search bar at the top which searches based on vin numbers
- servicelist.js
shows a list of all appointments in the database with the ability to click on "cancel" or "finished" to send it to the servicehistory.js
## Sales microservice

Explain your models and integration with the inventory
microservice, here.
