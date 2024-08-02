import "./TransparentButton.css";

const TransparentButton = ({ text, onClick }) => {
  return (
    <button className="TransparentButton" onClick={onClick}>
      {text}
    </button>
  );
};

export default TransparentButton;
