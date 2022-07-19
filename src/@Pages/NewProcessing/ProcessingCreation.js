import Button from '@Components/Button';
import {
  TextField, InputLabel, Select, MenuItem, FormControl, CircularProgress,
} from '@material-ui/core';
import NoData from '@Assets/Images/Data-not-found3.png';

const Loader = () => (
  <CircularProgress
    size={75}
    className="position-absolute"
    style={{
      top: '50%', left: '50%', marginTop: -80, marginLeft: -40, color: 'var(--primary-color)',
    }}
  />
);
const NoDataUi = () => (
  <div className="d-flex justify-content-center w-100 m-4 p-5">
    <img src={NoData} style={{ height: '55vh' }} />
  </div>
);
export default (h) => {
  const isFieldEmpty = !(!!h.dateProgress && !!h.assetId);
  if (h.isLoading) return <Loader />;

  return !h.assets.length ? <NoDataUi /> : (
    <div className="w-25 mt-5 mx-auto" style={{ minHeight: '60vh' }}>
      <FormControl className="w-100">
        <InputLabel>Assets Name</InputLabel>
        <Select
          value={h.assetId}
          onChange={(e) => h.setAssetId(e.target.value)}
        >
          {h.assets.map(a => (
            <MenuItem value={a.id}>{a.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="w-100">
        <InputLabel>Select Phase</InputLabel>
        <Select
          value={h.category}
          onChange={(e) => h.setCategory(Number(e.target.value))}
        >
          {h.filteredPhases.map(p => (
            <MenuItem value={p.id}>{p.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Date Progress"
        value={h.dateProgress}
        onChange={e => h.setDateProgress(e.target.value)}
        className="w-100 my-3"
        variant="standard"
        type="date"
        InputLabelProps={{ shrink: true }}
      />
      <Button className="mt-4 float-right" onClick={h.handleNextStep} disabled={isFieldEmpty}>
        NEXT
      </Button>
    </div>
  );
};
