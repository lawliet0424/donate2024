import "./ColoredButton.css";

const ColoredButton = ({ text, colorScheme, onClick }) => {
  const buttonClass = `ColoredButton ${
    colorScheme ? `ColoredButton--${colorScheme}` : ""
  }`;

  return (
    <button onClick={onClick} className={buttonClass}>
      {text}
    </button>
  );
};

export default ColoredButton;
