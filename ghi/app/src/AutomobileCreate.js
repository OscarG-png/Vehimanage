import React, { useEffect, useState} from "react"
function AutomobileCreate() {
    const [models, setModels] = useState([]);
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');

    const handleColorChange = (event) => {
        const {value} = event.target;
        setColor(value);
    }
    const handleYearChange = (event) => {
        const {value} = event.target;
        setYear(value);
    }
    const handleVinChange = (event) => {
        const {value} = event.target;
        setVin(value);
    }
    const handleModelChange = (event) => {
        const {value} = event.target;
        setModel(value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.color = color;
        data.year = year;
        data.vin = vin;
        data.model_id = model;

        const url = "http://localhost:8100/api/automobiles/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "applications/json",
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setColor('');
            setYear('');
            setVin('');
            setModel('');
        }
    }
    const fetchData = async () => {
        const url = "http://localhost:8100/api/models/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return(
        <div className="offset-4 col-5">
            <h1>Create an Automobile</h1>
            <div className="my-3 card">
                <div className="mb-3 mx-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Color</label>
                    <input onChange={handleColorChange} value={color} type="text" className="form-control"
                    id="formGroupExampleInput" placeholder="First name"/>
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Year</label>
                    <input onChange={handleYearChange} value={year} type="number" className="form-control"
                    id="formGroupExampleInput2" placeholder="Last name"/>
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="formGroupExampleInput3" className="form-label">VIN</label>
                    <input onChange={handleVinChange} value={vin} type="text" className="form-control"
                    id="formGroupExampleInput3" placeholder="Last name"/>
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="model-select" id="form-select" className="form-label my-2">
                        Model
                    </label>
                    <select onChange={handleModelChange} id="model-select" className="form-select">
                        <option value="">Select a Model</option>
                        {models.map(model => {
                            return (
                                <option key={model.id} value={model.id}>
                                    {model.name}
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
export default AutomobileCreate;
