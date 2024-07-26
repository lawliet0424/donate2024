import "./TransparentButton.css";

const TransparentButton = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={"TransparentButton"}>
      {text}
    </button>
  );
};

export default TransparentButton;
