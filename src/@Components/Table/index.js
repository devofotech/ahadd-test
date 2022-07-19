import { ArrowDropDown } from '@material-ui/icons';
import { useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import './styles.css';

createTheme('material', {
  text: {
    primary: 'rgba(0,24,71,1)',
    secondary: 'rgba(0,24,71,1)',
  },
  context: {
    background: 'transparent',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
  divider: {
    default: 'rgba(0,0,0,0)',
  },
});

const customStyles = {
  headCells: {
    style: {
      fontSize: 13,
      opacity: 0.35,
      fontFamily: 'CeraProRegular',
    },
  },
  cells: {
    style: {
      fontSize: 16,
      paddingBottom: 20,
      fontFamily: 'CeraProRegular',
    },
  },
  header: {
    style: {
      overflow: 'visible',
    },
  },
};

export default function Table(props) {
  return (
    <DataTable
      title={!!props.title && <TableHeader {...props} />}
      noHeader={!props.title}
      noContextMenu
      columns={props.columns}
      data={props.data}
      pagination={props.pagination}
      theme="material"
      props={props.dense}
      customStyles={customStyles}
    />
  );
}

const TableHeader = (props) => (
  <div style={{ display: 'flex', overflow: 'visible' }}>
    <SearchBar {...props} />
    <SortDropdown {...props} />
    <FilterDropdown {...props} />
  </div>
);

const SearchBar = () => (
  <input
    className="table-input"
    style={{ cursor: 'inherit' }}
    type="text"
    placeholder="Search"
  />
);

function SortDropdown(props) {
  const [isOpen, setOpen] = useState(false);
  const [chosen, setChosen] = useState(null);

  return (
    <div className="dropdown-container">
      <button
        className="table-input"
        style={{ background: !chosen && 'rgba(0,24,71,0.1)' }}
        onClick={() => setOpen(v => !v)}
        disabled={!props.columns.length}
      >
        {chosen?.name || <>Sort by</>}
        <ArrowDropDown />
      </button>
      {props.columns.length > 0 && (
        <div className="dropdown-menu" style={{ display: isOpen && 'block' }}>
          <button
            className="dropdown-item"
            onClick={() => {
              setChosen(null);
              setOpen(false);
            }}
          >
            Clear
          </button>
          {props.columns.map((data) => (
            <button
              className="dropdown-item"
              onClick={() => {
                setChosen(data);
                setOpen(false);
              }}
            >
              {data.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterDropdown(props) {
  const [isOpen, setOpen] = useState(false);
  const [chosen, setChosen] = useState(null);

  return (
    <div className="dropdown-container">
      <button
        className="table-input"
        style={{ background: !chosen && 'rgba(0,24,71,0.1)' }}
        onClick={() => setOpen(v => !v)}
        disabled={!props.columns.length}
      >
        {chosen?.name || <>Filter by</>}
        <ArrowDropDown />
      </button>
      {props.columns.length > 0 && (
        <div className="dropdown-menu" style={{ display: isOpen && 'block' }}>
          <button
            className="dropdown-item"
            onClick={() => {
              setChosen(null);
              setOpen(false);
            }}
          >
            Clear
          </button>
          {props.columns.map((data) => (
            <button
              className="dropdown-item"
              onClick={() => {
                setChosen(data);
                setOpen(false);
              }}
            >
              {data.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
