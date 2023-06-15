import { Modal } from "semantic-ui-react";

function CreateAssignment({ job, open, onClose }) {
    return (
        <Modal
            closeIcon
            size='mini'
            dimmer='blurring'
            open={open}
            onClose={() => onClose && onClose()}
        >
            <Modal.Header>Create Assignment</Modal.Header>
            <Modal.Content>
            </Modal.Content>
        </Modal>
    )

}

export default CreateAssignment;