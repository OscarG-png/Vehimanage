import React, { useEffect, useState } from "react";

function SalesCreate () {
    const [vins, setVins] = useState([]);
    const [vin, setVin] = useState('');
    const [salesPeople, setSalesPeople] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [salesPerson, setSalesPerson] = useState('');
    const [customer, setCustomer] = useState('');
    const [price, setPrice] = useState('');

    const fetchVins = async () => {
        const url = "http://localhost:8100/api/automobiles/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const unSold = data.autos.filter(auto => auto.sold === false)
            setVins(unSold);
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
    const handleVinChange = (event) => {
        const {value} = event.target;
        setVin(value);
    }
    const handleSalesPersonChange = (event) => {
        const {value} = event.target;
        setSalesPerson(value);
    }
    const handleCustomerChange = (event) => {
        const {value} = event.target;
        setCustomer(value);
    }
    const handlePriceChange = (event) => {
        const {value} = event.target;
        setPrice(value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.vin = vin
        data.salesperson = salesPerson;
        data.customer = customer;
        data.price = price;

        const saleUrl = "http://localhost:8090/api/sales/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const soldUrl = `http://localhost:8100/api/automobiles/${vin}/`;
        const soldConfig = {
            method: "put",
            body: JSON.stringify({"sold": true}),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const soldResponse = await fetch(soldUrl, soldConfig);
        const response = await fetch(saleUrl, fetchConfig);
        if (response.ok) {
            setVin('');
            setSalesPerson('');
            setCustomer('');
            setPrice('');
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
                    <select onChange={handleVinChange} id="vin-select" value={vin}
                    className="form-select" aria-label="Default select example">
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
                    <select onChange={handleSalesPersonChange} id="salesperson-select" value={salesPerson}
                    className="form-select" aria-label="Default select example">
                        <option value="">Select a salesperson</option>
                        {salesPeople.map(person => {
                            return (
                                <option key={person.id} value={person.id}>
                                    {person.first_name} {person.last_name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="customer-select" id="form-select" className="form-label mx-2">Customer</label>
                    <select onChange={handleCustomerChange} id="customer-select"
                    className="form-select" value={customer}
                    aria-label="Default select example">
                        <option value="">Select a customer</option>
                        {customers.map(customer => {
                            return (
                                <option key={customer.id} value={customer.id}>
                                    {customer.first_name} {customer.last_name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input onChange={handlePriceChange} value={price} type="text" className="form-control"
                    id="price" placeholder="Price"/>
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
            </div>
        </div>
    )
}
export default SalesCreate;
