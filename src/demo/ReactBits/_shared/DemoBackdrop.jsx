const DemoBackdrop = ({ children }) => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'radial-gradient(circle at 25% 20%, rgba(22,32,228,.42), transparent 40%), radial-gradient(circle at 75% 80%, rgba(123,233,198,.3), transparent 42%), #08090d' }}>
    {children}
  </div>
);

export default DemoBackdrop;
