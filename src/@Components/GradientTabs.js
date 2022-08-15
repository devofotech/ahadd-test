export default function GradientTabs({ tabs, tab, setTab }) {
  const sideBorder = { 1: '25px 0px 0px 25px', [tabs.length]: '0px 25px 25px 0px' };
  const styleSelect = {
    true: {
      background: 'color-gradient-inline',
      color: 'white',
      cursor: 'default',
    },
    false: {
      background: 'bg-white',
      color: 'var(--dark-blue-color)',
      cursor: 'pointer',
    },
  };
  return (
    <div className="d-flex w-100">
      {tabs.map((m, idx) => (
        <div
          className={`py-2 text-center ${styleSelect[tab === m.selector]?.background}`}
          style={{
            borderRadius: sideBorder[idx + 1] ?? '0',
            flex: 1,
            fontSize: '16px',
            color: styleSelect[tab === m.selector]?.color,
            cursor: styleSelect[tab === m.selector]?.cursor,
            transition: 'all .1s ease-in',
            fontFamily: 'CeraProRegular',
            fontWeight: 600,
            outline: '1px solid rgba(0, 0, 0, 0.1)',
          }}
          onClick={() => setTab(m.selector)}
        >
          {m.label}
        </div>
      ))}
    </div>
  );
}
