import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
function CustomerList () {
    const [customers, setCustomers] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8090/api/customers/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
        <Link to="/Customer/create">
            <button className="btn btn-primary my-3">Add a Customer</button>
        </Link>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(customer => {
                    return (
                        <tr key={customer.first_name + customer.last_name}>
                            <td key={customer.first_name}>{customer.first_name}</td>
                            <td key={customer.last_name}>{customer.last_name}</td>
                            <td key={customer.phone_number}>{customer.phone_number}</td>
                            <td key={customer.address}>{customer.phone_number}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    )
}
export default CustomerList;
