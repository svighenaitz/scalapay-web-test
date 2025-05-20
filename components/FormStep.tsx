import React from 'react';

import type { FormStepProps } from '../types/form';
import styles from './FormStep.module.css';
import formStyles from './Form.module.css';

const FormStep: React.FC<FormStepProps> = ({ heading, children }) => (
  <div className={formStyles.cardVariant}>
    <h3 className={styles.heading}>{heading}</h3>
    {children}
  </div>
);

export default FormStep;
