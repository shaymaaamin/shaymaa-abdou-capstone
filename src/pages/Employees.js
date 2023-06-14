import { useState } from "react";
import { addEmployee, deleteEmployee, getEmployees, updatEmployee } from "../api";

import CRUD from "../components/CRUD/CRUD";

function Employees() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const fields = [
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' }
    ];

    const getTitle = (item) => item ? `${item.firstName} ${item.lastName}` : '';

    const loadData = () =>
        getEmployees()
            .then((data) => setData(data))
            .catch((error) => setError(error.message));


    const addEditDelete = (mode, item) => {
        let operation = Promise.resolve();
        switch (mode) {
            case 'add':
                operation = addEmployee(item);
                break;

            case 'edit':
                operation = updatEmployee(item.id, item);
                break;

            case 'delete':
                operation = deleteEmployee(item.id);
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