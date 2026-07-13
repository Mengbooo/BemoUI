import React, {
  useEffect,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, type MotionProps } from 'framer-motion';

export interface MagicAnimatedListProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  delay?: number;
}

interface MagicAnimatedListItemProps {
  children: ReactNode;
  reduceMotion?: boolean;
}

function MagicAnimatedListItem({
  children,
  reduceMotion = false,
}: MagicAnimatedListItemProps) {
  const animations: MotionProps = reduceMotion
    ? { initial: false, animate: { scale: 1, opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1, originY: 0 },
        exit: { scale: 0, opacity: 0 },
        transition: { type: 'spring', stiffness: 350, damping: 40 },
      };

  return (
    <motion.div
      {...animations}
      layout={!reduceMotion}
      className="mx-auto w-full origin-top"
      role="listitem"
    >
      {children}
    </motion.div>
  );
}

const MagicAnimatedList = React.memo(function MagicAnimatedList({
  children,
  className = '',
  delay = 1000,
  ...props
}: MagicAnimatedListProps) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const childrenArray = useMemo(
    () => React.Children.toArray(children),
    [children]
  );

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduceMotion(Boolean(media.matches));
    onChange();
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    }
    media.addListener(onChange);
    return () => media.removeListener(onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setIndex(Math.max(0, childrenArray.length - 1));
      return undefined;
    }

    let timeout: ReturnType<typeof setTimeout> | null = null;
    if (index < childrenArray.length - 1) {
      timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, delay);
    }

    return () => {
      if (timeout !== null) clearTimeout(timeout);
    };
  }, [index, delay, childrenArray.length, reduceMotion]);

  const itemsToShow = useMemo(
    () => childrenArray.slice(0, index + 1).reverse(),
    [index, childrenArray]
  );

  return (
    <div
      className={['flex flex-col items-center gap-4 w-full', className]
        .filter(Boolean)
        .join(' ')}
      role="list"
      {...props}
    >
      <AnimatePresence initial={!reduceMotion}>
        {itemsToShow.map((item, i) => {
          const key =
            React.isValidElement(item) && item.key != null
              ? String(item.key)
              : `bemo-animated-list-${i}`;
          return (
            <MagicAnimatedListItem key={key} reduceMotion={reduceMotion}>
              {item}
            </MagicAnimatedListItem>
          );
        })}
      </AnimatePresence>
    </div>
  );
});

MagicAnimatedList.displayName = 'MagicAnimatedList';

export default MagicAnimatedList;

/*
  Global keyframes (optional pure-CSS fallback; primary enter/exit uses framer-motion springs):
  @keyframes bemo-animated-list-in {
    from { transform: scale(0); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  @keyframes bemo-animated-list-out {
    from { transform: scale(1); opacity: 1; }
    to { transform: scale(0); opacity: 0; }
  }
  Respect prefers-reduced-motion: disable the above when reduce is preferred.
*/
