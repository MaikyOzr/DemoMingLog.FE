import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  className = '',
}) => {
  return (
    <div className={`card hover:shadow-strong transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        {icon && <div className="text-primary-500 p-2 bg-primary-50 rounded-lg">{icon}</div>}
      </div>
      <div className="text-3xl font-display font-bold text-gray-900 mb-2">{value}</div>
      {trend && (
        <div className="flex items-center gap-2 text-sm">
          <span className={`flex items-center gap-1 font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
            {Math.abs(trend.value)}%
          </span>
          <span className="text-gray-500">vs last period</span>
        </div>
      )}
    </div>
  );
};

export default StatCard; 