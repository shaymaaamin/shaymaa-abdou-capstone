import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Modal } from "semantic-ui-react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function AddEditForm({ header, error, mode, fields, item, dispatch }) {
    const initialState = fields.reduce((acc, { key }) => ({ ...acc, [key]: null }), {});

    const { register, handleSubmit, reset, formState: { errors }, } = useForm(initialState);

    useEffect(() => {
        reset(item);
    }, [item]);

    // Form onSubmit
    const onSubmit = (item) => {
        dispatch({ mode, item, success: true });
        reset(initialState);
    };

    // Modal onClose
    const onClose = () => {
        dispatch({ mode: null, item, success: false });
        reset(initialState);
    };

    return (
        <Modal
            closeIcon
            size='mini'
            dimmer='blurring'
            open={mode === 'add' || mode === 'edit'}
            onClose={() => onClose()}
        >
            <Modal.Header>{item?.id ? 'Edit' : 'Add'} {header}</Modal.Header>
            <Modal.Content>
                <ErrorMessage error={error} />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {
                        fields.map(({ key, label }) => {
                            return (
                                <Form.Field key={key} error={!!errors[key]}>
                                    <Form.Input
                                        id={`form-field-input-${key}`}
                                        label={label}
                                        placeholder={label}
                                        input={register(key, { required: `${label} is Required!` })}
                                    />
                                </Form.Field>
                            )
                        })
                    }
                    <Modal.Actions>
                        <Button
                            type="button"
                            content="Cancel"
                            labelPosition='right'
                            icon="cancel"
                            onClick={() => onClose()}
                        />
                        <Button
                            type="submit"
                            content={item?.id ? 'Save' : 'Submit'}
                            positive
                            labelPosition='right'
                            icon="checkmark"
                        />
                    </Modal.Actions>
                </Form>
            </Modal.Content>
        </Modal>
    );
}

export default AddEditForm;