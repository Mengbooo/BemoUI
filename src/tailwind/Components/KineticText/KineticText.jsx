
export function KineticText({
  text,
  as: Tag = 'h1',
  className = '',
  style,
  disabled = false,
  ...rest
}) {
  const mergedStyle = {
    '--hover-padding': 'calc(1em / 12)',
    '--text-stroke-width': 'calc(1em * 125 / 6000)',
    ...(style || {}),
  };

  const letterClass = disabled
    ? 'pointer-events-none [will-change:font-weight,-webkit-text-stroke-width,padding] [-webkit-text-stroke-color:transparent] [-webkit-text-stroke-width:var(--text-stroke-width)]'
    : '[will-change:font-weight,-webkit-text-stroke-width,padding] [-webkit-text-stroke-color:transparent] [-webkit-text-stroke-width:var(--text-stroke-width)] motion-safe:transition-[font-weight,padding,-webkit-text-stroke-color] motion-safe:duration-400 hover:[padding-inline:var(--hover-padding)] hover:font-[900] hover:[-webkit-text-stroke-color:currentcolor] hover:[-webkit-text-stroke-width:calc(var(--text-stroke-width)*2)] has-[+span+span:hover]:font-[400] has-[+span:hover]:[padding-inline:var(--hover-padding)] has-[+span:hover]:font-[600] [:hover+&]:[padding-inline:var(--hover-padding)] [:hover+&]:font-[600] [:hover+span+&]:font-[400]';

  return (
    <Tag
      {...rest}
      className={[
        'flex flex-wrap font-[300] text-[#1620E4]',
        'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7BE9C6] focus-visible:outline-offset-4',
        disabled ? 'opacity-60 cursor-not-allowed' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={mergedStyle}
      aria-disabled={disabled || undefined}
    >
      {String(text ?? '')
        .split('')
        .map((letter, i) => (
          <span key={i} aria-hidden="true" className={letterClass}>
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}

export default KineticText;

/*
 * KineticText (Tailwind v4) — no @keyframes required.
 * Uses CSS transitions only. Ensure motion-safe variants respect prefers-reduced-motion.
 * Stroke/padding CSS variables are set inline on the root element; no global keyframes to register.
 */
