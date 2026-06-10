import type { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  className?: string;
  title?: string;
  subtitle?: string;
}

const Card = ({ children, className = "", title, subtitle }: CardProps) => {
  return (
    <section
      className={`rounded-2xl border border-white/60 bg-white/80 p-5 shadow-panel backdrop-blur-sm ${className}`}
      aria-label={title}
    >
      {(title || subtitle) && (
        <header className="mb-4">
          {title && <h2 className="text-lg font-semibold tracking-tight text-ink">{title}</h2>}
          {subtitle && <p className="text-sm text-ink/70">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
};

export default Card;
