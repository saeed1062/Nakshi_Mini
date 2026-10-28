import React from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow = 'Nakshi Mini',
  title,
  action,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-outline-variant/40">
      <div>
        <span className="text-xs uppercase tracking-widest font-semibold text-primary">
          {eyebrow}
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-on-surface mt-1">
          {title}
        </h1>
      </div>
      {action && <div className="mt-4 md:mt-0">{action}</div>}
    </div>
  );
};
