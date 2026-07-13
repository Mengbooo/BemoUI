import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import './TwentyFirstCultTextureButton.css';

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

const outerClassMap: Record<TextureButtonVariant, string> = {
  primary: 'bemo-21st-cult-texture-button-outer bemo-21st-cult-texture-button-outer--primary',
  accent: 'bemo-21st-cult-texture-button-outer bemo-21st-cult-texture-button-outer--accent',
  destructive: 'bemo-21st-cult-texture-button-outer bemo-21st-cult-texture-button-outer--destructive',
  secondary: 'bemo-21st-cult-texture-button-outer bemo-21st-cult-texture-button-outer--secondary',
  minimal: 'bemo-21st-cult-texture-button-outer bemo-21st-cult-texture-button-outer--minimal',
  icon: 'bemo-21st-cult-texture-button-outer bemo-21st-cult-texture-button-outer--icon',
};

const sizeOuterMap: Record<TextureButtonSize, string> = {
  sm: 'bemo-21st-cult-texture-button-outer--sm',
  default: 'bemo-21st-cult-texture-button-outer--default',
  lg: 'bemo-21st-cult-texture-button-outer--lg',
  icon: 'bemo-21st-cult-texture-button-outer--icon-size',
};

const innerClassMap: Record<TextureButtonVariant, string> = {
  primary: 'bemo-21st-cult-texture-button-inner bemo-21st-cult-texture-button-inner--primary',
  accent: 'bemo-21st-cult-texture-button-inner bemo-21st-cult-texture-button-inner--accent',
  destructive: 'bemo-21st-cult-texture-button-inner bemo-21st-cult-texture-button-inner--destructive',
  secondary: 'bemo-21st-cult-texture-button-inner bemo-21st-cult-texture-button-inner--secondary',
  minimal: 'bemo-21st-cult-texture-button-inner bemo-21st-cult-texture-button-inner--minimal',
  icon: 'bemo-21st-cult-texture-button-inner bemo-21st-cult-texture-button-inner--icon',
};

const sizeInnerMap: Record<TextureButtonSize, string> = {
  sm: 'bemo-21st-cult-texture-button-inner--sm',
  default: 'bemo-21st-cult-texture-button-inner--default',
  lg: 'bemo-21st-cult-texture-button-inner--lg',
  icon: 'bemo-21st-cult-texture-button-inner--icon-size',
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
    const outerClasses = cn(
      outerClassMap[variant] || outerClassMap.primary,
      sizeOuterMap[size] || sizeOuterMap.default,
      className
    );
    const innerClasses = cn(
      innerClassMap[variant] || innerClassMap.primary,
      sizeInnerMap[size] || sizeInnerMap.default
    );

    return (
      <Comp
        className={outerClasses}
        ref={ref as any}
        disabled={disabled}
        type={asChild ? undefined : type}
        aria-disabled={disabled || undefined}
        {...props}
      >
        <div className={innerClasses}>{children}</div>
      </Comp>
    );
  }
);

TwentyFirstCultTextureButton.displayName = 'TwentyFirstCultTextureButton';

export default TwentyFirstCultTextureButton;
export { TwentyFirstCultTextureButton };
