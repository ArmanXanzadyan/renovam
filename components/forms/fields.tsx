import { cn } from "@/lib/cn";

const labelCls = "block text-small font-medium text-ink";
const controlCls =
  "mt-1 w-full rounded-btn border bg-surface px-4 text-body text-ink " +
  "placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 " +
  "focus:ring-brand/40 disabled:opacity-60";
const errorCls = "mt-1 text-small text-red-600";

type FieldWrap = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
};

export function Field({ id, label, required, error, children }: FieldWrap) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className={errorCls} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export function TextInput({ invalid, className, ...props }: TextInputProps) {
  return (
    <input
      className={cn(controlCls, "h-12", invalid ? "border-red-500" : "border-line", className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export function Textarea({ invalid, className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(controlCls, "py-3", invalid ? "border-red-500" : "border-line", className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

export function Select({ invalid, className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(controlCls, "h-12", invalid ? "border-red-500" : "border-line", className)}
      aria-invalid={invalid || undefined}
      {...props}
    >
      {children}
    </select>
  );
}

/**
 * Honeypot field — visually hidden, off the tab order, autocomplete disabled.
 * Real users never see or fill it; bots often do.
 */
export function Honeypot({ value, onChange }: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
      <label htmlFor="website">Website</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
