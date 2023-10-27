import React, { useState } from 'react';

const TechForm = () => {
    const[first_name, setFirst_Name] = useState('')
    const[last_name, setLast_Name] = useState('')
    const[employee_id, setEmployeeID] = useState('')


    async function handleSubmit(event) {
        event.preventDefault()
        const data = {
            first_name,
            last_name,
            employee_id,
        }

        const TechURL = 'http://localhost:8080/api/technicians/'
        const fetchOptions = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(TechURL, fetchOptions)
        if (response.ok) {
            const newtech = await response.json();
            setFirst_Name('');
            setLast_Name('');
            setEmployeeID('');
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
        }
    }


    function handleChangeFirst_Name(event) {
        const { value } = event.target;
        setFirst_Name(value);
    }

    function handleChangeLast_Name(event) {
        const { value } = event.target;
        setLast_Name(value);
    }

    function handleChangeEmployee_Id(event) {
        const { value } = event.target;
        setEmployeeID(value);
    }

    return(
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Technician</h1>
                    <form onSubmit={handleSubmit} id="create-tech-form">
                    <div className="form-floating mb-3">
                            <input value={first_name} onChange={handleChangeFirst_Name} placeholder="first_name" required type="text" name="first_name" id="first_name" className="form-control" />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={last_name} onChange={handleChangeLast_Name} placeholder="last_name" required type="text" name="last_name" id="last_name" className="form-control" />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={employee_id} onChange={handleChangeEmployee_Id} placeholder="employee_id" required type="text" name="employee_id" id="employee_id" className="form-control" />
                            <label htmlFor="employee_id">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Create a Technician</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TechForm
