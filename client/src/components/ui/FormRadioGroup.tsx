import React from 'react';

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

export interface FormRadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  label,
  name,
  options,
  selectedValue,
  onChange,
  required,
  error,
  direction = 'horizontal',
  className = '',
}) => {
  return (
    <fieldset className={`space-y-1.5 ${className}`}>
      <legend className="block text-xs font-semibold uppercase text-on-surface-variant mb-1">
        {label} {required && <span className="text-error">*</span>}
      </legend>

      <div
        className={
          direction === 'horizontal'
            ? 'flex flex-wrap items-center gap-4'
            : 'space-y-2'
        }
      >
        {options.map((option) => {
          const inputId = `${name}-${option.value}`;
          const isSelected = selectedValue === option.value;

          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className={`flex items-start gap-2.5 cursor-pointer select-none ${
                option.disabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <input
                id={inputId}
                name={name}
                type="radio"
                value={option.value}
                checked={isSelected}
                disabled={option.disabled}
                onChange={() => onChange(option.value)}
                className="mt-0.5 h-4 w-4 border-outline-variant/60 text-primary accent-primary focus:ring-2 focus:ring-primary focus:ring-offset-1 cursor-pointer transition-colors"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-on-surface">
                  {option.label}
                </span>
                {option.description && (
                  <span className="text-xs text-on-surface-variant">
                    {option.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </fieldset>
  );
};

