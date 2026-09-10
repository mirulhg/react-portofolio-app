import type { ReactNode } from "react";

interface KolomProps {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}

export function Kolom({ id, label, error, optional, children }: KolomProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-body-sm font-medium text-ink">
        {label} {optional && <span className="text-ink-muted">(opsional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-body-sm text-danger-ink">
          {error}
        </p>
      )}
    </div>
  );
}
