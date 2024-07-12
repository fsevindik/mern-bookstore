import React from "react";

const FormInput = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    value={value}
    onChange={onChange}
  />
);
export default FormInput;
