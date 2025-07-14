import React from "react";

const FloatingInput = ({
  id,
  label,
  placeholder = " ",
  value,
  onChange,
  type = "text",
  disabled = false,
}) => {
  const isFloating = value && value.length > 0;

  return (
    <div className="relative w-full text-right" dir="rtl">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className="peer w-full px-4 pt-7 pb-3 bg-gray-100 text-sm text-gray-700 rounded-lg border border-transparent 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed
          dark:bg-gray-800 dark:text-white dark:focus:ring-neutral-600"
      />
      <label
        htmlFor={id}
        className={`absolute right-4 top-2  text-sm text-gray-400 transition-all duration-200 pointer-events-none
          ${isFloating ? "top-2 text-xs text-gray-500" : ""}
          peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500
          peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
