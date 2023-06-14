import "./App.scss";

import { HashRouter, Route, Routes } from "react-router-dom";
// import { List } from "./List";
import EmployeeForm from "./components/EmployeeForm/EmployeeForm";

import Topnav from "./components/Topnav/Topnav";
import ScrollToTop from "./helpers/ScrollToTop";

import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <div className="app">
      <HashRouter>
        <Topnav />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employees" element={<HomePage />} />
          <Route path="/assets" element={<HomePage />} />
          <Route path="/jobs" element={<HomePage />} />
          <Route path="/administration" element={<HomePage />} />

          <Route path={`/employees/add`} element={<EmployeeForm />} />
          <Route path={`/employees/edit/:id`} element={<EmployeeForm />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
