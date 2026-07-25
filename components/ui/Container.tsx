import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
};

/** Centered, max-width page container with responsive padding. */
export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return <Tag className={cn("container", className)}>{children}</Tag>;
}
