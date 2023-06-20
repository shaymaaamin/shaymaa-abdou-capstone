import { useEffect, useState } from "react";
import * as api from "../api";

import CRUD from "../components/CRUD/CRUD";

function Jobs() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const [assets, setAssets] = useState([]);
    const [faults, setFaults] = useState([]);
    const [priorities, setPriorities] = useState([]);

    useEffect(() => {
        api.assets.get().then(data => setAssets(data.map(({ id, name }) => ({ value: id, label: name })))).catch(setError);
        api.faults.get().then(data => setFaults(data.map(({ id, name, code }) => ({ value: id, label: `${name} - ${code}` })))).catch(setError);
        api.priorities.get().then(data => setPriorities(data.map(({ id, name }) => ({ value: id, label: name })))).catch(setError);
    }, [])

    const fields = [
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'asset_id', label: 'Asset', type: 'select', options: assets },
        { key: 'fault_id', label: 'Fault', type: 'select', options: faults },
        { key: 'priority_id', label: 'Priority', type: 'select', options: priorities },
    ];

    const getTitle = (item) => item ? `${item.title}` : '';

    const loadData = () =>
        api.jobs.get()
            .then((data) => setData(data))
            .catch((error) => setError(error.message));


    const addEditDelete = (mode, item) => {
        let operation = Promise.resolve();
        switch (mode) {
            case 'add':
                operation = api.jobs.add(item);
                break;

            case 'edit':
                operation = api.jobs.update(item.id, item);
                break;

            case 'delete':
                operation = api.jobs.delete(item.id);
                break;

            default:
                break;
        }
        return operation;
    }

    return (
        <CRUD
            header="Job"
            data={data}
            fields={fields}
            error={error}
            setError={setError}
            getTitle={getTitle}
            loadData={loadData}
            addEditDelete={addEditDelete}
        />
    )
}
export default Jobs;