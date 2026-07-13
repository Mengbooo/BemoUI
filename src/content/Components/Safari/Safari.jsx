import './Safari.css';

export default function Safari({
  url = 'bemoui.dev',
  imageSrc,
  videoSrc,
  mode = 'default',
  className = '',
  children,
  ...props
}) {
  return (
    <div className={`bemo-safari ${className}`.trim()} {...props}>
      <div className="bemo-safari__toolbar">
        <div className="bemo-safari__controls" aria-hidden="true">
          <span /><span /><span />
        </div>
        {mode === 'default' && <span className="bemo-safari__nav" aria-hidden="true">‹ ›</span>}
        <div className="bemo-safari__address" title={url}>
          <span aria-hidden="true">●</span>
          <span>{url}</span>
        </div>
        {mode === 'default' && <span className="bemo-safari__actions" aria-hidden="true">↗ ＋</span>}
      </div>
      <div className="bemo-safari__screen">
        {videoSrc ? (
          <video src={videoSrc} autoPlay muted loop playsInline preload="metadata" />
        ) : imageSrc ? (
          <img src={imageSrc} alt="" />
        ) : (
          children || <div className="bemo-safari__placeholder"><strong>BemoUI</strong><span>Production-ready landing page components</span></div>
        )}
      </div>
    </div>
  );
}
