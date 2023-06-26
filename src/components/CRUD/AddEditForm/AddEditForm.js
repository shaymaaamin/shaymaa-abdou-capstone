import { useEffect } from "react";
import { useForm } from '@mantine/form';
import { Button, Label, Modal } from "semantic-ui-react";
import { TextInput, Textarea, Select, Input } from '@mantine/core';

import ErrorMessage from "../ErrorMessage/ErrorMessage";

function AddEditForm({ header, error, mode, fields, item, setDispatcher, setFormValues }) {
    const initialValues = fields.reduce((acc, { key }) => Object.assign(acc, key ? { [key]: '' } : {}), { ...item });

    const { getInputProps, onSubmit, setValues, values } = useForm({ initialValues });

    useEffect(() => {
        setFormValues && setFormValues(values);
    }, [values]);

    useEffect(() => {
        setValues({ ...initialValues, ...item });
    }, [item]);

    // Form onSubmit
    const handleSubmit = (item) => {
        setDispatcher({ mode, item, success: true });
        setValues({ ...initialValues, ...item });
    };

    // Modal onClose
    const onClose = () => {
        setDispatcher({ mode: null, item, success: false });
        setValues({ ...initialValues, ...item });
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
                <form onSubmit={onSubmit(handleSubmit)}>
                    {
                        fields.map(({ key, label, value, type, options }) => {
                            let field;
                            switch (type) {
                                case 'select':
                                    field = (
                                        <Select
                                            data={options}
                                            placeholder={label}
                                            label={label}
                                            {...getInputProps(key)}
                                        />
                                    );
                                    break;
                                case 'textarea':
                                    field = (
                                        <Textarea
                                            placeholder={label}
                                            label={label}
                                            {...getInputProps(key)}
                                        />
                                    );
                                    break;
                                case 'label':
                                    value = value || item?.[key];
                                    field = (value &&
                                        <Input.Wrapper label={label}>
                                            <div style={{ margin: '0.5rem 0' }}>
                                                <Label>{value}</Label>
                                            </div>
                                        </Input.Wrapper>
                                    );
                                    break;
                                default:
                                    field = (
                                        <TextInput
                                            id={`form-field-input-${key}`}
                                            label={label}
                                            placeholder={label}
                                            withAsterisk
                                            {...getInputProps(key)}
                                        />
                                    );
                            }
                            return <div key={key}>{field}</div>;
                        })
                    }
                    <br />
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
                </form>
            </Modal.Content>
        </Modal>
    );
}

export default AddEditForm;