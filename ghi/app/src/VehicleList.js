import React, { useEffect, useState} from "react";

function VehicleList() {
    const [models, setModels] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8100/api/models/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
        } else {
            console.log("error getting cars")
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

return (
    <div>
        <h1 style={{ marginTop: '20px' }}>Models</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                    {models.map(model => {
                        return (
                            <tr key={model.id}>
                                <td>{model.name}</td>
                                <td>{model.manufacturer.name}</td>
                                <td>
                                    <img src={model.picture_url} alt="Model Pic"/>
                                </td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    </div>
)
}
export default VehicleList;
