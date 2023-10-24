import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPeopleList from './SalesPeopleList';
import SalesPeopleCreate from './SalesPersonCreate';
import SalesList from './SaleList'
import SalesCreate from './SalesCreate'
import CustomerList from './CustomerList';
import CustomerCreate from './CustomerCreate'

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
          </Route>
          <Route path="customers">
            <Route index element={<CustomerList />} />
            <Route path="create" element={<CustomerCreate />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
