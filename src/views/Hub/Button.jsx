// components/Button.js
const Button = ({ type, onClick, disabled, children }) => (
    <button type={type} onClick={onClick} disabled={disabled} className="button">
      {children}
    </button>
  );
  
  export default Button;
  