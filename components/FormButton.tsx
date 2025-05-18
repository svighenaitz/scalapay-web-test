import React from 'react';

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  label: string;
  loadingLabel?: string;
  className?: string;
}

const FormButton: React.FC<FormButtonProps> = ({ loading, label, loadingLabel, className, ...props }) => (
  <button type="submit" className={className} disabled={loading || props.disabled} {...props}>
    {loading ? (loadingLabel || 'Attendi...') : label}
  </button>
);

export default FormButton;
