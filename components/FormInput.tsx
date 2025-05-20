import React from 'react';
import FieldError from './FieldError';
import styles from './FormInput.module.css';

import type { FormInputProps } from '../types/form';

import { useFormStore } from '../store/formSlice';

const FormInput: React.FC<FormInputProps> = ({ errorName, as = 'input', options, className, ...props }) => {
  const { errors } = useFormStore();
  const hasError = Boolean(errors && errors[errorName]);
  return (
    <div>
      {as === 'select' ? (
        <select
          {...props}
          className={className ? `${styles.inputFullWidth} ${className}` : styles.inputFullWidth}
          aria-invalid={hasError}
        >
          {options && options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        props.type === 'checkbox' ? (
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={props.checked}
              onChange={props.onChange}
              className={styles.switchInput}
              {...props}
            />
            <span className={styles.slider}></span>
          </label>
        ) : (
          <input
            {...props}
            className={className ? `${styles.inputFullWidth} ${className}` : styles.inputFullWidth}
            aria-invalid={hasError}
          />
        )
      )}
      <FieldError name={errorName} />
    </div>
  );
};

export default FormInput;
