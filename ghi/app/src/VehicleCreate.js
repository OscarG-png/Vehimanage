import React, { useEffect, useState } from 'react'
function VehicleCreate() {
    const [model, setModel] = useState('');
    const [pic, setPic] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [manufacturers, setManufacturers] = useState([]);

    const handleModelChange = (event) => {
        const {value} = event.target;
        setModel(value);
    };
    const handlePicChange = (event) => {
        const {value} = event.target;
        setPic(value);
    };
    const handleManufacturerChange = (event) => {
        const {value} = event.target;
        setManufacturer(value);
    };

    const handleSubmit= async (event) => {
        event.preventDefault();
        const data = {};
        data.name = model;
        data.picture_url = pic;
        data.manufacturer_id = manufacturer;

        const url = "http://localhost:8100/api/models/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setModel('');
            setPic('');
            setManufacturer('');
        }
    };

    const fetchData = async () => {
        const url = "http://localhost:8100/api/manufacturers/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="offset-4 col-5">
            <h1>Create a Model</h1>
            <div className="my-3 card">
                <div className="mb-3 mx-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Model</label>
                    <input type="text" onChange={handleModelChange} value={model} className="form-control"
                    id="formGroupExampleInput" placeholder="Model name"/>
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Picture url</label>
                    <input type="url" onChange={handlePicChange} value={pic} className="form-control"
                    id="formGroupExampleInput2" placeholder="URL"/>
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="manufacturer-select" className="form-label">Choose Manufacturer</label>
                    <select id='manufacturer-select' onChange={handleManufacturerChange} value={manufacturer}
                    className='form-select'>
                        <option value=''>Select a Manufacturer</option>
                        {manufacturers.map(manufacturer => {
                            return (
                                <option key={manufacturer.id} value={manufacturer.id}>
                                    {manufacturer.name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
            </div>
        </div>
    )
}
export default VehicleCreate;
