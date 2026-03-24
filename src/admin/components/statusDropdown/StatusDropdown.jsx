import { useState, useRef } from "react";

export default function StatusDropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  const selected = options.find((opt) => opt.value === value);

  // Toggle dropdown without closing immediately
  const handleToggle = (e) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleChange = async (newValue) => {
    setLoading(true);
    await onChange(newValue);
    setLoading(false);
    setOpen(false);
  };

  // Close on outside click
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  // Attach listener only once
  useState(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative w-[130px]" ref={dropdownRef}>
      {/* Selected */}
      <div
        onClick={handleToggle}
        className={`cursor-pointer px-2 py-1 rounded text-white flex items-center justify-between ${selected.color}`}
      >
        <span>{selected.label}</span>
        {loading && (
          <span className="ml-2 animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-1 w-full bg-white shadow rounded z-10">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleChange(opt.value)}
              className={`px-2 py-1 cursor-pointer text-white ${opt.color} hover:opacity-80`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}