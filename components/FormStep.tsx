import React from 'react';

import type { FormStepProps } from '../types/form';

const FormStep: React.FC<FormStepProps> = ({ heading, children, className }) => (
  <div className={className}>
    <h3>{heading}</h3>
    {children}
  </div>
);

export default FormStep;
