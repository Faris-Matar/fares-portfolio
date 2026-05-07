import { forwardRef } from "react";

/**
 * Button , variants: primary (solid orange), outline-light (white outlined),
 * outline-primary (orange outlined). Renders as <a> when `href` is provided,
 * otherwise <button>.
 */
const baseClasses =
  "inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-sm font-medium text-[15px] tracking-wide transition-all duration-fast ease-out-quart will-change-transform select-none cursor-pointer";

const variants = {
  primary:
    "bg-primary text-background hover:bg-secondary hover:scale-[1.02]",
  "outline-light":
    "border border-text-primary/40 text-text-primary hover:border-text-primary hover:bg-text-primary/[0.08]",
  "outline-primary":
    "border border-primary text-primary hover:bg-primary hover:text-background",
};

const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    href,
    onClick,
    type = "button",
    target,
    rel,
    download,
    className = "",
    ...rest
  },
  ref
) {
  const cls = `${baseClasses} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        download={download}
        className={cls}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <button ref={ref} type={type} onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  );
});

export default Button;
