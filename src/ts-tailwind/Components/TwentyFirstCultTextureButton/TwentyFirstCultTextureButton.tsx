import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

type SlotProps = ButtonHTMLAttributes<HTMLElement> & {
  children?: ReactNode;
};

const Slot = forwardRef<HTMLElement, SlotProps>(({ children, ...props }, ref) => {
  if (React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ...props,
      ...(children as React.ReactElement<any>).props,
      ref: (node: HTMLElement | null) => {
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        const childRef = (children as any).ref;
        if (typeof childRef === 'function') childRef(node);
        else if (childRef) childRef.current = node;
      },
      className: cn(
        props.className as string | undefined,
        (children as React.ReactElement<any>).props.className
      ),
    });
  }
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
});
Slot.displayName = 'Slot';

export type TextureButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'destructive'
  | 'minimal'
  | 'icon';

export type TextureButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export interface TwentyFirstCultTextureButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TextureButtonVariant;
  size?: TextureButtonSize;
  asChild?: boolean;
  children?: ReactNode;
}

const outerVariants: Record<TextureButtonVariant, string> = {
  primary:
    'w-full border border-[1px] dark:border-[2px] border-black/10 dark:border-black bg-gradient-to-b from-black/70 to-black dark:from-white dark:to-white/80 p-[1px] transition duration-300 ease-in-out',
  accent:
    'w-full border-[1px] dark:border-[2px] border-black/10 dark:border-neutral-950 bg-gradient-to-b from-[#1620E4]/90 to-[#1620E4] dark:from-[#7BE9C6]/70 dark:to-[#1620E4] p-[1px] transition duration-300 ease-in-out',
  destructive:
    'w-full border-[1px] dark:border-[2px] border-black/10 dark:border-neutral-950 bg-gradient-to-b from-red-300/90 to-red-500 dark:from-red-300/90 dark:to-red-500 p-[1px] transition duration-300 ease-in-out',
  secondary:
    'w-full border-[1px] dark:border-[2px] border-black/20 bg-white/50 dark:border-neutral-950 dark:bg-neutral-600/50 p-[1px] transition duration-300 ease-in-out',
  minimal:
    'group/texture-button w-full border-[1px] dark:border-[2px] border-black/20 bg-white/50 dark:border-neutral-950 dark:bg-neutral-600/80 p-[1px] active:bg-neutral-200 dark:active:bg-neutral-800 hover:bg-gradient-to-t hover:from-neutral-100 to-white dark:hover:from-neutral-600/50 dark:hover:to-neutral-600/70',
  icon:
    'group/texture-button rounded-full border dark:border-neutral-950 border-black/10 dark:bg-neutral-600/50 bg-white/50 p-[1px] active:bg-neutral-200 dark:active:bg-neutral-800 hover:bg-gradient-to-t hover:from-neutral-100 to-white dark:hover:from-neutral-700 dark:hover:to-neutral-600',
};

const outerSizes: Record<TextureButtonSize, string> = {
  sm: 'rounded-[6px]',
  default: 'rounded-[12px]',
  lg: 'rounded-[12px]',
  icon: 'rounded-full',
};

