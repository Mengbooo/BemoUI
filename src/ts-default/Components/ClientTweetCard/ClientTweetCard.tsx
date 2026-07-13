import type { HTMLAttributes, KeyboardEvent, MouseEvent } from 'react';
import './ClientTweetCard.css';

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
  const rootClass = [
    'bemo-client-tweet-card',
    disabled ? 'bemo-client-tweet-card--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

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
      className={rootClass}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleActivate}
      {...props}
    >
      <header className="bemo-client-tweet-card__header">
        <div className="bemo-client-tweet-card__avatar" aria-hidden="true">
          <span className="bemo-client-tweet-card__avatar-initials">{initials}</span>
        </div>
        <div className="bemo-client-tweet-card__meta">
          <div className="bemo-client-tweet-card__identity">
            <span className="bemo-client-tweet-card__name">{name}</span>
            {verified ? (
              <span
                className="bemo-client-tweet-card__verified"
                title="Verified"
                aria-label="Verified account"
              >
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
            <span className="bemo-client-tweet-card__handle">@{handle}</span>
            <span className="bemo-client-tweet-card__dot" aria-hidden="true">·</span>
            <time className="bemo-client-tweet-card__date">{date}</time>
          </div>
        </div>
      </header>
      <p className="bemo-client-tweet-card__text">{text}</p>
      <footer className="bemo-client-tweet-card__stats">
        <span className="bemo-client-tweet-card__stat">
          <span className="bemo-client-tweet-card__stat-value">{replies}</span>
          <span className="bemo-client-tweet-card__stat-label"> Replies</span>
        </span>
        <span className="bemo-client-tweet-card__stat">
          <span className="bemo-client-tweet-card__stat-value">{retweets}</span>
          <span className="bemo-client-tweet-card__stat-label"> Reposts</span>
        </span>
        <span className="bemo-client-tweet-card__stat">
          <span className="bemo-client-tweet-card__stat-value">{likes}</span>
          <span className="bemo-client-tweet-card__stat-label"> Likes</span>
        </span>
      </footer>
    </article>
  );
}
