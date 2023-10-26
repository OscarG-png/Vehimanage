import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPeopleList from './SalesPeopleList';
import SalesPeopleCreate from './SalesPersonCreate';
import SalesList from './SaleList'
import SalesCreate from './SalesCreate'
import CustomerList from './CustomerList';
import CustomerCreate from './CustomerCreate'
import TechForm from './TechCreate.js'
import TechList from './TechList.js'
import ServiceList from './ServiceList';
import ServiceForm from './ServiceForm'
import ServiceHistory from './ServiceHistory';
import SalesPersonHistory from './SalesPeronHistory';
import AutomobileList from './AutomobileList';
import AutomobileCreate from './AutomobileCreate';
import ManuForm from './ManuForm.js'
import ManuList from './ManuList.js'
import VehicleList from './VehicleList.js'
import VehicleCreate from './VehicleCreate';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index path="/" element={<MainPage />} />
          <Route path="salespeople">
            <Route index element={<SalesPeopleList />} />
            <Route path="create" element={<SalesPeopleCreate />} />
          </Route>
          <Route path="sales">
            <Route index element={<SalesList />} />
            <Route path="create" element={<SalesCreate />} />
            <Route path="history" element={<SalesPersonHistory />} />
          </Route>
          <Route path="customers">
            <Route index element={<CustomerList />} />
            <Route path="create" element={<CustomerCreate />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="create" element={<AutomobileCreate />} />
          </Route>
          <Route path="technicians">
            <Route index element={<TechList/>} />
            <Route path="create" element={<TechForm/>}/>
          </Route>
          <Route path="appointments">
            <Route index element={<ServiceList/>} />
            <Route path="create" element={<ServiceForm/>}/>
            <Route path="history" element={<ServiceHistory/>}/>
          </Route>
          <Route path="manufacturer">
            <Route index element={<ManuList/>}/>
            <Route path="create" element={<ManuForm/>}/>
          </Route>
          <Route path="models">
            <Route index element={<VehicleList/>} />
            <Route path="create" element={<VehicleCreate />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
