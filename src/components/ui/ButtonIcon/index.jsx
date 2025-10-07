export default function ButtonIcon({ children, onClick, className = "" }) {
  return (
    <button onClick={onClick} className={`btn icon${className}`}>
      {children}
    </button>
  );
}
