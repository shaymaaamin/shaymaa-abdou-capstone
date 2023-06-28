import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { getDistance, loadGoogleMapsAPI } from "../maps";

import * as api from "../api";

import ContactList from "../components/ContactList/ContactList";
import LiveMap from "../components/LiveMap/LiveMap";
import Sidebar from "../components/Sidebar/Sidebar";
import ReportFault from "../components/ReportFault/ReportFault";

export default function HomePage() {
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({});

  const [jobs, setJobs] = useState([]);
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const [lookups, setLookups] = useState([]);
  const [dispatcher, setDispatcher] = useState({ mode: null, item: null, success: false });

  useEffect(() => {
    loadGoogleMapsAPI().then((map) => setMap(map));

    Promise.all([
      api.jobs.get(),
      api.assets.get(),
      api.employees.get(),
      api.skills.get(),
      api.lookups.get()
    ]).then(([jobs, assets, employees, employeeSkills, lookups]) => {

      assets.forEach(a => {
        a.type = lookups.find(l => l.id === a.type_id).name;
      });

      employees.forEach(e => {
        e.skills = employeeSkills
          .filter(s => s.employee_id === e.id)
          .map(s => lookups.find(l => l.id === s.skill_id));
      })

      setJobs(jobs);
      setAssets(assets);
      setEmployees(employees);
      setLookups(lookups);

    }).catch(setError);

  }, []);

  useEffect(() => {
    setSelectedAsset(assets[0]);
  }, [assets]);

  useEffect(() => {
    employees.forEach(e => e.distance = getDistance(e, selectedAsset));
    employees.sort((a, b) => a.distance - b.distance);

    const filteredEmployees = employees
      .filter(e => e.status === 'online' && (!formValues?.skill_id || e.skills.some(s => s.id === formValues.skill_id)));


    setSelectedEmployee(filteredEmployees[0] || employees[0]);

  }, [selectedAsset, formValues]);



  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={4}>
          <Sidebar
            jobs={jobs}
            assets={assets}
            lookups={lookups}
            selectedAsset={selectedAsset}
            setSelectedAsset={setSelectedAsset}
            setDispatcher={setDispatcher}
          />
          <ReportFault
            lookups={lookups}
            dispatcher={dispatcher}
            setDispatcher={setDispatcher}
            setFormValues={setFormValues}
            selectedAsset={selectedAsset}
            selectedEmployee={selectedEmployee}
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
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
