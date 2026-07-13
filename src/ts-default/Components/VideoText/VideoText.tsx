import React, {
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';
import './VideoText.css';

export interface VideoTextProps {
  /** Optional local or app-hosted video source. When omitted, brand gradient fallback is used. */
  src?: string;
  /** Additional class names for the root container. */
  className?: string;
  /** Whether the video should autoplay when motion is allowed. */
  autoPlay?: boolean;
  /** Whether the video is muted. */
  muted?: boolean;
  /** Whether the video should loop. */
  loop?: boolean;
  /** Video preload strategy. */
  preload?: 'auto' | 'metadata' | 'none';
  /** Text content used for the mask and accessible label. */
  children: ReactNode;
  /** Font size for the text mask (number = vw units). */
  fontSize?: string | number;
  /** Font weight for the text mask. */
  fontWeight?: string | number;
  /** SVG text-anchor value. */
  textAnchor?: string;
  /** SVG dominant-baseline value. */
  dominantBaseline?: string;
  /** Font family for the text mask. */
  fontFamily?: string;
  /** Root element type. */
  as?: ElementType;
}

function escapeXml(value: string | number): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function VideoText({
  src,
  children,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
  preload = 'auto',
  fontSize = 10,
  fontWeight = 'bold',
  textAnchor = 'middle',
  dominantBaseline = 'middle',
  fontFamily = 'sans-serif',
  as: Component = 'div',
  ...rest
}: VideoTextProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const content = React.Children.toArray(children).join('');

  const dataUrlMask = useMemo(() => {
    const size =
      typeof fontSize === 'number' ? `${fontSize}vw` : escapeXml(fontSize);
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><text x='50%' y='50%' font-size='${size}' font-weight='${escapeXml(
      String(fontWeight)
    )}' text-anchor='${escapeXml(textAnchor)}' dominant-baseline='${escapeXml(
      dominantBaseline
    )}' font-family='${escapeXml(fontFamily)}'>${escapeXml(
      content
    )}</text></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, [content, fontSize, fontWeight, textAnchor, dominantBaseline, fontFamily]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncMotionPreference = () => {
      if (mediaQuery.matches) {
        video.pause();
        return;
      }

      if (autoPlay && src) {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
      }
    };

    syncMotionPreference();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncMotionPreference);
      return () => mediaQuery.removeEventListener('change', syncMotionPreference);
    }

    mediaQuery.addListener(syncMotionPreference);
    return () => mediaQuery.removeListener(syncMotionPreference);
  }, [autoPlay, src]);

  const rootClassName = ['bemo-video-text', className].filter(Boolean).join(' ');
  const maskStyle: CSSProperties = {
    WebkitMaskImage: dataUrlMask,
    maskImage: dataUrlMask,
  };

  return (
    <Component className={rootClassName} {...rest}>
      <div className="bemo-video-text__mask" style={maskStyle} aria-hidden="true">
        {src ? (
          <video
            ref={videoRef}
            className="bemo-video-text__video"
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            preload={preload}
            playsInline
          >
            <source src={src} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="bemo-video-text__fallback" />
        )}
      </div>
      <span className="bemo-video-text__sr-only">{content}</span>
    </Component>
  );
}

export default VideoText;
