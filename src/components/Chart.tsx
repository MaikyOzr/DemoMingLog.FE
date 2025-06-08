import React from 'react';

interface ChartProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Chart: React.FC<ChartProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`card hover:shadow-strong transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-display font-semibold text-gray-900">{title}</h3>
        <div className="flex gap-2">
          <button className="btn-secondary text-sm px-3 py-1.5">Day</button>
          <button className="btn-secondary text-sm px-3 py-1.5">Week</button>
          <button className="btn-secondary text-sm px-3 py-1.5">Month</button>
        </div>
      </div>
      <div className="relative min-h-[300px]">
        {children}
      </div>
    </div>
  );
};

export default Chart; 