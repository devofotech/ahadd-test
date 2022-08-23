/* eslint-disable complexity */
/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import {
  Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import {
  ArrowDropDown, ArrowDropUp, FirstPage, LastPage, NavigateBefore, NavigateNext,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  alternateColor: {
    '&:nth-of-type(odd) .MuiTableCell-root': { color: '#008FFB !important' },
    '&:nth-of-type(even) .MuiTableCell-root': { color: '#B85EEE !important' },
  },
  borderBottom: {
    '&.MuiTableRow-root': { borderBottom: '1px solid grey' },
  },
});

export default function StatisticTable(props) {
  const [sortState, setSortState] = useState({});
  const [paginationState, setPaginationState] = useState({
    page: 0,
    numToShow: 10,
    lastPage: Math.ceil(props.tableData.length / 10) - 1,
    total: props.tableData.length,
  });
  const [data, setData] = useState(props.tableData);

  const toggleSort = (key) => {
    setSortState({ ...sortState, [key]: !sortState[key] });
  };

  const clearSort = () => {
    setSortState({});
  };

  useEffect(() => {
    if (props.header) {
      const newData = props.tableData.slice(
        paginationState.page * paginationState.numToShow,
        paginationState.page * paginationState.numToShow
          + paginationState.numToShow,
      );
      setData([...newData]);
    } else {
      setData(props.tableData);
    }
  }, [paginationState, props.tableData, props.header]);

  return (
    <>
      {props.header && (
        <TableHeader
          {...props}
          toggleSort={toggleSort}
          sortState={sortState}
          clearSort={clearSort}
          paginationState={paginationState}
          setPaginationState={setPaginationState}
        />
      )}
      <TableContainer style={{ maxHeight: props.tableMaxHeight }}>
        <Table
          stickyHeader
          size={props.tableSize}
          style={{ minWidth: props.tableMinWidth }}
        >
          {!!props.tableHead && props.tableHead !== false && (
            <TableHead>
              <TableHeadData
                {...props}
                toggleSort={toggleSort}
                sortState={sortState}
              />
            </TableHead>
          )}

          <TableBody>
            <TableBodyData
              {...props}
              toggleSort={toggleSort}
              sortState={sortState}
              paginationState={paginationState}
              data={data}
            />
          </TableBody>
          {props.footerData && props.footerData.length > 0 && (
            <TableFooter {...props} />
          )}
        </Table>
      </TableContainer>
    </>
  );
}

function TableHeadData(props) {
  const { columns, toggleSort, sortState } = props;
  return (
    <TableRow>
      {columns.map((column, index) => (
        <TableCell
          className="text-light"
          key={index}
          align={column.align}
          style={{
            backgroundColor: '#FFF',
            minWidth: column.minWidth,
          }}
        >
          {column.top && (
            <p className="text-light" style={{ textAlign: 'center' }}>
              {column.top}
            </p>
          )}
          <div
            style={{
              display: 'flex',
              justifyContent:
                column.align === 'right'
                  ? 'flex-end'
                  : column.align === 'left'
                    ? 'flex-start'
                    : 'center',
              alignItems: 'flex-end',
              cursor: 'pointer',
              border: '1px solid #FFFFFF',
              ...column.style,
            }}
            onClick={() => {
              toggleSort(column.selector);
            }}
          >
            {column.name}
            {column.sortable
              && (sortState[column.selector] ? (
                <ArrowDropUp />
              ) : (
                <ArrowDropDown />
              ))}
          </div>
        </TableCell>
      ))}
    </TableRow>
  );
}

function TableBodyData(props) {
  const {
    data,
    columns,
    subColumns,
    subColumnTop,
    toggleSort,
    sortState,
    rowClick,
  } = props;

  const classes = useStyles();

  let returnData = [];
  if (data && data.length > 0) {
    if (subColumns && subColumns.length > 0) {
      returnData = data.map((item, itemIndex) => {
        const innerData = item.data.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            className={rowClick && 'row-hover'}
            onClick={() => rowClick && rowClick(row)}
          >
            {columns.map((column, colIndex) => (
              <TableCell
                key={rowIndex + colIndex}
                align={column.align}
                colSpan={column.colSpan}
                rowSpan={column.rowSpan}
              >
                {row[column.selector]}
              </TableCell>
            ))}
          </TableRow>
        ));
        const subColumnItem = (
          <TableRow key={`i${ itemIndex}`}>
            {subColumns.map((subColumn, subColIndex) => {
              return (
                <TableCell
                  key={`sc${ subColIndex}`}
                  align={subColumn.align}
                  colSpan={subColumn.colSpan}
                  style={{
                    fontWeight: 500,
                  }}
                >
                  {subColumn.name && (
                    <div
                      className="text-light"
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        toggleSort(`sc${ subColIndex}`);
                      }}
                    >
                      {subColumn.name}
                      {subColumn.sortable
                        && (sortState[`sc${ subColIndex}`] ? (
                          <ArrowDropUp style={{ marginBottom: 2 }} />
                        ) : (
                          <ArrowDropDown style={{ marginBottom: 2 }} />
                        ))}
                    </div>
                  )}
                  <p>{item[subColumn.selector]}</p>
                </TableCell>
              );
            })}
          </TableRow>
        );
        if (subColumnTop) {
          innerData.unshift(subColumnItem);
        } else {
          innerData.push(subColumnItem);
        }
        return innerData;
      });
    } else {
      returnData = data.map((row, rowIndex) => (
        <>
          <TableRow
            key={rowIndex}
            className={`${rowClick && 'row-hover'} ${props.color === 'alternate' && classes.alternateColor} ${classes.borderBottom}`}
            onClick={() => rowClick && rowClick(row)}
            style={{ borderBottom: '1px solid grey' }}
          >
            {columns.map((column, colIndex) => (
              <TableCell
                key={rowIndex + colIndex}
                align={column.align}
                colSpan={column.colSpan}
                // className={`${!colIndex && 'color-main'}`}
                style={{ color: !colIndex ? 'white' : 'white' }}
              >
                {row[column.selector]}
              </TableCell>
            ))}
          </TableRow>
          {/* <Divider variant="fullWidth" />
          <div style={{ width: '100%', borderBottom: '2px solid grey' }} /> */}
          {/* <div className="w-100">
            <Divider variant="fullWidth" />
          </div> */}
        </>
      ));
    }
  } else {
    returnData = (
      <TableRow>
        <TableCell
          colSpan={columns.length}
          align="center"
          className="text-light"
        >
          No data available.
        </TableCell>
      </TableRow>
    );
  }
  return returnData;
}

