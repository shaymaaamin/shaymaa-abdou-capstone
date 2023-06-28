import { useState, useEffect } from "react";
import { Card, Icon, Pagination } from "semantic-ui-react";
import AssetCard from "../AssetCard/AssetCard";

export default function Sidebar({ jobs, assets, lookups, selectedAsset, setSelectedAsset, setDispatcher }) {
  const [faults, setFaults] = useState([]);

  const reportFault = () => {
    setDispatcher({ mode: 'add' });
  }

  const switchAsset = (idx) => {
    setSelectedAsset(assets[idx - 1]);
  }

  useEffect(() => {
    const previousJobs = jobs.filter((job) => job.asset_id === selectedAsset.id);
    setFaults(previousJobs
      .map((job) => job.fault_id)
      .map((id) => lookups.find((lookup) => lookup.id === id)?.name));
  }, [selectedAsset]);

  return (
    <Card centered={true} raised={true}>
      <Card.Content>
        <AssetCard asset={selectedAsset} reportFault={reportFault} />
      </Card.Content>
      <Card.Content>
        <div>
          <h3>Previous Faults:</h3>
          {faults.length > 0 ? (
            <ul>
              {faults.map((fault, idx) => (
                <li key={idx}>{fault}</li>
              ))}
            </ul>
          ) : (
            <p>No faults found.</p>
          )}
        </div>
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