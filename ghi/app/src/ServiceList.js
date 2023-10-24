import React, { useEffect, useState} from "react";

function ServiceList() {
    const [appointments, setApt] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setApt(data.apts)
        } else {
            console.log("error getting technicians")
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
return (
    <div>
        <h1 style={{ marginTop: '20px' }}>Technicians</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Is VIP?</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                    {appointments.map(person => {
                        return (
                            <tr key={person.employee_id}>
                            <td>{person.vin}</td>
                            <td>{person.vip}</td>
                            <td>{person.date}</td>
                            <td>{person.time}</td>
                            <td>{person.technician}</td>
                            <td>{person.reason}</td>
                            <td>{person.actions}</td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    </div>
)
}

export default ServiceList;
