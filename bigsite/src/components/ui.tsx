import { L as Link } from "../i18n/lang";
import type { ReactNode } from "react";

export function Button({
  children,
  to,
  href,
  ghost,
  className = "",
  large,
  onClick,
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  ghost?: boolean;
  className?: string;
  large?: boolean;
  onClick?: () => void;
}) {
  const cls = `btn ${ghost ? "btn-ghost" : ""} ${large ? "btn-lg" : ""} ${className}`;
  const style = large ? { fontSize: "16px", padding: "15px 32px" } : undefined;
  // onClick on Link/anchor is additive (analytics etc.) — navigation still proceeds.
  if (to) return <Link to={to} className={cls} style={style} onClick={onClick}>{children}</Link>;
  if (href) return <a href={href} className={cls} style={style} onClick={onClick}>{children}</a>;
  return <button className={cls} style={style} onClick={onClick}>{children}</button>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

export function Section({
  children,
  className = "",
  id,
  style,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section id={id} className={`section ${className}`} style={style}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="chip">{children}</span>;
}

// Headline with a gold-clipped emphasis span via <em> markers in text would be overkill;
// pass JSX directly. Helper for the white→lilac gradient headline.
export function Display({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`h-grad ${className}`}>{children}</span>;
}
