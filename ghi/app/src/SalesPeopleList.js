import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom"

function SalesPeopleList() {
    const [salespeople, setSalesPeople] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8090/api/salespeople/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSalesPeople(data.salesperson)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
return (
    <div>
        <Link to="/salespeople/create">
            <button className="btn btn-primary my-3">Add a salesperson</button>
        </Link>
        <h1>Salespeople</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Employee id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {salespeople.map(person => {
                    return (
                        <tr key={person.id}>
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
export default SalesPeopleList;
