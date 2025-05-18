import React from 'react';
import FieldError from './FieldError';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  errorName: string;
  as?: 'input' | 'select';
  options?: { value: string; label: string }[];
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({ errorName, as = 'input', options, className, ...props }) => {
  return (
    <div>
      {as === 'select' ? (
        <select {...props} className={className}>
          {options && options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input {...props} className={className} />
      )}
      <FieldError name={errorName} />
    </div>
  );
};

export default FormInput;
