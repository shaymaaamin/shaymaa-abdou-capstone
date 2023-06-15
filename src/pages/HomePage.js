import { useEffect, useState } from "react";
import { loadGoogleMapsAPI } from "../maps";
import api from "../api";

import ContactList from "../components/ContactList/ContactList";
import LiveMap from "../components/LiveMap/LiveMap";
import Sidebar from "../components/Sidebar/Sidebar";

import "./HomePage.scss";

export default function HomePage() {
  const [map, setMap] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [assets, setAssets] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadGoogleMapsAPI().then((map) => setMap(map));
    api.assets.get().then((assets) => setAssets(assets));
    api.employees.get().then((employees) => setEmployees(employees));
    api.jobs.get().then(setJobs);
  }, []);

  return <section className="home">
    <Sidebar jobs={jobs} />
    <LiveMap map={map} assets={assets} />
    <ContactList employees={employees} map={map} />
  </section>;
}
