import * as React from "react";
export function ImguiCheckbox({
  children,
  className,
  ...props
}: {
  children?: string | React.ReactNode | React.ReactNode[];
  className?: string;
  props: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <input
      type="checkbox"
      className={`w-4 h-4 border-none rounded-none ${className}`}
      {...props}
    >
      {children}
    </input>
  );
}
