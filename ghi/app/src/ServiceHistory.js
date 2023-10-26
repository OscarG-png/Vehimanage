import React, { useState, useEffect } from 'react';


function ServiceHistory() {
    const [appointments, setApt] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchData = async () => {
        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setApt(data.apts)
        } else {
            console.log("error getting appointments")
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    const handleSearch = () => {
        const filteredAppointments = appointments.filter(appointment =>
            appointment.vin.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setApt(filteredAppointments);
    }

return (
    <div>
        <h1>Service History</h1>
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by VIN"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
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
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map(appointment => (
                    <tr key={appointment.id}>
                    <td>{appointment.vin}</td>
                    <td>{appointment.vip ? "Yes": "No"}</td>
                    <td>{appointment.customer}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
}

export default ServiceHistory
