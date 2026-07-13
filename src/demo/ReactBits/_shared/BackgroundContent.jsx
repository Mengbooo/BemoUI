const BackgroundContent = ({ pillText = 'BemoUI', headline = 'Build a distinctive landing page.' }) => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'grid', placeContent: 'center', gap: 12, padding: 24, textAlign: 'center', pointerEvents: 'none' }}>
    <span style={{ justifySelf: 'center', padding: '6px 12px', border: '1px solid rgba(123,233,198,.45)', borderRadius: 999, color: '#7BE9C6', background: 'rgba(8,9,13,.7)', fontSize: 12 }}>{pillText}</span>
    <strong style={{ maxWidth: 620, color: '#fff', fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', lineHeight: 1.05 }}>{headline}</strong>
  </div>
);

export default BackgroundContent;
