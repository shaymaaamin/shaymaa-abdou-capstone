import { useEffect, useState } from "react";
import { getDistance, loadGoogleMapsAPI } from "../maps";

import * as api from "../api";

import ContactList from "../components/ContactList/ContactList";
import LiveMap from "../components/LiveMap/LiveMap";
import Sidebar from "../components/Sidebar/Sidebar";

import { Grid } from "semantic-ui-react";

export default function HomePage() {
  const [map, setMap] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [assets, setAssets] = useState([]);
  const [lookups, setLookups] = useState([]);
  const [skills, setSkills] = useState([]);

  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    loadGoogleMapsAPI().then((map) => setMap(map));
    api.assets.get().then((assets) => setAssets(assets));
    api.employees.get().then((employees) => setEmployees(employees));
    api.lookups.get().then((lookups) => setLookups(lookups));
    api.skills.get().then((skills) => setSkills(skills));
  }, []);

  useEffect(() => {
    setSelectedAsset(assets[0]);
  }, [assets]);

  useEffect(() => {
    employees.forEach(e => e.distance = getDistance(e, selectedAsset));
    employees.sort((a, b) => a.distance - b.distance);
  }, [selectedAsset]);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={4}>
          <Sidebar
            assets={assets}
            employees={employees}
            lookups={lookups}
            setSelectedAsset={setSelectedAsset}
            selectedAsset={selectedAsset}
          />
        </Grid.Column>
        <Grid.Column width={9}>
          <LiveMap
            map={map}
            assets={assets}
            selectedAsset={selectedAsset}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <ContactList
            map={map}
            employees={employees}
            skills={skills}
            lookups={lookups}
            selectedAsset={selectedAsset}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
