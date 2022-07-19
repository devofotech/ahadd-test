import Button from '@Components/Button';
import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import {
  TextField, InputLabel, Select, MenuItem, FormControl,
} from '@material-ui/core';

export default (h) => {
  const isFieldEmpty = !(!!h.category && !!h.dateProgress && !!h.imageryName);
  return (
    <div className="w-25 mt-5 mx-auto" style={{ minHeight: '60vh' }}>
      {h.isLoading ? <CenteredLoadingContainer size={75} hasText text="data" /> : (
        <>
          <TextField
            label="Report Name"
            value={h.imageryName}
            onChange={e => h.setImageryName(e.target.value)}
            className="w-100 my-2"
            variant="standard"
          />
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
        </>
      )}
    </div>
  );
};
