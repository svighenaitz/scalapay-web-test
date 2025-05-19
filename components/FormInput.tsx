import React from 'react';
import FieldError from './FieldError';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  errorName: string;
  as?: 'input' | 'select';
  options?: { value: string; label: string }[];
  className?: string;
}

import { useFormStore } from '../store/formSlice';

const FormInput: React.FC<FormInputProps> = ({ errorName, as = 'input', options, className, ...props }) => {
  const { errors } = useFormStore();
  const hasError = Boolean(errors && errors[errorName]);
  return (
    <div>
      {as === 'select' ? (
        <select {...props} className={className} aria-invalid={hasError}>
          {options && options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input {...props} className={className} aria-invalid={hasError} />
      )}
      <FieldError name={errorName} />
    </div>
  );
};

export default FormInput;
