import { Button, Card } from "semantic-ui-react";

export default function AssetCard({ asset, reportFault }) {
    return (
        <Card raised>
            <Card.Content>
                <Card.Header>{asset?.name}</Card.Header>
                <Card.Description>{asset?.description}</Card.Description>
                <Card.Content>type: {asset?.type}</Card.Content>
                {reportFault && <Button color="red" floated="right" content="Report Fault" onClick={() => reportFault()} />}
            </Card.Content>
        </Card>
    )
}