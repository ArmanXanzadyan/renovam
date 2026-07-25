import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  hover,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-surface p-6 shadow-card",
        hover && "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cardHover",
        className,
      )}
    >
      {children}
    </div>
  );
}
