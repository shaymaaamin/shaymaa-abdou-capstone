import { useEffect, useState } from "react";
import { Container, Header } from "semantic-ui-react";

import ConfirmDelete from "./ConfirmDelete/ConfirmDelete";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import AddEditForm from "./AddEditForm/AddEditForm";
import DataTable from "./DataTable/DataTable";

function CRUD({ header, data, fields, getTitle, error, setError, loadData, addEditDelete, enableAdd = true }) {
    const [dispatcher, setDispatcher] = useState({ mode: null, item: null, success: false });


    useEffect(() => {
        loadData();
    }, []);


    useEffect(() => {
        const { mode, item, success } = dispatcher;
        if (mode && item && success) {
            addEditDelete(mode, item)
                .then(() => loadData())
                .then(() => setDispatcher({ mode: null, item: null, success: false }))
                .then(() => setError(null))
                .catch((error) => setError(error.message));
        } else {
            setError(null);
        }
    }, [dispatcher]);


    return (
        <Container>
            <Header as="h1" content={`${header}s`} />
            <ConfirmDelete header={header} mode={dispatcher.mode} item={dispatcher.item} getTitle={getTitle} error={error} setDispatcher={setDispatcher} />
            <ErrorMessage error={!dispatcher.mode && error} />
            <AddEditForm header={header} mode={dispatcher.mode} item={dispatcher.item} fields={fields} error={error} setDispatcher={setDispatcher} />
            <DataTable data={data} fields={fields} setDispatcher={setDispatcher} enableAdd={enableAdd} />
        </Container >
    )
}

export default CRUD;