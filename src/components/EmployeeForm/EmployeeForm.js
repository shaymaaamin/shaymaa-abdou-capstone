import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button, Modal, Form } from "semantic-ui-react";
import {
  addEmployee,
  getEmployee,
  updatEmployee
} from "../../api";

function EmployeeForm() {
  const initialState = { firstName: '', lastName: '' };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(initialState);

  // Loading Employee data by ID
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getEmployee(id).then(reset);
    } else {
      reset(initialState);
    }
  }, [id]);

  // Fields Creation
  const firstName = register("firstName", {
    required: "First Name is Required!",
  });

  const lastName = register("lastName", {
    required: "Last Name is Required!",
  });

  // Form onSubmit
  const onSubmit = (data) => {
    if (id) {
      updatEmployee(id, data).then((result) => { });
    } else {
      addEmployee(data).then((result) => { });
    }
  };

  const [open, setOpen] = React.useState(true);

  return (
    <Modal
      closeIcon
      dimmer='blurring'
      size='mini'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>{id ? 'Edit' : 'Add'} Employee</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field error={!!errors.firstName}>
            <Form.Input
              id="form-field-input-firstName"
              label="First Name"
              placeholder="First Name"
              input={firstName}
            />
          </Form.Field>
          <Form.Field error={!!errors.lastName}>
            <Form.Input
              id="form-field-input-lastName"
              label="Last Name"
              placeholder="Last Name"
              input={lastName}
            />
          </Form.Field>
          <Modal.Actions>
            <Button
              type="button"
              content="Cancel"
              labelPosition='right'
              icon="cancel"
              onClick={() => setOpen(false)}
            />
            <Button
              type="submit"
              content={id ? 'Save' : 'Submit'}
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
export default EmployeeForm;
