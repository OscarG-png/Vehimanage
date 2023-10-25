import React, { useState, useEffect } from 'react';

const ServiceForm = () => {
    const[vin, setVin] = useState('')
    const[customer, setCustomer] = useState('')
    const[date, setDate] = useState('')
    const[time, setTime] = useState('')
    const[technician, setTechnician] = useState('')
    const[reason, setReason] = useState('')
    const[tecs, setTechs] = useState([])

    const fetchTechs = async () => {
                const url = 'http://localhost:8080/api/technicians'
                const response = await fetch(url)
                if(response.ok) {
                    const data = await response.json()
                    setTechs(data.techs)
                    console.log(data.techs)
        }
    }

    useEffect(() => {
        fetchTechs();
    }, []);


    async function handleSubmit(event) {
        event.preventDefault()
        const data = {
            vin,
            customer,
            date,
            time,
            technician,
            reason,
        }

        const AptURL = 'http://localhost:8080/api/appointments/'
        const fetchOptions = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(AptURL, fetchOptions)
        if (response.ok) {
            const newapt= await response.json();
            console.log(newapt);
            setVin('');
            setCustomer('');
            setDate('');
            setTime('');
            setTechnician('');
            setReason('');
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
        }
    }

    function handleChangeVin(event) {
        const { value } = event.target;
        setVin(value);
    }

    function handleChangeCustomer(event) {
        const { value } = event.target;
        setCustomer(value);
    }

    function handleChangeDate(event) {
        const { value } = event.target;
        setDate(value);
    }

    function handleChangeTime(event) {
        const { value } = event.target;
        setTime(value);
    }

    function handleChangeTechnician(event) {
        const { value } = event.target;
        setTechnician(value);
    }

    function handleChangeReason(event) {
        const { value } = event.target;
        setReason(value);
    }

    return(
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a service appointment</h1>
                    <form onSubmit={handleSubmit} id="create-tech-form">
                        <div className="form-floating mb-3">
                            <input value={vin} onChange={handleChangeVin} placeholder="vin" required type="text" name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={customer} onChange={handleChangeCustomer} placeholder="customer" required type="text" name="customer" id="customer" className="form-control" />
                            <label htmlFor="customer">Customer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={date} onChange={handleChangeDate} placeholder="date" required type="date" name="date" id="date" className="form-control" />
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={time} onChange={handleChangeTime} placeholder="time" required type="time" name="time" id="time" className="form-control" />
                            <label htmlFor="time">Time</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={handleChangeTechnician} name="technician" id="technician" className="form-select">
                                <option htmlFor="technician">Technicians</option>
                                    {tecs.map(technician => {
                                        return (
                                            <option key={technician.id} value={technician.href}>{technician.first_name}</option>
                                        )
                                    })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={reason} onChange={handleChangeReason} placeholder="reason" required type="text" name="reason" id="reason" className="form-control" />
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <button className="btn btn-primary">Create a Service Appointment</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ServiceForm
