import "./ColoredButton.css";

const ColoredButton = ({ text, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`ColoredButton ${type ? `ColoredButton_${type}` : ""}`}
    >
      {text}
    </button>
  );
};

export default ColoredButton;
