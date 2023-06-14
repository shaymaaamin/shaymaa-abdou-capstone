import { useEffect, useState } from "react";
import { getAssets, getEmployees } from "../api";
import { loadGoogleMapsAPI } from "../maps";

import ContactList from "../components/ContactList/ContactList";
import LiveMap from "../components/LiveMap/LiveMap";
import Sidebar from "../components/Sidebar/Sidebar";

import "./HomePage.scss";

export default function HomePage() {
  const [map, setMap] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    loadGoogleMapsAPI().then((map) => setMap(map));
    getAssets().then((assets) => setAssets(assets));
    getEmployees().then((employees) => setEmployees(employees));

  }, []);

  return <section className="home">
    <Sidebar />
    <LiveMap map={map} assets={assets} />
    <ContactList employees={employees} map={map} />
  </section>;
}
