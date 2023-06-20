import { useEffect, useState } from "react";
import { Button, Card, Icon, Pagination } from "semantic-ui-react";

import * as api from "../../api";

import AddEditForm from "../CRUD/AddEditForm/AddEditForm";

export default function Sidebar({ selectedAsset, selectAsset, assets }) {
    const [displayForm, setDisplayForm] = useState(false);
    const [error, setError] = useState(null);
    const [dataState, dispatch] = useState({ mode: null, item: null, success: false });


    const [faults, setFaults] = useState([]);
    const [priorities, setPriorities] = useState([]);

    const fields = [
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'fault_id', label: 'Fault', type: 'select', options: faults },
        { key: 'priority_id', label: 'Priority', type: 'select', options: priorities },
    ];

    useEffect(() => {
        api.faults.get().then(data => setFaults(data.map(({ id, name, code }) => ({ value: id, label: `${name} - ${code}` })))).catch(setError);
        api.priorities.get().then(data => setPriorities(data.map(({ id, name }) => ({ value: id, label: name })))).catch(setError);
    }, []);

    const reportFault = () => {
        dispatch({ mode: 'add' });
    }

    const switchAsset = (idx) => {
        selectAsset(assets[idx - 1]);
        setDisplayForm(false);
    }

    useEffect(() => {
        const { mode, item, success } = dataState;
        if (mode && item && success) {
            api.jobs.add({ ...item, asset_id: selectedAsset.id })
                .then(() => dispatch({ mode: null, item: null, success: false }))
                .then(() => setError(null))
                .catch((error) => setError(error.message));
        } else {
            setError(null);
        }
    }, [dataState]);

    return (
        <Card centered={true} raised={true}>
            <Card.Content>
                <Card>
                    <Card.Content>
                        <Card.Header>{selectedAsset?.name}</Card.Header>
                        <Card.Description>{selectedAsset?.description}</Card.Description>
                        <Card.Content>type: {selectedAsset?.type}</Card.Content>
                        {displayForm ? null : <Button color="red" floated="right" content="Report Fault" onClick={() => reportFault()} />}
                    </Card.Content>
                </Card>
            </Card.Content>
            <AddEditForm
                header="Fault Report"
                mode={dataState.mode}
                item={dataState.item}
                fields={fields}
                error={error}
                dispatch={dispatch} />
            <div style={{ textAlign: 'center', margin: '1rem' }}>
                <Pagination
                    boundaryRange={0}
                    siblingRange={0}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                    nextItem={{ content: <Icon name='angle right' />, icon: true }}
                    totalPages={assets.length}
                    onPageChange={(e, { activePage }) => switchAsset(activePage)}
                />
            </div>
        </Card>
    );
}