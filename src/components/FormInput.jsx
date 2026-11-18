import { useId } from "react";

export default function FormInput({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  required = false,
  minLength,
  autoComplete,
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-sm mb-1">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        className="w-full bg-gray-100 px-3 py-2 rounded"
      />
    </div>
  );
}