import React from 'react';

export default ({ input, label }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input {...input} />
    </div>
  );
};
