import "/src/components/ui/ButtonIcon/ButtonIcon.css";
export default function ButtonIcon({ children, onClick, className = "" }) {
  return (
    <button onClick={onClick} className={`icon ${className}`}>
      {children}
    </button>
  );
}
