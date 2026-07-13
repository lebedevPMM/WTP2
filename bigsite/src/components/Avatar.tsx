import type { Expert } from "../content/experts";

// Expert portraits live in public/experts/ (wired via experts.ts). The gradient-initials
// block below is the fallback for any expert without a photo.
export function Avatar({ expert, size = 48 }: { expert: Expert; size?: number }) {
  if (expert.photo) {
    return (
      <img
        src={expert.photo}
        alt={expert.name}
        width={size}
        height={size}
        loading="lazy"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          flexShrink: 0,
          objectFit: "cover",
          border: "1px solid rgba(227,181,100,.35)",
        }}
      />
    );
  }
  return (
    <div
      aria-label={expert.name}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        flexShrink: 0,
        display: "grid",
        placeItems: "center",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: size * 0.36,
        color: "#1a0d10",
        background: "linear-gradient(135deg, var(--gold), var(--rose))",
        boxShadow: "0 4px 16px rgba(227,181,100,.22)",
      }}
    >
      {expert.initials}
    </div>
  );
}
