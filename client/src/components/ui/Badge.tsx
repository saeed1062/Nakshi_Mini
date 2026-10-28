import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const variants = {
    default: 'bg-surface-container-high text-on-surface-variant',
    primary: 'bg-primary-container/20 text-primary border border-primary/20',
    success: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
    warning: 'bg-amber-100 text-amber-800 border border-amber-300',
    error: 'bg-error-container text-on-error-container border border-error/30',
  };

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
