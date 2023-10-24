import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPeopleList from './SalesPeopleList';
import SalesPeopleCreate from './SalesPersonCreate';
import TechForm from './TechCreate.js'
import TechList from './TechList.js'
import ServiceList from './ServiceList';
import ServiceForm from './ServiceForm'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index path="/" element={<MainPage />} />
          <Route path="salespeople" element={<SalesPeopleList />}>
            <Route path="create" element={<SalesPeopleCreate />} />
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
