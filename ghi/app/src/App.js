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
import SalesPersonHistory from './SalesPeronHistory';

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
          <Route path="technicians">
            <Route index element={<TechList/>} />
            <Route path="create" element={<TechForm/>}/>
          </Route>
          <Route path="appointments">
            <Route index element={<ServiceList/>} />
            <Route path="create" element={<ServiceForm/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
