import React, { forwardRef } from 'react';
import './TwentyFirstCultTextureButton.css';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Slot = forwardRef(({ children, ...props }, ref) => {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ...children.props,
      ref: (node) => {
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
        const { ref: childRef } = children;
        if (typeof childRef === 'function') childRef(node);
        else if (childRef) childRef.current = node;
      },
      className: cn(props.className, children.props.className),
    });
  }
  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
});
Slot.displayName = 'Slot';

const outerClassMap = {
  primary: 'bemo-21st-cult-texture-button-outer bemo-21st-cult-texture-button-outer--primary',
  accent: 'bemo-21st-cult-texture-button-outer bemo-21st-cult-texture-button-outer--accent',
  destructive: 'bemo-21st-cult-texture-button-outer bemo-21st-cult-texture-button-outer--destructive',
  secondary: 'bemo-21st-cult-texture-button-outer bemo-21st-cult-texture-button-outer--secondary',
  minimal: 'bemo-21st-cult-texture-button-outer bemo-21st-cult-texture-button-outer--minimal',
  icon: 'bemo-21st-cult-texture-button-outer bemo-21st-cult-texture-button-outer--icon',
};

const sizeOuterMap = {
  sm: 'bemo-21st-cult-texture-button-outer--sm',
  default: 'bemo-21st-cult-texture-button-outer--default',
  lg: 'bemo-21st-cult-texture-button-outer--lg',
  icon: 'bemo-21st-cult-texture-button-outer--icon-size',
};

const innerClassMap = {
  primary: 'bemo-21st-cult-texture-button-inner bemo-21st-cult-texture-button-inner--primary',
  accent: 'bemo-21st-cult-texture-button-inner bemo-21st-cult-texture-button-inner--accent',
  destructive: 'bemo-21st-cult-texture-button-inner bemo-21st-cult-texture-button-inner--destructive',
  secondary: 'bemo-21st-cult-texture-button-inner bemo-21st-cult-texture-button-inner--secondary',
  minimal: 'bemo-21st-cult-texture-button-inner bemo-21st-cult-texture-button-inner--minimal',
  icon: 'bemo-21st-cult-texture-button-inner bemo-21st-cult-texture-button-inner--icon',
};

const sizeInnerMap = {
  sm: 'bemo-21st-cult-texture-button-inner--sm',
  default: 'bemo-21st-cult-texture-button-inner--default',
  lg: 'bemo-21st-cult-texture-button-inner--lg',
  icon: 'bemo-21st-cult-texture-button-inner--icon-size',
};

const TwentyFirstCultTextureButton = forwardRef(
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
        ref={ref}
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
