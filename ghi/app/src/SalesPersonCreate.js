import React from "react";

function SalesPeopleCreate() {
    return (
        <div className="my-3 container">
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">First name</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="First name"/>
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Last name"/>
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Employee ID</label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Employee ID"/>
            </div>
        </div>
    )
}
export default SalesPeopleCreate;
