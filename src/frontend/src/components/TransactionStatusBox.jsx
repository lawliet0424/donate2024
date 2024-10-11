import "./TransactionStatusBox.css";

/*
  Function name: TransactionStatusBox
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
const TransactionStatusBox = ({ status }) => {
  const BoxClass = `TransactionStatusBox ${
    status ? `TransactionStatusBox--${status}` : ""}`
  return (
      <div className={BoxClass}>
      <div className="TransactionStatusBox__circle"></div>
    <div className="TransactionStatusBox__text">{status}</div>
    </div>
  );
};

export default TransactionStatusBox;
