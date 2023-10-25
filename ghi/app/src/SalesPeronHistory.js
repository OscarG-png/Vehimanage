import React, { useEffect, useState} from "react";

function SalesPersonHistory() {
    const [sales, setSales] = useState([]);
    const [salesPeople, setSalesPeople] = useState([]);
    const [salesPerson, setSalesPerson] = useState('');

    const fetchSalesPeople = async () => {
        const url = "http://localhost:8090/api/salespeople/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSalesPeople(data.salesperson);
        }
    }
    const handleSalesPersonChange = (event) => {
        const {value} = event.target;
        setSalesPerson(value);
        fetchSales();
    }
        const fetchSales = async () => {
        const url = "http://localhost:8090/api/sales/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    }
    useEffect(() => {
        fetchSales();
        fetchSalesPeople();
    }, []);
    return (
        <div className="container my-3">
            <h1>Salesperson History</h1>
            <div className="my-3">
                <select onChange={handleSalesPersonChange} id="salesperson-select">
                    <option value="">Select a Salesperson</option>
                    {salesPeople.map(person => {
                        return (
                            <option key={person.id} value={person.id}>
                                {person.first_name + " " + person.last_name}
                            </option>
                        )
                    })}
                </select>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales
                    .filter(sale => sale.salesperson.id.toString() === salesPerson)
                    .map(sale => {
                        return (
                            <tr key={sale.id}>
                                <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>{sale.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default SalesPersonHistory;
