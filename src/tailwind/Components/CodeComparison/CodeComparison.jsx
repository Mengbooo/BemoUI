import { useId } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiFile } from 'react-icons/fi';

export default function CodeComparison({
  beforeCode = '',
  afterCode = '',
  language = 'javascript',
  filename = 'example.js',
  highlightColor = '#1620E4',
  className = '',
  showLineNumbers = true,
}) {
  const uid = useId();
  const labelId = `${uid}-label`;

  const customStyle = {
    margin: 0,
    padding: '0.75rem 0',
    background: 'transparent',
    fontSize: '0.75rem',
    lineHeight: 1.6,
  };

  const lineProps = () => ({
    style: {
      display: 'block',
      width: '100%',
      padding: '0.125rem 1rem',
    },
  });

  return (
    <div
      className={`mx-auto w-full max-w-5xl text-gray-900 dark:text-gray-50 ${className}`}
      role="region"
      aria-labelledby={labelId}
      style={{ '--bemo-cc-highlight': highlightColor }}
    >
      <span id={labelId} className="sr-only">
        Code comparison for {filename}
      </span>
      <div className="group relative w-full overflow-hidden rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <div className="relative grid md:grid-cols-2">
          <section
            className="flex min-w-0 flex-col border-b border-[#1620E4]/20 md:border-b-0 md:border-r"
            aria-label={`${filename} before`}
          >
            <header className="flex items-center gap-2 border-b border-[#1620E4]/20 bg-gray-100 p-2 text-sm dark:bg-gray-800">
              <FiFile className="h-4 w-4 shrink-0 text-[#1620E4]" aria-hidden="true" />
              <span className="truncate font-mono">{filename}</span>
              <span className="ml-auto hidden text-xs font-semibold text-[#1620E4] md:inline">before</span>
            </header>
            <div className="max-h-[28rem] min-h-32 overflow-auto font-mono text-xs shadow-[inset_3px_0_0_rgba(22,32,228,0.35)] focus-within:outline focus-within:outline-2 focus-within:outline-[var(--bemo-cc-highlight)] focus-within:-outline-offset-2 motion-safe:transition-shadow">
              <SyntaxHighlighter
                language={language}
                style={oneLight}
                showLineNumbers={showLineNumbers}
                customStyle={customStyle}
                wrapLines
                lineProps={lineProps}
                PreTag="div"
              >
                {beforeCode}
              </SyntaxHighlighter>
            </div>
          </section>

          <div
            className="absolute top-1/2 left-1/2 z-10 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border border-[#1620E4]/25 bg-gray-100 text-[0.7rem] font-bold tracking-wide text-[#1620E4] shadow-[0_0_0_3px_rgba(123,233,198,0.35)] motion-safe:transition-[box-shadow,transform] duration-200 group-hover:shadow-[0_0_0_4px_rgba(123,233,198,0.5)] group-focus-within:shadow-[0_0_0_4px_rgba(123,233,198,0.5)] md:flex dark:bg-gray-800"
            aria-hidden="true"
          >
            VS
          </div>

          <section
            className="flex min-w-0 flex-col border-t border-[#7BE9C6]/30 md:border-t-0"
            aria-label={`${filename} after`}
          >
            <header className="flex items-center gap-2 border-b border-[#1620E4]/20 bg-gray-100 p-2 text-sm dark:bg-gray-800">
              <FiFile className="h-4 w-4 shrink-0 text-[#1620E4]" aria-hidden="true" />
              <span className="truncate font-mono">{filename}</span>
              <span className="ml-auto hidden text-xs font-semibold text-[#065f46] md:inline">after</span>
            </header>
            <div className="max-h-[28rem] min-h-32 overflow-auto font-mono text-xs shadow-[inset_3px_0_0_rgba(123,233,198,0.55)] focus-within:outline focus-within:outline-2 focus-within:outline-[var(--bemo-cc-highlight)] focus-within:-outline-offset-2 motion-safe:transition-shadow">
              <SyntaxHighlighter
                language={language}
                style={oneLight}
                showLineNumbers={showLineNumbers}
                customStyle={customStyle}
                wrapLines
                lineProps={lineProps}
                PreTag="div"
              >
                {afterCode}
              </SyntaxHighlighter>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* Tailwind v4 global keyframes (add to global CSS if custom animation utilities are introduced):
   @keyframes bemo-cc-pulse-ring {
     0%, 100% { box-shadow: 0 0 0 3px rgba(123, 233, 198, 0.35); }
     50% { box-shadow: 0 0 0 5px rgba(123, 233, 198, 0.55); }
   }
   No keyframes are required for the default component; transitions use motion-safe utilities and respect prefers-reduced-motion.
*/
