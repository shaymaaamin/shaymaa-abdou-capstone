import React, { useEffect } from "react";
import "./ContactList.scss";
import { addMarker } from "../../maps";
import { List, Image, Card } from "semantic-ui-react";

export default function ContactList({ employees, map }) {
    useEffect(() => {
        if (!window.google) return;
        employees.forEach((employee) => {
            addMarker(map, employee.location, employee.name, "assets/images/user_pin.png");
        });
    }, [employees, map]);

    const getStatus = (employee) => {
        switch (employee.status) {
            case "online": return "🟢";
            case "busy": return "🔴";
            case "away": return "🟡";
            case "offline": return "⚫️";
            default: return "⚪️";
        }
    }

    return (
        <Card style={{ margin: '0 1rem' }}>
            <Card.Header as='h3'>Employees</Card.Header>
            <Card.Content>
                <List relaxed>
                    {employees.map((employee, idx) => (
                        <List.Item key={idx}>
                            <List.Content>
                                <List.Header>
                                    {getStatus(employee)} {employee.firstName} {employee.lastName}
                                </List.Header>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            </Card.Content>
        </Card>
    );
};
