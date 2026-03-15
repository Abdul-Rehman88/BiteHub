const PhoneInput = ({ value, setValue, placeholder = "03XXXXXXXXX",className, showError }) => {
  const handleChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 11) setValue(val);
  };

  return (
    <div className="relative">
      <input
        type="tel"
        inputMode="numeric"
        // pattern="[0-9]{11}"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={className}
      />
      {/* Show error if showError is true and phone is not 11 digits */}
      {showError && value.length !== 11 && (
        <p className="text-red-500 text-xs mt-1">Phone number must be 11 digits</p>
      )}
    </div>
  );
};

export default PhoneInput;