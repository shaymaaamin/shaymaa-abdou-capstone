import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import * as api from "../../api";
import AddEditForm from "../CRUD/AddEditForm/AddEditForm";

export default function ReportFault({ lookups, dispatcher, setDispatcher, setFormValues, selectedAsset, selectedEmployee }) {
    const navigateTo = useNavigate();

    const [error, setError] = useState(null);

    const [faults, setFaults] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [skills, setSkills] = useState([]);

    const fields = [
        { label: 'Asset', type: 'label', value: selectedAsset?.name },
        { label: 'Employee', type: 'label', value: selectedEmployee?.first_name + ' ' + selectedEmployee?.last_name },
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'fault_id', label: 'Fault', type: 'select', options: faults },
        { key: 'priority_id', label: 'Priority', type: 'select', options: priorities },
        { key: 'skill_id', label: 'Skill', type: 'select', options: skills }
    ];

    useEffect(() => {
        const faults = lookups.filter(({ kind }) => kind === 'fault').map(({ id, name }) => ({ value: id, label: name }));
        const priorities = lookups.filter(({ kind }) => kind === 'priority').map(({ id, name }) => ({ value: id, label: name }));
        const skills = lookups.filter(({ kind }) => kind === 'skill').map(({ id, name }) => ({ value: id, label: name }));
        setFaults(faults);
        setPriorities(priorities);
        setSkills(skills);
    }, [lookups]);

    useEffect(() => {
        const { mode, item, success } = dispatcher;
        if (mode && item && success) {
            api.jobs.add({ ...item, asset_id: selectedAsset.id, employee_id: selectedEmployee.id })
                .then(id => navigateTo(`/jobs/${id}`))
                .then(() => setDispatcher({ mode: null, item: null, success: false }))
                .then(() => setError(null))
                .catch((error) => setError(error.message))
        } else {
            setError(null);
        }
    }, [dispatcher]);

    return (
        <AddEditForm
            header="Fault Report"
            mode={dispatcher.mode}
            item={dispatcher.item}
            fields={fields}
            error={error}
            setDispatcher={setDispatcher}
            setFormValues={setFormValues}
        />
    );
}