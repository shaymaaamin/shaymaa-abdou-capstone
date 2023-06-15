import { useEffect, useState } from "react";
import api from "../api";

import CRUD from "../components/CRUD/CRUD";

function Jobs() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const [assets, setAssets] = useState([]);
    const [faults, setFaults] = useState([]);
    const [priorities, setPriorities] = useState([]);

    useEffect(() => {
        api.assets.get().then(data => setAssets(data.map(({ id, name }) => ({ value: id, text: name })))).catch(setError);
        api.faults.get().then(data => setFaults(data.map(({ id, name, code }) => ({ value: id, text: `${name} - ${code}` })))).catch(setError);
        api.priorities.get().then(data => setPriorities(data.map(({ id, name }) => ({ value: id, text: name })))).catch(setError);
    }, [])

    const fields = [
        { key: 'asset', label: 'Asset', type: 'select', options: assets },
        { key: 'fault', label: 'Fault', type: 'select', options: faults },
        { key: 'priority', label: 'Priority', type: 'select', options: priorities },
        { key: 'date', label: 'Date', type: 'date' }
    ];

    const getTitle = (item) => item ? `${item.name}` : '';

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