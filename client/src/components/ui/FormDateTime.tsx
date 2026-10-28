import React from 'react';

export interface FormDateTimeProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  id: string;
  type?: 'date' | 'datetime-local' | 'time';
  error?: string;
  helperText?: string;
}

export const FormDateTime: React.FC<FormDateTimeProps> = ({
  label,
  id,
  type = 'datetime-local',
  error,
  helperText,
  required,
  className = '',
  ...props
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold uppercase text-on-surface-variant mb-1"
      >
        {label} {required && <span className="text-error">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        className={`w-full px-3.5 py-2.5 rounded-lg border border-outline-variant/60 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm text-on-surface ${
          error ? 'border-error ring-1 ring-error' : ''
        } ${className}`}
        {...props}
      />
      {helperText && !error && (
        <p className="text-xs text-on-surface-variant mt-1">{helperText}</p>
      )}
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  );
};

