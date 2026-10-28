import React from 'react';

export interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: SelectOption[];
  required?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  id,
  options,
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
      <select
        id={id}
        required={required}
        className={`w-full px-3.5 py-2.5 rounded-lg border border-outline-variant/60 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
