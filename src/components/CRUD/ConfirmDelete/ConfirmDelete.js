import { Confirm, Modal } from "semantic-ui-react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function ConfirmDelete({ header, mode, item, getTitle, error, setDispatcher }) {
    return <Confirm
        size="mini"
        header={`Delete ${header}`}
        open={mode === 'delete'}
        onCancel={() => setDispatcher({ mode: null })}
        onConfirm={() => setDispatcher({ item, mode: 'delete', success: true })}
        content={
            <Modal.Content>
                <ErrorMessage error={error} />
                <p>Are you sure you want to delete this record?</p>
                <strong>{getTitle(item)}</strong>
            </Modal.Content>
        }
    />
}

export default ConfirmDelete;
