import type { HTMLAttributes, KeyboardEvent, MouseEvent } from 'react';

export interface ClientTweetCardProps extends HTMLAttributes<HTMLElement> {
  name?: string;
  handle?: string;
  text?: string;
  date?: string;
  likes?: string;
  retweets?: string;
  replies?: string;
  verified?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
}

export default function ClientTweetCard({
  name = 'BemoUI',
  handle = 'bemoui',
  text = 'Build beautiful, production-ready interfaces with BemoUI components.',
  date = 'Mar 15',
  likes = '1.2K',
  retweets = '340',
  replies = '89',
  verified = true,
  disabled = false,
  className = '',
  onClick,
  ...props
}: ClientTweetCardProps) {
  const initials =
    String(name || '')
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || '?';

  const handleActivate = (event: KeyboardEvent<HTMLElement>) => {
    if (disabled || !onClick) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(event);
    }
  };

  return (
    <article
      className={[
        'box-border block w-full max-w-xl m-0 rounded-2xl border border-gray-200 bg-white px-4 py-4 text-gray-900 shadow-sm outline-none transition duration-150',
        'hover:border-[#1620E4]/40 hover:shadow-[0_8px_24px_rgba(22,32,228,0.08)]',
        'focus-visible:border-[#1620E4] focus-visible:shadow-[0_0_0_3px_rgba(123,233,198,0.55)]',
        'motion-reduce:transition-none',
        disabled ? 'pointer-events-none cursor-not-allowed opacity-55 shadow-none' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleActivate}
      {...props}
    >
      <header className="flex items-start gap-3">
        <div
          className="grid size-11 shrink-0 place-items-center rounded-full bg-linear-to-br from-[#1620E4] to-[#7BE9C6] text-white"
          aria-hidden="true"
        >
          <span className="text-[0.85rem] font-bold tracking-wide leading-none">{initials}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1">
            <span className="text-[0.95rem] font-bold leading-snug text-gray-900">{name}</span>
            {verified ? (
              <span className="inline-flex text-[#1620E4]" title="Verified" aria-label="Verified account">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
                  <circle cx="12" cy="12" r="10" fill="currentColor" />
                  <path
                    d="M7.5 12.5l3 3 6-6"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            ) : null}
            <span className="text-sm leading-snug text-gray-500">@{handle}</span>
            <span className="text-sm leading-snug text-gray-500" aria-hidden="true">·</span>
            <time className="text-sm leading-snug text-gray-500">{date}</time>
          </div>
        </div>
      </header>
      <p className="mt-3 mb-0 text-[0.975rem] leading-relaxed text-gray-900 whitespace-pre-wrap break-words">
        {text}
      </p>
      <footer className="mt-3.5 flex flex-wrap gap-x-5 gap-y-2 border-t border-gray-200 pt-3 text-sm text-gray-500">
        <span>
          <span className="font-bold text-gray-900">{replies}</span> Replies
        </span>
        <span>
          <span className="font-bold text-gray-900">{retweets}</span> Reposts
        </span>
        <span>
          <span className="font-bold text-gray-900">{likes}</span> Likes
        </span>
      </footer>
    </article>
  );
}

// Required global keyframes (add to global CSS only if you enable entrance motion):
// @keyframes bemo-client-tweet-card-in {
//   from { opacity: 0; transform: translateY(4px); }
//   to { opacity: 1; transform: none; }
// }
// @media (prefers-reduced-motion: reduce) {
//   .bemo-client-tweet-card-animate { animation: none !important; }
// }
