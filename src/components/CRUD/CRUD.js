import { useEffect, useState } from "react";
import { Container, Header } from "semantic-ui-react";

import ConfirmDelete from "./ConfirmDelete/ConfirmDelete";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import AddEditForm from "./AddEditForm/AddEditForm";
import DataTable from "./DataTable/DataTable";

function CRUD({ header, data, fields, getTitle, error, setError, loadData, addEditDelete }) {
    const [dataState, dispatch] = useState({ mode: null, item: null, success: false });


    useEffect(() => {
        loadData();
    }, []);


    useEffect(() => {
        const { mode, item, success } = dataState;
        if (mode && item && success) {
            addEditDelete(mode, item)
                .then(() => loadData())
                .then(() => dispatch({ mode: null, item: null, success: false }))
                .then(() => setError(null))
                .catch((error) => setError(error.message));
        } else {
            setError(null);
        }
    }, [dataState]);


    return (
        <Container>
            <Header as="h1" content={`${header}s`} />
            <ConfirmDelete header={header} mode={dataState.mode} item={dataState.item} getTitle={getTitle} error={error} dispatch={dispatch} />
            <ErrorMessage error={!dataState.mode && error} />
            <AddEditForm header={header} mode={dataState.mode} item={dataState.item} fields={fields} error={error} dispatch={dispatch} />
            <DataTable data={data} fields={fields} dispatch={dispatch} />
        </Container >
    )
}

export default CRUD;