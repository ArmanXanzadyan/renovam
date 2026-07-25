import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "call" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-btn " +
  "transition-colors duration-150 select-none focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand " +
  "disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  accent: "bg-accent text-ink hover:bg-accent-hover hover:text-white",
  call: "bg-call text-white hover:bg-call-hover",
  ghost: "bg-transparent text-brand border border-brand hover:bg-brand-50",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-small",
  md: "h-12 px-5 text-body",
  lg: "h-14 px-7 text-body",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Polymorphic button: renders a <button> by default, or a link when `href`
 * is provided. Internal hrefs use next/link; external/tel/messenger use <a>.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth,
    className,
    children,
  } = props;

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, fullWidth: _f, className: _c, children: _ch, ...rest } =
      props as ButtonAsLink;
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { variant: _v, size: _s, fullWidth: _f, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
