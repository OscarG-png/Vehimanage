import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";

function SaleList () {
    const [sales, setSales] = useState([]);

    const fetchData = async () => {
        const url = "http://localhost:8090/api/sales/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
        <Link to="/sales/create">
            <button className="btn btn-primary my-3">Add a sale</button>
        </Link>
        <h1>Customers</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Salesperson Employee ID</th>
                    <th>Salesperson name</th>
                    <th>Customer Name</th>
                    <th>VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {sales.map(sale => {
                    return (
                        <tr key={sale.id + sale.automobile.vin}>
                            <td>{sale.salesperson.employee_id}</td>
                            <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                            <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>${sale.price}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    )
}
export default SaleList;
