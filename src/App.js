import "./App.scss";

import { HashRouter, Route, Routes } from "react-router-dom";

import Topnav from "./components/Topnav/Topnav";
import ScrollToTop from "./helpers/ScrollToTop";

import HomePage from "./pages/HomePage";
import Employees from "./pages/Employees";
import Assets from "./pages/Assets";
import Jobs from "./pages/Jobs";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <div className="app">
      <HashRouter>
        <Topnav />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/:key" element={<Admin />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
