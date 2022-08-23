import { Chip } from '@material-ui/core';

export default (props) => {
  return (
    <div className={`${props.className} d-flex w-100 overflow-scroll`} style={{ gap: 10, ...props.style }}>
      <Chip
        label="All"
        size="small"
        style={{
          color: 'white', cursor: 'pointer', ...props.chipStyle,
        }}
        className="color-gradient-inline mx-1"
      />
    </div>
  );
};
