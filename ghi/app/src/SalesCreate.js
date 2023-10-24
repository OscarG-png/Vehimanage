import React, { useEffect, useState } from "react";

function SalesCreate () {
    const [vins, setVins] = useState([]);
    const [salesPeople, setSalesPeople] = useState([]);
    const [customers, setCustomers] = useState([]);

    const fetchVins = async () => {
        const url = "http://localhost:8100/api/automobiles/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setVins(data.autos)
        }
    }
    const fetchSalesPeople = async () => {
        const url = "http://localhost:8090/api/salespeople/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSalesPeople(data.salesperson);
        }
    }
    const fetchCustomers = async () => {
        const url = "http://localhost:8090/api/customers/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    }
    useEffect(() => {
        fetchVins();
        fetchSalesPeople();
        fetchCustomers();
    }, []);
    return (
        <div className="offset-4 col-5">
            <h1>Add a sale</h1>
            <div className="my-3 card">
                <div className="mb-3 mx-3">
                    <label htmlFor="vin-select" id="form-select" className="form-label mx-2 my-2">VIN</label>
                    <select id="vin-select" className="form-select" aria-label="Default select example">
                        <option value="">Select a VIN</option>
                        {vins.map(auto => {
                            return (
                                <option key={auto.vin} value={auto.vin}>
                                    {auto.vin}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="salesperson-select" id="form-select"
                    className="form-label mx-2">Salesperson</label>
                    <select id="salesperson-select" className="form-select" aria-label="Default select example">
                        <option value="">Select a salesperson</option>
                        {salesPeople.map(person => {
                            return (
                                <option key={person.employee_id} value={person.employee_id}>
                                    {person.first_name} {person.last_name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="customer-select" id="form-select" className="form-label mx-2">Customer</label>
                    <select id="customer-select" className="form-select" aria-label="Default select example">
                        <option value="">Select a customer</option>
                        {customers.map(customer => {
                            return (
                                <option key={customer.first_name + customer.last_name} value={customer.first_name + customer.last_name}>
                                    {customer.first_name} {customer.last_name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="text" className="form-control"
                    id="price" placeholder="Price"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </div>
    )
}
export default SalesCreate;
