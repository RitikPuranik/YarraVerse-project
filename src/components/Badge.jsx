// src/components/Badge.jsx

export const Badge = ({ children, className = "" }) => {
  return (
    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
