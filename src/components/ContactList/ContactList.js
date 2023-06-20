import React, { useEffect, useState } from "react";
import { Card, Header, Icon, Menu } from "semantic-ui-react";
import { addMarker } from "../../maps";


export default function ContactList({ employees, map }) {
    const [markers, setMarkers] = useState([]);
    const [selectedEmployee, selectEmployee] = useState(null);

    useEffect(() => {
        if (!window.google) return;
        markers.forEach(marker => marker.setMap(null));

        const newMarkers = [];
        employees.forEach((employee) => {
            const icon = employee?.id === selectedEmployee?.id ? "assets/images/user_pin_selected.png" : "assets/images/user_pin.png";
            const marker = addMarker(map, { lat: employee.lat, lng: employee.lng }, employee.first_name + ' ' + employee.last_name, icon);
            marker.employee = employee;
            newMarkers.push(marker);
        });
        setMarkers(newMarkers);
    }, [employees, map, selectedEmployee]);

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
        <Card centered={true} raised={true}>
            <Header as='h3' textAlign="center">Employees</Header>
            <Menu pointing vertical fluid={true} >
                {employees.map((employee, idx) => (
                    <Menu.Item key={idx} onClick={() => selectEmployee(employee)}>
                        <Icon name='angle right' />
                        <div>{getStatus(employee)} {employee.first_name} {employee.last_name}</div>
                    </Menu.Item>
                ))}
            </Menu>
        </Card>
    );
};
