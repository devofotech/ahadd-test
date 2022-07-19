import React from 'react';

const billingType = [
  { name: 'Monthly', select: 'monthly' },
  { name: 'Yearly', select: 'yearly' },
];

export default ({ mode, setMode }) => {
  const isSelected = item => (item == mode);
  return (
    <div className="d-flex align-items-center">
      <div
        className="d-flex flex-row p-1"
        style={{
          backgroundColor: '#fff', borderRadius: 30, whiteSpace: 'nowrap', cursor: 'default', transform: 'scale(0.8)', boxShadow: '0.1px 0.1px 4px rgba(0, 0, 0, 0.2',
        }}
      >
        {billingType.map(m => (
          <div
            className="px-4 py-2 text-center"
            style={{
              backgroundColor: isSelected(m.select) && 'var(--primary-color)',
              cursor: !isSelected(m.select) && 'pointer',
              color: isSelected(m.select) && '#fff',
              borderRadius: 30,
              width: '7rem',
              transition: 'all .15s',
              fontFamily: 'CeraProRegular',
            }}
            onClick={() => setMode(m.select)}
          >
            Billed {m.name}
          </div>
        ))}
      </div>
    </div>
  );
};
