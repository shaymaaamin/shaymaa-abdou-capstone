import { Card, Icon, Label } from "semantic-ui-react";

export default function EmployeeCard({ employee }) {

    const statusColors = {
        online: 'green',
        busy: 'red',
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

    const getSkillColor = (skill) => {
        const index = skill.id % colors.length;
        return colors[index];
    }

    return (
        <Card raised >
            <Card.Content>
                <Card.Header>
                    {employee.first_name} {employee.last_name}
                </Card.Header>
                <Card.Meta>{employee.title}</Card.Meta>
                <Card.Meta>
                    <Icon name="user" color={statusColors[employee.status]} /> {employee.status}
                </Card.Meta>
                <Card.Description>
                    {employee.distance} km
                </Card.Description>
            </Card.Content>
            {employee.skills?.length &&
                <Card.Content extra>
                    {
                        employee.skills
                            .map((skill, i) => (
                                <Label
                                    key={i}
                                    color={getSkillColor(skill)}
                                    style={{ margin: '0.1rem' }}
                                >{skill.name}</Label>
                            ))
                    }
                </Card.Content>
            }
        </Card>
    )
}