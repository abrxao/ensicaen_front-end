export default function ButtonIcon({
  children,
  onClick,
  className = "",
  ...props
}) {
  return (
    <button onClick={onClick} className={`btn icon ${className}`} {...props}>
      {children}
    </button>
  );
}
