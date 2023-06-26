import React, { useEffect, useState } from "react";
import { Card, Icon, Label } from "semantic-ui-react";
import { addMarker } from "../../maps";
import EmployeeCard from "../EmployeeCard/EmployeeCard";

export default function ContactList({ map, employees, selectedEmployee, setSelectedEmployee }) {
    const [markers, setMarkers] = useState([]);

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



    return (
        <Card.Group style={{ width: '100%', height: '500px', overflowY: 'auto' }}>
            {employees
                .map((employee) => (
                    <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        onClick={() => setSelectedEmployee(employee)} />
                ))}
        </Card.Group>
    );
};
