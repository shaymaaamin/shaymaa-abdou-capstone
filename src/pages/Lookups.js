import { useEffect, useState } from "react";
import * as api from "../api";

import CRUD from "../components/CRUD/CRUD";

function Lookups() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const options = ['fault', 'priority', 'skill', 'status', 'asset_type'];
    const fields = [
        { key: 'kind', label: 'Kind', type: 'select', options },
        { key: 'name', label: 'Name' },
    ];

    const getTitle = (item) => item ? `${item.name}` : '';

    const loadData = () =>
        api.lookups.get()
            .then((data) => setData(data))
            .catch((error) => setError(error.message));

    const addEditDelete = (mode, item) => {
        let operation = Promise.resolve();
        switch (mode) {
            case 'add':
                operation = api.lookups.add(item);
                break;

            case 'edit':
                operation = api.lookups.update(item.id, item);
                break;

            case 'delete':
                operation = api.lookups.delete(item.id);
                break;

            default:
                break;
        }
        return operation;
    }

    return (
        <CRUD
            header="Lookup"
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
export default Lookups;