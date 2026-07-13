import {
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  type HTMLMotionProps,
} from 'framer-motion';

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

export interface PointerProps extends HTMLMotionProps<'div'> {
  children?: ReactNode;
  disabled?: boolean;
}

export function Pointer({
  className,
  style,
  children,
  disabled = false,
  ...props
}: PointerProps): ReactElement {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isActive, setIsActive] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = (): void => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (disabled) return undefined;

    const parentElement =
      typeof window !== 'undefined'
        ? containerRef.current?.parentElement ?? null
        : null;

    if (!parentElement) return undefined;

    const handleMouseMove = (e: MouseEvent): void => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsActive(true);
    };

    const handleMouseEnter = (e: MouseEvent): void => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsActive(true);
    };

    const handleMouseLeave = (): void => {
      setIsActive(false);
    };

    parentElement.classList.add('bemo-pointer-host');
    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseenter', handleMouseEnter);
    parentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parentElement.classList.remove('bemo-pointer-host');
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', handleMouseEnter);
      parentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, disabled]);

  const motionProps = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0 },
      }
    : {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0, opacity: 0 },
      };

  return (
    <>
      <div ref={containerRef} className="contents" aria-hidden="true" />
      <AnimatePresence>
        {!disabled && isActive && (
          <motion.div
            className="pointer-events-none fixed z-50 text-[#1620E4]"
            style={{
              ...style,
              top: mouseY,
              left: mouseX,
              x: '-50%',
              y: '-50%',
            }}
            initial={motionProps.initial}
            animate={motionProps.animate}
            exit={motionProps.exit}
            transition={motionProps.transition}
            aria-hidden="true"
            {...props}
          >
            {children || (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="1"
                viewBox="0 0 16 16"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                className={cx(
                  'block size-6 rotate-[-70deg] fill-[#1620E4] stroke-[#7BE9C6] text-[#1620E4]',
                  className
                )}
                aria-hidden="true"
                focusable="false"
              >
                <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
              </svg>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Pointer;

// Global CSS required (add once in your stylesheet):
// .bemo-pointer-host { cursor: none !important; }
// Required global keyframes: none — enter/exit scale & opacity are handled by framer-motion.
// Optional CSS-only fallback (unused by this component):
// @keyframes bemo-pointer-in {
//   from { opacity: 0; transform: translate(-50%, -50%) scale(0); }
//   to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
// }
