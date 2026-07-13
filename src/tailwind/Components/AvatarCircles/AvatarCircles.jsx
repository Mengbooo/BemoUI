import { useState, useCallback } from 'react';

function getInitials(name) {
  if (!name || typeof name !== 'string') return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function AvatarCircles({
  className = '',
  numPeople = 0,
  avatarUrls = [],
  moreHref,
}) {
  const [failedImages, setFailedImages] = useState({});

  const handleImageError = useCallback((index) => {
    setFailedImages((prev) => (prev[index] ? prev : { ...prev, [index]: true }));
  }, []);

  const rootClass = [
    'z-10 flex -space-x-4 rtl:space-x-reverse items-center',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const peopleCount =
    typeof numPeople === 'number' && Number.isFinite(numPeople) && numPeople > 0
      ? Math.floor(numPeople)
      : 0;
  const avatars = Array.isArray(avatarUrls) ? avatarUrls : [];

  return (
    <div className={rootClass} role="group" aria-label="Avatar group">
      {avatars.map((avatar, index) => {
        const name =
          avatar && typeof avatar.name === 'string' && avatar.name.trim()
            ? avatar.name.trim()
            : `Avatar ${index + 1}`;
        const profileUrl =
          avatar && typeof avatar.profileUrl === 'string' && avatar.profileUrl
            ? avatar.profileUrl
            : undefined;
        const imageUrl =
          avatar && typeof avatar.imageUrl === 'string' && avatar.imageUrl
            ? avatar.imageUrl
            : undefined;
        const showImage = Boolean(imageUrl) && !failedImages[index];
        const fallbackTone =
          index % 2 === 0
            ? 'bg-[#1620E4] text-white'
            : 'bg-[#7BE9C6] text-neutral-950';

        const content = showImage ? (
          <img
            className="block size-10 rounded-full border-2 border-white object-cover bg-gray-200 dark:border-gray-800"
            src={imageUrl}
            width={40}
            height={40}
            alt=""
            onError={() => handleImageError(index)}
          />
        ) : (
          <span
            className={
              'inline-flex size-10 items-center justify-center rounded-full border-2 border-white text-xs font-semibold select-none dark:border-gray-800 ' +
              fallbackTone
            }
          >
            {getInitials(name)}
          </span>
        );

        const itemMotion =
          'relative inline-flex shrink-0 rounded-full motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:-translate-y-0.5 motion-reduce:transform-none';

        if (profileUrl) {
          return (
            <a
              key={index}
              className={
                itemMotion +
                ' text-inherit no-underline focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4]'
              }
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View profile of ${name}`}
            >
              {content}
            </a>
          );
        }

        return (
          <span key={index} className={itemMotion} aria-label={name}>
            {content}
          </span>
        );
      })}
      {peopleCount > 0 &&
        (moreHref ? (
          <a
            className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#1620E4] text-center text-xs font-semibold text-white no-underline select-none hover:bg-[#1018b8] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4] motion-safe:transition-colors motion-safe:duration-150 dark:border-gray-800"
            href={moreHref}
            aria-label={`${peopleCount} more people`}
          >
            +{peopleCount}
          </a>
        ) : (
          <span
            className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#1620E4] text-center text-xs font-semibold text-white select-none dark:border-gray-800"
            aria-label={`${peopleCount} more people`}
          >
            +{peopleCount}
          </span>
        ))}
    </div>
  );
}

// No global keyframes required.
