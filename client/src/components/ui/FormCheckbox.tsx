import React from 'react';

export interface FormCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  id: string;
  description?: string;
  error?: string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  label,
  id,
  description,
  error,
  required,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={id} className="flex items-start gap-2.5 cursor-pointer select-none">
        <input
          id={id}
          type="checkbox"
          required={required}
          className="mt-0.5 h-4 w-4 rounded border-outline-variant/60 text-primary accent-primary focus:ring-2 focus:ring-primary focus:ring-offset-1 cursor-pointer transition-colors"
          {...props}
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-on-surface">
            {label} {required && <span className="text-error">*</span>}
          </span>
          {description && (
            <span className="text-xs text-on-surface-variant">
              {description}
            </span>
          )}
        </div>
      </label>
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  );
};

