import React, { useEffect, useState} from "react";

function SalesPeopleList() {
    const [salespeople, setSalesPeople] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8090/api/salespeople/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setSalesPeople(data.salesperson)
        } else {
            console.log("error getting sales people")
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
return (
    <table className="table table-striped">
        <thead>
            <tr>
                <th>Employee id</th>
                <th>First Name</th>
                <th>Last Name</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                {salespeople.map(person => {
                    return (
                        <>
                        <td key={person.employee_id}>{person.employee_id}</td>
                        <td key={person.first_name}>{person.first_name}</td>
                        <td key={person.last_name}>{person.last_name}</td>
                        </>
                    )
                })}
            </tr>
        </tbody>
    </table>
)
}
export default SalesPeopleList;
