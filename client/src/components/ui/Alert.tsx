import React from 'react';

interface AlertProps {
  type?: 'error' | 'success' | 'info';
  message: string;
  onDismiss?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'error',
  message,
  onDismiss,
}) => {
  const styles = {
    error: 'bg-error-container text-on-error-container border-error/30',
    success: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    info: 'bg-surface-container text-on-surface border-outline-variant/40',
  };

  return (
    <div
      className={`mb-6 p-4 rounded-xl border text-sm flex items-center justify-between ${styles[type]}`}
    >
      <span>{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-xs font-bold underline ml-4 hover:opacity-80"
        >
          Dismiss
        </button>
      )}
    </div>
  );
};
