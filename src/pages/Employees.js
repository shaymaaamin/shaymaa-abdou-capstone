import { useState } from "react";
import * as api from "../api";

import CRUD from "../components/CRUD/CRUD";

function Employees() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const fields = [
        { key: 'first_name', label: 'First Name' },
        { key: 'last_name', label: 'Last Name' },
        { key: 'email_address', label: 'Email' },
        { key: 'phone_number', label: 'Phone' },
    ];

    const getTitle = (item) => item ? `${item.first_name} ${item.last_name}` : '';

    const loadData = () =>
        api.employees.get()
            .then((data) => setData(data))
            .catch((error) => setError(error.message));


    const addEditDelete = (mode, item) => {
        let operation = Promise.resolve();
        switch (mode) {
            case 'add':
                operation = api.employees.add(item);
                break;

            case 'edit':
                operation = api.employees.update(item.id, item);
                break;

            case 'delete':
                operation = api.employees.delete(item.id);
                break;

            default:
                break;
        }
        return operation;
    }

    return (
        <CRUD
            header="Employee"
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
export default Employees;