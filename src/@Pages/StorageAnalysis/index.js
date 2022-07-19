import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import useHook from './hook';
import StorageDetail from './StorageDetail';
import StorageUsage from './StorageUsage';

export default (props) => {
  const h = useHook(props);
  return (
    <div className="p2" style={{ marginInline: '7.5rem' }}>
      <h1 className="mr-4 my-2 mb-3" style={{ fontWeight: 600, fontSize: 28, color: 'var(--primary-color)' }}>Storage Analysis</h1>
      {h.isLoading ? <CenteredLoadingContainer height="70vh" size={75} hasText text="page" /> : (
        <>
          <StorageDetail {...h} parentUser={props.user} />
          <StorageUsage {...h} />
        </>
      )}
    </div>
  );
};
