import React, { useState } from "react";

function SalesPeopleCreate() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeID, setEmployeeID] = useState('');

    const handleFirstNameChange = (event) => {
        const {value} = event.target;
        setFirstName(value);
    }
    const handleLastNameChange = (event) => {
        const {value} = event.target;
        setLastName(value);
    }
    const handleEmployeeIDChange = (event) => {
        const {value} = event.target;
        setEmployeeID(value);
    }
    const handleSumbit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeID;

        const salesPersonUrl = "http://localhost:8090/api/salespeople/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(salesPersonUrl, fetchConfig);
        if (response.ok) {
            const newSalesPerson = await response.json();
            console.log(newSalesPerson);
            setFirstName('');
            setLastName('');
            setEmployeeID('');
        }
    }
    return (
        <div className="offset-4 col-5">
            <div className="my-3 card">
                <div className="mb-3 mx-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">First name</label>
                    <input onChange={handleFirstNameChange} type="text" className="form-control"
                    id="formGroupExampleInput" placeholder="First name"/>
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Last Name</label>
                    <input onChange={handleLastNameChange} type="text" className="form-control"
                    id="formGroupExampleInput2" placeholder="Last name"/>
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="formGroupExampleInput3" className="form-label">Employee ID</label>
                    <input onChange={handleEmployeeIDChange} type="text" className="form-control"
                    id="formGroupExampleInput3" placeholder="Employee ID"/>
                </div>
                <button onClick={handleSumbit} type="submit" className="btn btn-primary">Submit</button>
            </div>
        </div>
    )
}
export default SalesPeopleCreate;
