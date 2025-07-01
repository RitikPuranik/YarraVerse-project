// src/components/Card.jsx

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`rounded-2xl shadow-md p-4 bg-white ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => {
  return <div className={`mb-2 ${className}`}>{children}</div>;
};

export const CardTitle = ({ children, className = "" }) => {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
};

export const CardDescription = ({ children, className = "" }) => {
  return <p className={`text-gray-600 ${className}`}>{children}</p>;
};

export const CardContent = ({ children, className = "" }) => {
  return <div className={className}>{children}</div>;
};

export default Card;
