import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Cards: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false 
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden';
  const hoverClasses = hover ? 'transform hover:scale-105 hover:shadow-2xl transition-all duration-300' : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};