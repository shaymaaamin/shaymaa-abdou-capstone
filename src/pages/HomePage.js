import { useEffect, useState } from "react";
import { loadGoogleMapsAPI } from "../maps";

import * as api from "../api";

import ContactList from "../components/ContactList/ContactList";
import LiveMap from "../components/LiveMap/LiveMap";
import Sidebar from "../components/Sidebar/Sidebar";

import { Grid } from "semantic-ui-react";

export default function HomePage() {
  const [map, setMap] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [assets, setAssets] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [selectedAsset, selectAsset] = useState(null);

  useEffect(() => {
    loadGoogleMapsAPI().then((map) => setMap(map));
    api.assets.get().then((assets) => setAssets(assets));
    api.employees.get().then((employees) => setEmployees(employees));
  }, []);

  useEffect(()=>{
    selectAsset(assets[0]);
  },[assets])

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={4}>
          <Sidebar assets={assets} selectedAsset={selectedAsset} selectAsset={selectAsset} />
        </Grid.Column>
        <Grid.Column width={9}>
          <LiveMap map={map} assets={assets} selectedAsset={selectedAsset} />
        </Grid.Column>
        <Grid.Column width={3}>
          <ContactList employees={employees} map={map} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
