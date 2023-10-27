import React, { useEffect, useState} from "react";

function ServiceList() {
    const [appointments, setApt] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setApt(data.apts)
        } else {
            console.log("error getting appointments")
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

const cancelAppointment = async (id) => {
    const aptURL = `http://localhost:8080/api/appointments/${id}/`
    const aptConfig = {
    method: "PUT",
    body: JSON.stringify({"status": "canceled"}),
    headers: {
        "Content-Type": "application/json",
    }
    }
    const aptDone = await fetch (aptURL, aptConfig)
    fetchData()
}
const finishAppointment = async (id) => {
    const aptURL = `http://localhost:8080/api/appointments/${id}/`
    const aptConfig = {
    method: "PUT",
    body: JSON.stringify({"status": "finished"}),
    headers: {
        "Content-Type": "application/json",
    }
    }
    const aptDone = await fetch (aptURL, aptConfig)
    fetchData()
}

return (
    <div>
        <h1 style={{ marginTop: '20px' }}>Appointments</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Is VIP?</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                    {appointments
                    .filter(appointment => appointment.status !== 'finished' && appointment.status !== 'canceled')
                    .map(person => {
                        console.log(typeof(person.time))
                        return (
                            <tr key={person.id}>
                                <td>{person.vin}</td>
                                <td>{person.vip ? "Yes": "No"}</td>
                                <td>{person.customer}</td>
                                <td>{person.date}</td>
                                <td>{person.time}</td>
                                <td>{person.technician.first_name} {person.technician.last_name}</td>
                                <td>{person.reason}</td>
                                <td>
                                <button onClick={() => cancelAppointment(person.id)}
                                style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
                                <button onClick={() => finishAppointment(person.id)}
                                style={{ backgroundColor: 'green', color: 'white' }}>Finish</button>
                                </td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    </div>
)
}

export default ServiceList;
