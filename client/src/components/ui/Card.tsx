import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  badge?: string | number;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  badge,
  icon,
  children,
  className = '',
}) => {
  return (
    <div
      className={`bg-surface-container-low rounded-2xl border border-outline-variant/30 p-6 shadow-sm ${className}`}
    >
      {(title || badge) && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {icon && <span className="text-primary">{icon}</span>}
            <div>
              {title && (
                <h2 className="text-xl font-serif font-semibold text-on-surface">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xs text-on-surface-variant mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          {badge !== undefined && (
            <span className="text-xs bg-surface-container px-3 py-1 rounded-full text-on-surface-variant font-medium">
              {badge}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
