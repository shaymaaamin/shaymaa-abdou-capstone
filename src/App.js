import "./App.scss";

import { HashRouter, Route, Routes } from "react-router-dom";

import Topnav from "./components/Topnav/Topnav";
import ScrollToTop from "./helpers/ScrollToTop";

import HomePage from "./pages/HomePage";
import Employees from "./pages/Employees";

export default function App() {
  return (
    <div className="app">
      <HashRouter>
        <Topnav />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/assets" element={<HomePage />} />
          <Route path="/jobs" element={<HomePage />} />
          <Route path="/administration" element={<HomePage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
