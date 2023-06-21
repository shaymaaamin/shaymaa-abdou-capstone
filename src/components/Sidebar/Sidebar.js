import { useEffect, useState } from "react";
import { Button, Card, Icon, Pagination } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import * as api from "../../api";

import AddEditForm from "../CRUD/AddEditForm/AddEditForm";

export default function Sidebar({ assets, employees, lookups, selectedAsset, setSelectedAsset }) {
    const navigateTo = useNavigate();
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
        const faults = lookups.filter(({ kind }) => kind === 'fault').map(({ id, name }) => ({ value: id, label: name }));
        const priorities = lookups.filter(({ kind }) => kind === 'priority').map(({ id, name }) => ({ value: id, label: name }));
        setFaults(faults);
        setPriorities(priorities);
    }, [lookups]);

    const getAssetType = (asset) => {
        return lookups.find(({ id }) => id === asset?.type_id)?.name;
    }

    const reportFault = () => {
        dispatch({ mode: 'add' });
    }

    const switchAsset = (idx) => {
        setSelectedAsset(assets[idx - 1]);
        setDisplayForm(false);
    }

    useEffect(() => {
        const { mode, item, success } = dataState;
        if (mode && item && success) {
            api.jobs.add({ ...item, asset_id: selectedAsset.id, employee_id: employees[0].id })
                .then(id => navigateTo(`/jobs/${id}`))
                .then(() => dispatch({ mode: null, item: null, success: false }))
                .then(() => setError(null))
                .catch((error) => setError(error.message))
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
                        <Card.Content>type: {getAssetType(selectedAsset)}</Card.Content>
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