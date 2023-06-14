import { useEffect, useState } from "react";
import { Button, Container, Grid, Table } from "semantic-ui-react";
import { getEmployees } from "../api";

function Employees() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getEmployees()
            .then((employees) => setEmployees(employees))
            .catch((error) => console.log(error));
    }, []);

    const addEmployee = (e) => {
        e.preventDefault();
    }

    const editEmployee = (e, id) => {
        e.preventDefault();
    }

    const deleteEmployee = (e, id) => {
        e.preventDefault();
    }

    return (
        <Container>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>id</Table.HeaderCell>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell collapsing colSpan="2">
                            <Button icon="add" color="green" onClick={(e) => addEmployee(e)} />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {employees.map((employee) => (
                        <Table.Row>
                            <Table.Cell>{employee.id}</Table.Cell>
                            <Table.Cell>{employee.firstName}</Table.Cell>
                            <Table.Cell>{employee.lastName}</Table.Cell>
                            <Table.Cell collapsing textAlign="center">
                                <Button color="blue" icon="edit" onClick={(e) => editEmployee(e, employee.id)} />
                            </Table.Cell>
                            <Table.Cell collapsing textAlign="center">
                                <Button color="red" icon="delete" onClick={(e) => deleteEmployee(e, employee.id)} />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Container >
    )
}
export default Employees;