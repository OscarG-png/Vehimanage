import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';

function Nav() {
  const [openAutomobiles, setOpenAutomobiles] = useState(false);
  const [openSalesPeople, setOpenSalesPeople] = useState(false);
  const [openTechnicians, setOpenTechnicians] = useState(false);
  const [openAppointments, setOpenAppointments] = useState(false);
  const [openManufacturers, setOpenManufacturers] = useState(false);
  const [openModels, setOpenModels] = useState(false);
  const [openSales, setOpenSales] = useState(false);
  const [openCustomers, setOpenCustomers] = useState(false);
  const toggleAutomobiles = () => {
    setOpenAutomobiles(!openAutomobiles);
  };
  const toggleSalesPeople = () => {
    setOpenSalesPeople(!openSalesPeople);
  };
  const toggleTechnicians = () => {
    setOpenTechnicians(!openTechnicians);
  };
  const toggleAppointments = () => {
    setOpenAppointments(!openAppointments);
  };
  const toggleManufacturers = () => {
    setOpenManufacturers(!openManufacturers);
  };
  const toggleModels = () => {
    setOpenModels(!openModels);
  };
  const toggleSales = () => {
    setOpenSales(!openSales);
  };
  const toggleCustomers = () => {
    setOpenCustomers(!openCustomers);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className='dropdown'>
          <button onClick={toggleAutomobiles} type="button" className='btn btn-primary'>
            Automobiles
          </button>
          {openAutomobiles && (
            <ul className='dropdown-content'>
            <li className='nav-item'>
              <NavLink className="nav-link" style={{ color: 'white' }} to="automobiles">Automobiles</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" style={{ color: 'white' }} to="/automobiles/create">Create Automobile</NavLink>
            </li>
          </ul>
          )}
        </div>
        <div className='dropdown'>
          <button onClick={toggleSales} type='button' className='btn btn-primary'>
            Sales
          </button>
          {openSales && (
            <ul className='dropdown-content'>
              <li className='nav-item'>
                <NavLink className="nav-link" style={{ color: 'white' }} to="/sales">Sales</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className="nav-link" style={{ color: 'white' }} to="/sales/create">Sales Create</NavLink>
              </li>
            </ul>
          )}
        </div>
        <div className='dropdown'>
          <button onClick={toggleCustomers} type="button" className='btn btn-primary'>
            Customers
          </button>
          {openCustomers && (
            <ul className='dropdown-content'>
              <li className='nav-item'>
                <NavLink className="nav-link" style={{ color: 'white' }} to="/customers">Customers</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className="nav-link" style={{ color: 'white' }} to="/customers/create/">Create Customer</NavLink>
              </li>
            </ul>
          )}
        </div>
        <div className='dropdown'>
          <button onClick={toggleSalesPeople} className='btn btn-primary'>
            Salespeople
          </button>
          {openSalesPeople && (
            <ul className='dropdown-content'>
              <li className='nav-item'>
              <NavLink className="nav-link" style={{ color: 'white' }} to="/salespeople">Salespeople</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" style={{ color: 'white' }} to="/sales/history">Salesperson History</NavLink>
            </li>
            </ul>
          )}
        </div>
        <div className='dropdown'>
            <button onClick={toggleTechnicians} className='btn btn-primary'>
              Technicians
            </button>
            {openTechnicians && (
              <ul className='dropdown-content'>
                <li className="nav-item">
              <NavLink className="nav-link" style={{ color: 'white' }} to="/technicians">Technicians</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" style={{ color: 'white' }} to="/technicians/create">Add a Technician</NavLink>
              </li>
              </ul>
            )}
          </div>
          <div className='dropdown'>
            <button onClick={toggleAppointments} className='btn btn-primary'>
              Service Appointments
            </button>
            {openAppointments && (
              <ul className='dropdown-content'>
                <li className="nav-item">
                  <NavLink className="nav-link" style={{ color: 'white' }} to="/appointments">Service Appointments</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" style={{ color: 'white' }} to="/appointments/create">Create a Service Appointment</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" style={{ color: 'white' }} to="/appointments/history">Service History</NavLink>
                </li>
              </ul>
            )}
          </div>
          <div className='dropdown'>
            <button onClick={toggleManufacturers} className='btn btn-primary'>
              Manufacturers
            </button>
            {openManufacturers && (
              <ul className='dropdown-content'>
                <li className="nav-item">
                  <NavLink className="nav-link" style={{ color: 'white' }} to="/manufacturer">Manufacturer List</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" style={{ color: 'white' }} to="/manufacturer/create">Create a Manufacturer</NavLink>
                </li>
              </ul>
            )}
          </div>
          <div className='dropdown'>
            <button onClick={toggleModels} className='btn btn-primary'>
              Models
            </button>
            {openModels && (
              <ul className='dropdown-content'>
                <li className="nav-item">
                  <NavLink className="nav-link" style={{ color: 'white' }} to="/models">Models</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" style={{ color: 'white' }} to="/models/create">Create a Model</NavLink>
                </li>
              </ul>
            )}
          </div>
      </div>
    </nav>
  )
}

export default Nav;
