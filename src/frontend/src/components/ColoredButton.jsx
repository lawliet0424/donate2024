import "./ColoredButton.css";

const ColoredButton = ({ text, colorScheme, onClick, className }) => {
  const buttonClass = `ColoredButton ${
    colorScheme ? `ColoredButton--${colorScheme}` : ""
  } ${className || ""}`;

  return (
    <button onClick={onClick} className={buttonClass}>
      {text}
    </button>
  );
};

export default ColoredButton;
