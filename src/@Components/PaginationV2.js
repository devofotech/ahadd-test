import { useEffect, useRef } from 'react';
import {
  TextField, MenuItem, IconButton, InputAdornment,
} from '@material-ui/core';
import {
  ChevronLeft, ChevronRight, FirstPage, LastPage, Search, Close,
} from '@material-ui/icons';
import { ButtonGroup } from 'react-bootstrap';

export default ({
  totalData = 0,
  keys = '',
  setKeys = () => null,
  keyword = '',
  setKeyword = () => null,
  page = 1,
  setPage = () => null,
  perPage = 10,
  setPerPage = () => null,
  keysList = [],
  onKeyDown = () => null,
  onCloseSearch = () => null,
}) => {
  const maxPage = Math.ceil(totalData / perPage);
  const pageList = Array.from({ length: maxPage }, (_, i) => i + 1);

  useEffect(() => {
    setPage(1);
  }, [perPage]);

  return (
    <div className="w-100 d-flex justify-content-between my-3">
      <div className="d-flex align-items-center" style={{ transform: 'scale(0.9) translate(-5%,0)' }}>
        <TextField
          select
          value={keys}
          onChange={(e) => setKeys(e.target.value)}
          size="small"
          variant="outlined"
          style={{ minWidth: '5.5rem' }}
        >
          {keysList.map((e) => <MenuItem key={e.key} value={e.key}>{e.label}</MenuItem>)}
        </TextField>
        <TextField
          variant="outlined"
          size="small"
          disabled={!keys}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search"
          onKeyDown={onKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <Search />
              </InputAdornment>
            ),
          }}
        />
        {/* {!!keyword.length && <IconBtn children={<Close fontSize="small" onClick={onCloseSearch} />} />} */}
      </div>
      {totalData > perPage && (
        <ButtonGroup size="small" className="flex-standard" style={{ transform: 'scale(0.9) translate(-15%,0)' }}>
          <IconBtn disabled={page === 1} children={<FirstPage fontSize="small" />} onClick={() => setPage(1)} />
          <IconBtn disabled={page === 1} children={<ChevronLeft fontSize="small" />} onClick={() => setPage(prev => prev - 1)} />
          <TextField
            className="mx-2"
            select
            value={page}
            onChange={(e) => setPage(e.target.value)}
            size="small"
            variant="outlined"
          >
            {pageList.map(e => (
              <MenuItem key={e} value={e}>{`${e}`}</MenuItem>
            ))}
          </TextField>
          <IconBtn disabled={page === maxPage} children={<ChevronRight fontSize="small" onClick={() => setPage(prev => prev + 1)} />} />
          <IconBtn disabled={page === maxPage} children={<LastPage fontSize="small" onClick={() => setPage(maxPage)} />} />
        </ButtonGroup>
      )}
      <div className="d-flex align-items-center" style={{ transform: 'scale(0.9) translate(5%,0)' }}>
        <p className="mr-2 text-dark" style={{ fontSize: 12 }}>Items Per Page</p>
        <TextField
          select
          value={perPage}
          onChange={(e) => setPerPage(e.target.value)}
          size="small"
          variant="outlined"
          disabled={!(totalData > 10)}
        >
          {[10, 30, 50].map((e) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
        </TextField>
      </div>
    </div>
  );
};

const IconBtn = ({ disabled, onClick, children }) => {
  return (
    <IconButton disabled={disabled} onClick={onClick} className="p-1">
      {children}
    </IconButton>
  );
};
