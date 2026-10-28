// components/FormInput.jsx

export default function FormInput({
  label,
  type = "text",
  placeholder,
}) {
  return (
    <div>
      <label className="block text-sm mb-1">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-gray-100 px-3 py-2 rounded"
      />
    </div>
  );
}