/**
 * TagPill, compact monospace tag.
 * Subtle orange wash, brightens on hover.
 */
export default function TagPill({ children, size = "md", className = "" }) {
  const sizes = {
    sm: "px-2.5 py-1 text-[10px]",
    md: "px-3 py-1 text-xs",
  };
  return (
    <span
      className={`inline-flex items-center font-mono uppercase rounded-full transition-all duration-200 ${sizes[size] || sizes.md} ${className}`}
      style={{
        background: "rgba(255, 107, 43, 0.06)",
        border: "1px solid rgba(255, 107, 43, 0.15)",
        color: "#8899AA",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255, 107, 43, 0.15)";
        e.currentTarget.style.borderColor = "rgba(255, 107, 43, 0.4)";
        e.currentTarget.style.color = "#F0F4F8";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255, 107, 43, 0.06)";
        e.currentTarget.style.borderColor = "rgba(255, 107, 43, 0.15)";
        e.currentTarget.style.color = "#8899AA";
      }}
    >
      {children}
    </span>
  );
}
