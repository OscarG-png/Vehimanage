import React, { useState } from "react"

function CustomerCreate() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const handleFirstNameChange = (event) => {
        const {value} = event.target;
        setFirstName(value);
    }
    const handleLastNameChange = (event) => {
        const {value} = event.target;
        setLastName(value);
    }
    const handlePhoneNumberChange = (event) => {
        const {value} = event.target;
        setPhoneNumber(value);
    }
    const handleAddressChange = (event) => {
        const {value} = event.target;
        setAddress(value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone_number = phoneNumber;

        const customerUrl = "http://localhost:8090/api/customers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');
        }
    };
    return (
        <div className="offset-4 col-5">
            <form onSubmit={handleSubmit} id="create-customer-form">
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
                    <label htmlFor="formGroupExampleInput3" className="form-label">Phone Number</label>
                    <input onChange={handlePhoneNumberChange} type="text" className="form-control"
                    id="formGroupExampleInput3" placeholder="Phone Number"/>
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="formControlTextarea1" className="form-label">Address</label>
                    <textarea onChange={handleAddressChange} type="text" className="form-control"
                    id="formControlTextarea1" placeholder="Address"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            </form>
        </div>
    )
}
export default CustomerCreate;
