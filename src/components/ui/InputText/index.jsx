export default function InputText({
  autoFocus = false,
  className = "",
  ...props
}) {
  return (
    <input
      {...props}
      type="text"
      autoFocus={autoFocus}
      className={`input-text ${className}`}
    />
  );
}
