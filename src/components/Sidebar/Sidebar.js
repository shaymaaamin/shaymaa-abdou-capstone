import { Card, Icon, Pagination } from "semantic-ui-react";
import AssetCard from "../AssetCard/AssetCard";

export default function Sidebar({ assets, selectedAsset, setSelectedAsset, setDispatcher }) {

    const reportFault = () => {
        setDispatcher({ mode: 'add' });
    }

    const switchAsset = (idx) => {
        setSelectedAsset(assets[idx - 1]);
    }

    return (
        <Card centered={true} raised={true}>
            <Card.Content>
                <AssetCard asset={selectedAsset} reportFault={reportFault} />
            </Card.Content>
            <div style={{ textAlign: 'center', margin: '1rem' }}>
                <Pagination
                    boundaryRange={0}
                    siblingRange={0}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                    nextItem={{ content: <Icon name='angle right' />, icon: true }}
                    totalPages={assets.length}
                    onPageChange={(e, { activePage }) => switchAsset(activePage)}
                />
            </div>
        </Card>
    );
}