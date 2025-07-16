import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  titleCentered?: boolean;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  titleCentered = false,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="bg-white rounded-lg shadow-sm">
        {title && (
          <div className="border-b border-gray-200">
            <div className={`px-4 py-3 ${titleCentered ? 'text-center' : ''}`}>
              <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
            </div>
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Card;
