import { Button, Card, List } from "semantic-ui-react";
import "./Sidebar.scss";
import { useEffect, useState } from "react";
import api from "../../api";
import CreateAssignment from "../CreateAssignment/CreateAssignment";

export default function Sidebar({ jobs }) {
    const [error, setError] = useState(null);

    const [assets, setAssets] = useState([]);
    const [faults, setFaults] = useState([]);
    const [priorities, setPriorities] = useState([]);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        api.assets.get().then(data => setAssets(data.map(({ id, name }) => ({ value: id, text: name })))).catch(setError);
        api.faults.get().then(data => setFaults(data.map(({ id, name, code }) => ({ value: id, text: `${name} - ${code}` })))).catch(setError);
        api.priorities.get().then(data => setPriorities(data.map(({ id, name }) => ({ value: id, text: name })))).catch(setError);
    }, []);

    const getValue = (item, key) => {
        switch (key) {
            case 'asset':
                return assets.find(({ value }) => value === item.asset)?.text;
            case 'fault':
                return faults.find(({ value }) => value === item.fault)?.text;
            case 'priority':
                return priorities.find(({ value }) => value === item.priority)?.text;
            default:
                return item[key];
        }
    }

    return (
        <Card>
            <CreateAssignment open={open} onClose={() => setOpen(false)} />
            <Card.Content>
                <List>
                    {
                        jobs.map((job, idx) => (
                            <List.Item key={idx}>
                                <Card>
                                    <List.Content>
                                        <List.Header>{getValue(job, 'asset')}</List.Header>
                                        <List.Description>{getValue(job, 'fault')}</List.Description>
                                        <List.Description>{getValue(job, 'priority')}</List.Description>
                                        <Button type="button" color="blue" content="Assign" onClick={() => setOpen(true)} />
                                    </List.Content>
                                </Card>
                            </List.Item>
                        ))
                    }
                </List>
            </Card.Content>
        </Card>
    );
}