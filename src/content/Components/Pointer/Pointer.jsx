import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import './Pointer.css';

function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

export function Pointer({
  className,
  style,
  children,
  disabled = false,
  ...props
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isActive, setIsActive] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
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

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsActive(true);
    };

    const handleMouseEnter = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsActive(true);
    };

    const handleMouseLeave = () => {
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
      <div
        ref={containerRef}
        className="bemo-pointer-anchor"
        aria-hidden="true"
      />
      <AnimatePresence>
        {!disabled && isActive && (
          <motion.div
            className="bemo-pointer"
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
                className={cx('bemo-pointer__icon', className)}
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
