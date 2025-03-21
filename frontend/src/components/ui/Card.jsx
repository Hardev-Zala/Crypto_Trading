const Card = ({ children, className }) => {
  return (
    <div
      className={`p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg ${className}`}
    >
      {children}
    </div>
  );
};

const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

export { Card, CardContent };
