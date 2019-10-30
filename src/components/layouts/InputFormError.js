import React from 'react';

const InputFormError = ({ fieldName, errors }) => {
  return (
    <span className="text-warning">
      {errors[fieldName] && errors[fieldName].message}
    </span>
  );
};

export default InputFormError;
