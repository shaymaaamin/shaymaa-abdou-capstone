import React, { useEffect, useState } from "react";
import { Card, Icon, Label } from "semantic-ui-react";
import { addMarker } from "../../maps";

export default function ContactList({ employees, lookups, skills, map }) {
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

    const statusColors = {
        online: 'green',
        busy: 'orange',
        away: 'yellow',
        offline: 'grey',
    }

    const colors = [
        'red',
        'olive',
        'orange',
        'green',
        'yellow',
        'teal',
        'violet',
        'brown',
        'purple',
        'blue',
        'grey',
        'pink',
        'black',
    ];

    const hasSkills = (employee) => {
        return getSkills(employee).length > 0;
    }

    const getSkills = (employee) => {
        return skills
            .filter(s => s.employee_id === employee.id)
            .map(s => lookups.find(l => l.id === s.skill_id));
    }


    return (
        <Card.Group style={{ width: '100%' }}>
            {employees
                .map((employee) => (
                    <Card key={employee.id} onClick={() => selectEmployee(employee)}>
                        <Card.Content>
                            <Card.Header>
                                <Icon name="user" color={statusColors[employee.status]} />
                                {employee.first_name} {employee.last_name}
                            </Card.Header>
                            <Card.Meta>{employee.title}</Card.Meta>
                            <Card.Description>
                                {employee.distance} km
                            </Card.Description>
                        </Card.Content>
                        {hasSkills(employee) &&
                            <Card.Content extra>
                                {
                                    getSkills(employee)
                                        .map((skill, i) => (
                                            <Label
                                                color={colors[i]}
                                                style={{ margin: '0.1rem' }}
                                            >{skill.name}</Label>
                                        ))
                                }
                            </Card.Content>
                        }
                    </Card>
                ))}
        </Card.Group>
    );
};