const innerVariants: Record<TextureButtonVariant, string> = {
  primary:
    'gap-2 bg-gradient-to-b from-neutral-800 to-black dark:from-neutral-200 dark:to-neutral-50 text-sm text-white/90 dark:text-black/80 transition duration-300 ease-in-out hover:from-stone-800 hover:to-neutral-800/70 dark:hover:from-stone-200 dark:hover:to-neutral-200 dark:active:from-stone-300 dark:active:to-neutral-300 active:bg-gradient-to-b active:from-black active:to-black',
  accent:
    'gap-2 bg-gradient-to-b from-[#3b46f0] to-[#1620E4] dark:from-[#7BE9C6] dark:to-[#1620E4] text-sm text-white/95 dark:text-black/90 transition duration-300 ease-in-out hover:bg-gradient-to-b hover:from-[#1620E4]/70 hover:to-[#1620E4]/70 dark:hover:from-[#7BE9C6]/80 dark:hover:to-[#1620E4]/85 active:bg-gradient-to-b active:from-[#1620E4]/80 active:to-[#1620E4]/80 dark:active:from-[#7BE9C6] dark:active:to-[#1620E4]',
  destructive:
    'gap-2 bg-gradient-to-b from-red-400/60 to-red-500/60 text-sm text-white/90 transition duration-300 ease-in-out hover:bg-gradient-to-b hover:from-red-400/70 hover:to-red-600/70 dark:hover:from-red-400/70 dark:hover:to-red-500/80 active:bg-gradient-to-b active:from-red-400/80 active:to-red-600/80 dark:active:from-red-400 dark:active:to-red-500',
  secondary:
    'bg-gradient-to-b from-neutral-100/80 to-neutral-200/50 dark:from-neutral-800 dark:to-neutral-700/50 text-sm transition duration-300 ease-in-out hover:bg-gradient-to-b hover:from-neutral-200/40 hover:to-neutral-300/60 dark:hover:from-neutral-700 dark:hover:to-neutral-700/60 active:bg-gradient-to-b active:from-neutral-200/60 active:to-neutral-300/70 dark:active:from-neutral-800 dark:active:to-neutral-700',
  minimal:
    'bg-gradient-to-b from-white to-neutral-50/50 dark:from-neutral-800 dark:to-neutral-700/50 text-sm transition duration-300 ease-in-out group-hover/texture-button:bg-gradient-to-b group-hover/texture-button:from-neutral-50/50 group-hover/texture-button:to-neutral-100/60 dark:group-hover/texture-button:from-neutral-700 dark:group-hover/texture-button:to-neutral-700/60 group-active/texture-button:bg-gradient-to-b group-active/texture-button:from-neutral-100/60 group-active/texture-button:to-neutral-100/90 dark:group-active/texture-button:from-neutral-800 dark:group-active/texture-button:to-neutral-700',
  icon:
    'bg-gradient-to-b from-white to-neutral-50/50 dark:from-neutral-800 dark:to-neutral-700/50 group-active/texture-button:bg-neutral-200 dark:group-active/texture-button:bg-neutral-800 rounded-full',
};

const innerSizes: Record<TextureButtonSize, string> = {
  sm: 'text-xs rounded-[4px] px-4 py-1',
  default: 'text-sm rounded-[10px] px-4 py-2',
  lg: 'text-base rounded-[10px] px-4 py-2',
  icon: 'rounded-full p-1',
};

const TwentyFirstCultTextureButton = forwardRef<
  HTMLButtonElement,
  TwentyFirstCultTextureButtonProps
>(
  (
    {
      children,
      variant = 'primary',
      size = 'default',
      asChild = false,
      className,
      disabled = false,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const outer = cn(
      outerVariants[variant] || outerVariants.primary,
      outerSizes[size] || outerSizes.default,
      'inline-flex max-w-full cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed disabled:pointer-events-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4] motion-reduce:transition-none',
      className
    );
    const inner = cn(
      'w-full h-full flex items-center justify-center text-muted-foreground motion-reduce:transition-none',
      innerVariants[variant] || innerVariants.primary,
      innerSizes[size] || innerSizes.default
    );

    return (
      <Comp
        className={outer}
        ref={ref as any}
        disabled={disabled}
        type={asChild ? undefined : type}
        aria-disabled={disabled || undefined}
        {...props}
      >
        <div className={inner}>{children}</div>
      </Comp>
    );
  }
);

TwentyFirstCultTextureButton.displayName = 'TwentyFirstCultTextureButton';

export default TwentyFirstCultTextureButton;
export { TwentyFirstCultTextureButton };

/* Tailwind v4 keyframes / notes (none required; transitions only).
   prefers-reduced-motion via motion-reduce: utilities.
*/
