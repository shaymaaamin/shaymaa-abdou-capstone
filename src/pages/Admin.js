import { useEffect, useState } from "react";
import * as api from "../api";

import { useParams } from "react-router-dom";
import { Grid, Menu } from "semantic-ui-react";
import CRUD from "../components/CRUD/CRUD";

function Admin() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const items = [
        'faults',
        'priorities',
        'statuses',
        'skills',
        'types',
    ];
    
    const { key = items[0] } = useParams();

    useEffect(() => {
        setError(null);
        loadData();
    }, [key]);

    const fields = [
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
    ];

    const getTitle = (item) => item ? `${item.name}` : '';

    const loadData = () =>
        api[key].get()
            .then((data) => setData(data))
            .catch((error) => setError(error.message));


    const addEditDelete = (mode, item) => {
        let operation = Promise.resolve();
        switch (mode) {
            case 'add':
                operation = api[key].add(item);
                break;

            case 'edit':
                operation = api[key].update(item.id, item);
                break;

            case 'delete':
                operation = api[key].delete(item.id);
                break;

            default:
                break;
        }
        return operation;
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={4} textAlign="center" style={{ margin: 'auto' }}>
                    <Menu pointing vertical style={{ margin: 'auto' }}>
                        {items.map((item, idx) => (
                            <Menu.Item
                                key={idx}
                                name={item}
                                active={key === item}
                                href={`/#/admin/${item}`}
                            />
                        ))}
                    </Menu>
                </Grid.Column>
                <Grid.Column width={12} style={{ padding: '1rem 5rem 0 0' }}>
                    <CRUD
                        header={key.replace(/s$/, '')}
                        data={data}
                        fields={fields}
                        error={error}
                        setError={setError}
                        getTitle={getTitle}
                        loadData={loadData}
                        addEditDelete={addEditDelete}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
export default Admin;