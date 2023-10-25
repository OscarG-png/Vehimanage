import React, { useEffect, useState} from "react";

function TechList() {
    const [technicians, setTech] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8080/api/technicians/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTech(data.techs)
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
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                    {technicians.map(person => {
                        return (
                            <tr key={person.employee_id}>
                            <td>{person.employee_id}</td>
                            <td>{person.first_name}</td>
                            <td>{person.last_name}</td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    </div>
)
}
export default TechList;
