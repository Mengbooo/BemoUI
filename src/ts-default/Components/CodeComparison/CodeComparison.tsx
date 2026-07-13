import { useId, type CSSProperties } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiFile } from 'react-icons/fi';
import './CodeComparison.css';

export interface CodeComparisonProps {
  beforeCode?: string;
  afterCode?: string;
  language?: string;
  filename?: string;
  highlightColor?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export default function CodeComparison({
  beforeCode = '',
  afterCode = '',
  language = 'javascript',
  filename = 'example.js',
  highlightColor = '#1620E4',
  className = '',
  showLineNumbers = true,
}: CodeComparisonProps) {
  const uid = useId();
  const labelId = `${uid}-label`;

  const customStyle: CSSProperties = {
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
    } satisfies CSSProperties,
  });

  return (
    <div
      className={`bemo-code-comparison${className ? ` ${className}` : ''}`}
      role="region"
      aria-labelledby={labelId}
      style={{ '--bemo-cc-highlight': highlightColor } as CSSProperties}
    >
      <span id={labelId} className="bemo-code-comparison__sr-only">
        Code comparison for {filename}
      </span>
      <div className="bemo-code-comparison__frame">
        <div className="bemo-code-comparison__grid">
          <section
            className="bemo-code-comparison__panel bemo-code-comparison__panel--before"
            aria-label={`${filename} before`}
          >
            <header className="bemo-code-comparison__header">
              <FiFile className="bemo-code-comparison__icon" aria-hidden="true" />
              <span className="bemo-code-comparison__filename">{filename}</span>
              <span className="bemo-code-comparison__badge bemo-code-comparison__badge--before">
                before
              </span>
            </header>
            <div className="bemo-code-comparison__body">
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

          <div className="bemo-code-comparison__vs" aria-hidden="true">
            VS
          </div>

          <section
            className="bemo-code-comparison__panel bemo-code-comparison__panel--after"
            aria-label={`${filename} after`}
          >
            <header className="bemo-code-comparison__header">
              <FiFile className="bemo-code-comparison__icon" aria-hidden="true" />
              <span className="bemo-code-comparison__filename">{filename}</span>
              <span className="bemo-code-comparison__badge bemo-code-comparison__badge--after">
                after
              </span>
            </header>
            <div className="bemo-code-comparison__body">
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
