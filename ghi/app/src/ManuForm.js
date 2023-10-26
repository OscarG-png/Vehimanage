import React, { useState } from 'react';

const ManuForm = () => {
    const[manufacturer, setManufacturer] = useState('')


    async function handleSubmit(event) {
        event.preventDefault()
        const data = {
            manufacturer,
        }

        const ManuURL = 'http://localhost:8100/api/manufacturers/'
        const fetchOptions = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(ManuURL, fetchOptions)
        if (response.ok) {
            const newmanu = await response.json();
            console.log(newmanu);
            setManufacturer('');
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
        }
    }


    function handleChangeManufacturer(event) {
        const { value } = event.target;
        setManufacturer(value);
    }

    return(
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Manufacturer</h1>
                    <form onSubmit={handleSubmit} id="create-tech-form">
                        <div className="form-floating mb-3">
                            <input value={manufacturer} onChange={handleChangeManufacturer} placeholder="manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control" />
                            <label htmlFor="manufacturer">Manufacturer</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ManuForm
