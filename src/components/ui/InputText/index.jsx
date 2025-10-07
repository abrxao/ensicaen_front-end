export default function InputText({
  value,
  onChange,
  onKeyDown,
  onBlur,
  autoFocus = false,
  className = "",
}) {
  return (
    <input
      value={value}
      type="text"
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      autoFocus={autoFocus}
      className={`input-text ${className}`}
    />
  );
}
