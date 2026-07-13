import React from 'react';

export interface TweetCardProps extends React.HTMLAttributes<HTMLElement> {
  name?: string;
  username?: string;
  body?: string;
  verified?: boolean;
  date?: string;
  tweetUrl?: string;
  className?: string;
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const TwitterIcon = ({ className, ...props }: IconProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
  </svg>
);

const VerifiedIcon = ({ className, ...props }: IconProps) => (
  <svg
    aria-label="Verified account"
    viewBox="0 0 24 24"
    className={className}
    focusable="false"
    {...props}
  >
    <g fill="currentColor">
      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
    </g>
  </svg>
);

const truncate = (str: string | null | undefined, length: number): string => {
  if (!str || str.length <= length) return str || '';
  return `${str.slice(0, length - 3)}...`;
};

const getInitials = (name?: string): string => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const TweetCard: React.FC<TweetCardProps> = ({
  name = 'BemoUI',
  username = 'bemoui',
  body = 'Build beautiful interfaces with production-safe BemoUI components.',
  verified = true,
  date,
  tweetUrl,
  className = '',
  ...props
}) => {
  const initials = getInitials(name);

  return (
    <article
      className={`relative flex h-fit w-full max-w-lg flex-col gap-4 overflow-hidden rounded-xl border border-gray-200 bg-white p-5 text-black ${className}`}
      {...props}
    >
      <header className="flex flex-row items-start justify-between gap-3 tracking-normal">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#1620E4]/20 bg-linear-to-br from-[#1620E4] to-[#7BE9C6]"
            aria-hidden="true"
          >
            <span className="select-none text-sm font-semibold leading-none text-white">
              {initials}
            </span>
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <div className="flex items-center gap-1 whitespace-nowrap font-medium text-black">
              <span className="truncate">{truncate(name, 20)}</span>
              {verified ? (
                <VerifiedIcon className="inline size-4 shrink-0 text-[#1620E4]" />
              ) : null}
            </div>
            <span className="truncate text-sm text-gray-500">
              @{truncate(username, 16)}
            </span>
          </div>
        </div>
        {tweetUrl ? (
          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open original post"
            className="inline-flex shrink-0 items-start rounded text-gray-500 transition duration-200 ease-in-out hover:text-[#1620E4] focus-visible:text-[#1620E4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7BE9C6] motion-reduce:transition-none"
          >
            <TwitterIcon className="size-5 transition duration-200 ease-in-out hover:scale-105 focus-visible:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:focus-visible:scale-100" />
          </a>
        ) : (
          <span className="inline-flex shrink-0 items-start text-gray-500" aria-hidden="true">
            <TwitterIcon className="size-5" />
          </span>
        )}
      </header>
      <p className="m-0 text-[15px] font-normal leading-relaxed tracking-normal wrap-break-word whitespace-pre-wrap text-black">
        {body}
      </p>
      {date ? (
        <footer className="m-0">
          <time className="text-[13px] text-gray-500">{date}</time>
        </footer>
      ) : null}
    </article>
  );
};

export default TweetCard;

/* Required global keyframes (Tailwind v4): none. This component uses transition utilities only; no @keyframes are required. */
