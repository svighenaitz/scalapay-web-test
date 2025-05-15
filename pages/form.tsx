

import React from 'react';

interface FormProps {}

const Form: React.FC<FormProps> = () => {
  return (
    <form>
      <input name="name" type="text" />
    </form>
  );
};

export default Form;