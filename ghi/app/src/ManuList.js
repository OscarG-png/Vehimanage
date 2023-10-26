import React, { useEffect, useState} from "react";

function ManuList() {
    const [manufacturers, setApt] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8100/api/manufacturers/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setApt(data.manufacturers)
        } else {
            console.log("error getting manufacturers")
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
return (
    <div>
        <h1 style={{ marginTop: '20px' }}>Manufacturers</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                    {manufacturers.map(person => {
                        return (
                            <tr key={person.id}>
                                <td>{person.name}</td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    </div>
)
}

export default ManuList;
