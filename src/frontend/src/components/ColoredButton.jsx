import "./ColoredButton.css";

/*
  Function name: ColoredButton
  Summary: 색상 스킴을 가진 버튼 컴포넌트
  Parameter: 총 4개
             string text; 버튼에 표시할 텍스트
             string colorScheme (선택); 버튼의 색상 스킴 (기본값 없음)
             function onClick; 버튼 클릭 시 호출할 함수
             string className (선택); 추가적인 클래스명 (기본값 없음)
  Return: 총 1개; JSX 버튼 컴포넌트
  Caller: 다른 컴포넌트에서 호출 가능
  Date: 2024.09.21
  Write by: 길정수
*/
const ColoredButton = ({ text, colorScheme, onClick, className }) => {
  // 버튼의 클래스명을 동적으로 생성
  const buttonClass = `ColoredButton ${
    colorScheme ? `ColoredButton--${colorScheme}` : ""
  } ${className || ""}`;

  /*
   JSX: 버튼을 화면에 렌더링하는 컴포넌트 구조
  */
  return (
    <button onClick={onClick} className={buttonClass}>
      {text}
    </button>
  );
};

export default ColoredButton;
