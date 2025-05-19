import React from 'react';

import type { FormButtonProps } from '../types/form';

const FormButton: React.FC<FormButtonProps> = ({ loading, label, loadingLabel, className, ...props }) => (
  <button type="submit" className={className} disabled={loading || props.disabled} {...props}>
    {loading ? (loadingLabel || 'Attendi...') : label}
  </button>
);

export default FormButton;
