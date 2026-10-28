import React from 'react';

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  required?: boolean;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  id,
  required,
  rows = 3,
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
      <textarea
        id={id}
        rows={rows}
        required={required}
        className={`w-full px-3.5 py-2.5 rounded-lg border border-outline-variant/60 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none ${className}`}
        {...props}
      />
    </div>
  );
};
