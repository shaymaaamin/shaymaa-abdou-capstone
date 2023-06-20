import { useState } from "react";
import api from "../api";

import CRUD from "../components/CRUD/CRUD";

function Assets() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const fields = [
        { key: 'name', label: 'Name' },
        { key: 'lat', label: 'Latitude' },
        { key: 'lng', label: 'Longitude' },
        { key: 'type', label: 'Type' }
    ];

    const getTitle = (item) => item ? `${item.name}` : '';

    const loadData = () =>
        api.assets.get()
            .then((data) => setData(data))
            .catch((error) => setError(error.message));


    const addEditDelete = (mode, item) => {
        let operation = Promise.resolve();
        switch (mode) {
            case 'add':
                operation = api.assets.add(item);
                break;

            case 'edit':
                operation = api.assets.update(item.id, item);
                break;

            case 'delete':
                operation = api.assets.delete(item.id);
                break;

            default:
                break;
        }
        return operation;
    }

    return (
        <CRUD
            header="Asset"
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
export default Assets;