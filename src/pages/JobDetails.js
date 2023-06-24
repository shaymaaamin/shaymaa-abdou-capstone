import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "semantic-ui-react";
import * as api from "../api";
import AssetCard from "../components/AssetCard/AssetCard";
import EmployeeCard from "../components/EmployeeCard/EmployeeCard";
import { getDistance } from "../maps";


function JobDetails() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [lookups, setLookups] = useState([]);

    const [error, setError] = useState(null);

    const [employee, setEmployee] = useState(null);
    const [asset, setAsset] = useState(null);
    const [employeeSkills, setEmployeeSkills] = useState(null);



    useEffect(() => {
    }, []);

    const getLookupValue = (id) => {
        const lookup = lookups.find(look => look.id === id);
        return lookup?.name;
    }


    useEffect(() => {
        api.skills.get().then(setEmployeeSkills).catch(setError);
        api.lookups.get().then(setLookups).catch(setError);
        api.jobs.getById(id).then(setJob).catch(setError);

    }, [id]);

    useEffect(() => {
        if (job) {
            api.employees.getById(job.employee_id)
                .then(employee => setEmployee({
                    ...employee,
                    skills: employeeSkills
                        .filter(s => s.employee_id === employee.id)
                        .map(s => lookups.find(l => l.id === s.skill_id))
                })).catch(setError);

            api.assets.getById(job.asset_id)
                .then(asset => setAsset({
                    ...asset,
                    type: lookups.find(l => l.id === asset.type_id).name
                }))
                .catch(setError);
        }
    }, [job]);

    useEffect(() => {
        if (asset && employee && !employee.distance) {
            setEmployee({ ...employee, distance: getDistance(employee, asset) });
        }
    }, [asset, employee])

    return (
        <Card.Group style={{ width: '75%', margin: 'auto' }}>
            {job &&
                <Card raised>
                    <Card.Content>
                        <Card.Header>{job.title}</Card.Header>
                        <Card.Meta>{job.description}</Card.Meta>
                        <Card.Description>
                            <p><b>fault</b>: {getLookupValue(job.fault_id)}</p>
                            <p><b>priority</b>: {getLookupValue(job.priority_id)}</p>
                            <p><b>skill</b>: {getLookupValue(job.skill_id)}</p>
                        </Card.Description>
                    </Card.Content>
                </Card>
            }

            {asset && <AssetCard asset={asset} />}
            {employee && <EmployeeCard employee={employee} />}
        </Card.Group>
    )
}

export default JobDetails;