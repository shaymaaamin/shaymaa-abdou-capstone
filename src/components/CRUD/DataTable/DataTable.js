import { useState } from "react";
import { Button, Icon, Pagination, Table } from "semantic-ui-react";

function DataTable({ data, fields, setDispatcher, enableAdd = true }) {
    const pageSize = 5;
    const totalPages = Math.ceil(data.length / pageSize);
    const [activePage, setActivePage] = useState(1);

    const startIndex = (activePage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const filteredData = data.slice(startIndex, endIndex);

    return (
        <Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell collapsing>id</Table.HeaderCell>
                    {fields.map(({ key, label }) => (
                        <Table.HeaderCell key={key}>{label}</Table.HeaderCell>
                    ))}
                    <Table.HeaderCell collapsing colSpan="2">
                        {enableAdd && <Button icon="add" color="green" onClick={(e) => setDispatcher({ mode: 'add' })} />}
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {filteredData.map((item) => (
                    <Table.Row key={item.id}>
                        <Table.Cell collapsing>{item.id}</Table.Cell>
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
                            <Button color="blue" icon="edit" onClick={(e) => setDispatcher({ mode: 'edit', item })} />
                        </Table.Cell>
                        <Table.Cell collapsing textAlign="center">
                            <Button color="red" icon="delete" onClick={(e) => setDispatcher({ mode: 'delete', item })} />
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan={fields.length + 2} textAlign="center">
                        <Pagination
                            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                            prevItem={{ content: <Icon name='angle left' />, icon: true }}
                            nextItem={{ content: <Icon name='angle right' />, icon: true }}
                            activePage={activePage}
                            totalPages={totalPages}
                            onPageChange={(e, { activePage }) => setActivePage(activePage)}
                        />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>

        </Table >
    );
}

export default DataTable;