export const Card = ({ children, className = "", ...rest }) => {
  return (
    <div
      {...rest}
      className={`rounded-2xl shadow-md p-4 bg-white ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => (
  <div className={`mb-2 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
);

export const CardDescription = ({ children, className = "" }) => (
  <p className={`text-gray-600 ${className}`}>{children}</p>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

export default Card;
