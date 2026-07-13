import { useState, useCallback } from 'react';
import './AvatarCircles.css';

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

  const rootClass = ['bemo-avatar-circles', className].filter(Boolean).join(' ');
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

        const content = showImage ? (
          <img
            className="bemo-avatar-circles__img"
            src={imageUrl}
            width={40}
            height={40}
            alt=""
            onError={() => handleImageError(index)}
          />
        ) : (
          <span
            className={
              'bemo-avatar-circles__fallback bemo-avatar-circles__fallback--' +
              (index % 2 === 0 ? 'blue' : 'green')
            }
          >
            {getInitials(name)}
          </span>
        );

        if (profileUrl) {
          return (
            <a
              key={index}
              className="bemo-avatar-circles__item bemo-avatar-circles__link"
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
          <span
            key={index}
            className="bemo-avatar-circles__item"
            aria-label={name}
          >
            {content}
          </span>
        );
      })}
      {peopleCount > 0 &&
        (moreHref ? (
          <a
            className="bemo-avatar-circles__item bemo-avatar-circles__more bemo-avatar-circles__link"
            href={moreHref}
            aria-label={`${peopleCount} more people`}
          >
            +{peopleCount}
          </a>
        ) : (
          <span
            className="bemo-avatar-circles__item bemo-avatar-circles__more"
            aria-label={`${peopleCount} more people`}
          >
            +{peopleCount}
          </span>
        ))}
    </div>
  );
}
