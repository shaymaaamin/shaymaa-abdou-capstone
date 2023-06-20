import { Button, Table } from "semantic-ui-react";

function DataTable({ data, fields, dispatch }) {
    return (
        <Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>id</Table.HeaderCell>
                    {fields.map(({ key, label }) => (
                        <Table.HeaderCell key={key}>{label}</Table.HeaderCell>
                    ))}
                    <Table.HeaderCell collapsing colSpan="2">
                        <Button icon="add" color="green" onClick={(e) => dispatch({ mode: 'add' })} />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map((item) => (
                    <Table.Row key={item.id}>
                        <Table.Cell>{item.id}</Table.Cell>
                        {fields.map(({ key, options }) => {
                            let value = item[key];
                            if (options) {
                                value = options.find(({ value }) => value === item[key])?.label || value;
                            }
                            return (
                                <Table.Cell key={key}>{value}</Table.Cell>
                            )
                        })}
                        <Table.Cell collapsing textAlign="center">
                            <Button color="blue" icon="edit" onClick={(e) => dispatch({ mode: 'edit', item })} />
                        </Table.Cell>
                        <Table.Cell collapsing textAlign="center">
                            <Button color="red" icon="delete" onClick={(e) => dispatch({ mode: 'delete', item })} />
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}

export default DataTable;