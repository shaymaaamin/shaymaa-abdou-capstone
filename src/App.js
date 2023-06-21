import "./App.scss";

import { HashRouter, Route, Routes } from "react-router-dom";

import Topnav from "./components/Topnav/Topnav";
import ScrollToTop from "./helpers/ScrollToTop";

import HomePage from "./pages/HomePage";
import Employees from "./pages/Employees";
import Assets from "./pages/Assets";
import Jobs from "./pages/Jobs";
import Lookups from "./pages/Lookups";
import JobDetails from "./pages/JobDetails";

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
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/lookups" element={<Lookups />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
