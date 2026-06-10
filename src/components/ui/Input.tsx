import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

const Input = ({ label, hint, className = "", id, ...props }: InputProps) => {
  return (
    <label className="flex w-full flex-col gap-1.5 text-sm font-medium text-ink" htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        className={`w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-base text-ink shadow-sm outline-none transition focus:border-ink/30 focus:ring-2 focus:ring-ink/20 ${className}`}
        {...props}
      />
      {hint && <span className="text-xs font-normal text-ink/60">{hint}</span>}
    </label>
  );
};

export default Input;
