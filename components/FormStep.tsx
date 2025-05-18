import React from 'react';

interface FormStepProps {
  heading: string;
  children: React.ReactNode;
  className?: string;
}

const FormStep: React.FC<FormStepProps> = ({ heading, children, className }) => (
  <div className={className}>
    <h3>{heading}</h3>
    {children}
  </div>
);

export default FormStep;
