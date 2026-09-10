import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost";

type ButtonAsButton = { href?: undefined; variant?: Variant } & ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonAsLink = { href: string; variant?: Variant } & AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = ButtonAsButton | ButtonAsLink;

const BASE_CLASS =
  "inline-flex min-h-[48px] items-center justify-center rounded-md px-6 text-body font-medium " +
  "transition-transform duration-[170ms] ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] " +
  "disabled:pointer-events-none disabled:opacity-50";

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "bg-grad-accent text-bg-base",
  ghost: "border border-line-strong text-ink hover:border-focus",
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const classes = `${BASE_CLASS} ${VARIANT_CLASS[variant]} ${className}`.trim();

  if (props.href !== undefined) {
    return <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }
  return <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
