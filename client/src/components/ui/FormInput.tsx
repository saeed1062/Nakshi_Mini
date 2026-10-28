import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  error,
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
        required={required}
        className={`w-full px-3.5 py-2.5 rounded-lg border border-outline-variant/60 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm ${
          error ? 'border-error ring-1 ring-error' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  );
};
