import React, { useEffect } from "react";
import "./ContactList.scss";
import { addMarker } from "../../maps";

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
        <ul className="contact-list">
            {employees.map((employee, idx) => (
                <li className="contact-list__item" key={idx}>
                    {getStatus(employee)} {employee.firstName} {employee.lastName}
                </li>
            ))}
        </ul>
    );
};
