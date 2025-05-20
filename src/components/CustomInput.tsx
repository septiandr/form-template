import React from "react";

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  ...props
}) => (
  <div>
    <label className="block mb-1 text-white">{label}</label>
    <input
      {...props}
      className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
    />
    {error && <p className="text-red-400 text-sm">{error}</p>}
  </div>
);

export default CustomInput;