function TableFooter(props) {
  const { footerData } = props;
  return (
    <TableBody style={{ borderCollapse: 'separate' }}>
      {footerData.map((footerRow, footerRowIndex) => (
        <TableRow key={footerRowIndex}>
          {footerRow.map((footerColumn, footerColIndex) => (
            <TableCell
              key={footerColIndex}
              align={footerColumn.align}
              colSpan={footerColumn.colSpan}
              style={{
                fontWeight: 500,
                fontSize: 16,
                position: 'sticky',
                bottom: 0,
                left: 0,
                backgroundColor: '#FFF',
              }}
            >
              {footerColumn.name}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}

function TableHeader(props) {
  return (
    <div
      style={{
        display: 'flex',
        padding: '10px 20px',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', flex: 1 }}>
        {props.search || props.search !== false ? (
          <SearchBar {...props} />
        ) : (
          <></>
        )}
        {props.sorter && <SortDropdown {...props} />}
        {props.filter && <FilterDropdown {...props} />}
      </div>
      <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
        <Pagination {...props} />
      </div>
    </div>
  );
}

function Pagination(props) {
  const { paginationState, setPaginationState } = props;
  const {
    page, numToShow, total, lastPage,
  } = paginationState;

  const setPage = (page) => {
    if (page < 0) {
      page = 0;
    }
    if (page * numToShow > total) {
      page -= 1;
    }
    setPaginationState({ ...paginationState, page });
  };

  const setNumToShow = (numToShow) => {
    const newLastPage = Math.ceil(props.tableData.length / numToShow) - 1;
    setPaginationState({
      ...paginationState,
      numToShow,
      lastPage: newLastPage,
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        fontSize: 12,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p style={{ marginLeft: 10 }}>Rows per page: </p>
      <select
        onChange={(e) => setNumToShow(Number(e.target.value))}
        className="table-input"
        style={{ marginLeft: 10 }}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      <p>
        {page * numToShow + 1}-
        {page * numToShow + numToShow > total
          ? total
          : page * numToShow + numToShow}{' '}
        of {total}
      </p>
      <FirstPage
        onClick={() => setPage(0)}
        style={{
          marginLeft: 10,
          fontSize: 16,
          cursor: page === 0 ? 'default' : 'pointer',
          opacity: page === 0 ? 0.25 : 1,
        }}
      />
      <NavigateBefore
        onClick={() => setPage(page - 1)}
        style={{
          marginLeft: 10,
          fontSize: 16,
          cursor: page === 0 ? 'default' : 'pointer',
          opacity: page === 0 ? 0.25 : 1,
        }}
      />
      <NavigateNext
        onClick={() => setPage(page + 1)}
        style={{
          marginLeft: 10,
          fontSize: 16,
          cursor: page + 1 > lastPage ? 'default' : 'pointer',
          opacity: page + 1 > lastPage ? 0.25 : 1,
        }}
      />
      <LastPage
        onClick={() => setPage(lastPage)}
        style={{
          marginLeft: 10,
          fontSize: 16,
          cursor: page + 1 > lastPage ? 'default' : 'pointer',
          opacity: page + 1 > lastPage ? 0.25 : 1,
        }}
      />
    </div>
  );
}

function SearchBar(props) {
  return (
    <>
      <input
        className="table-input"
        style={{ cursor: 'inherit' }}
        type="text"
        placeholder="Search"
      />
    </>
  );
}

function SortDropdown(props) {
  const [isOpen, setOpen] = useState(false);
  const [chosen, setChosen] = useState(null);

  return (
    <div className="dropdown-container">
      <button
        className="table-input"
        style={{ background: chosen !== null && 'rgba(0,24,71,0.1)' }}
        onClick={() => setOpen(!isOpen)}
        disabled={!(props.columns.length > 0)}
      >
        {chosen === null ? <>Sort by</> : chosen.name}
        <ArrowDropDown />
      </button>
      {props.columns.length > 0 && (
        <div className="dropdown-menu" style={{ display: isOpen && 'block' }}>
          <button
            className="dropdown-item"
            onClick={() => {
              setChosen(null);
              setOpen(false);
              props.clearSort();
            }}
          >
            Clear
          </button>
          {props.columns.map((data, index) => (
            <button
              key={index}
              className="dropdown-item"
              onClick={() => {
                setChosen(data);
                setOpen(false);
                props.toggleSort(data.selector);
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
        style={{ background: chosen !== null && 'rgba(0,24,71,0.1)' }}
        onClick={() => setOpen(!isOpen)}
        disabled={!(props.columns.length > 0)}
      >
        {chosen === null ? <>Filter by</> : chosen.name}
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
          {props.columns.map((data, index) => (
            <button
              key={index}
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
