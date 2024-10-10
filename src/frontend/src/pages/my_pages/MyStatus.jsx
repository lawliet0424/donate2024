import "./MyStatus.css"; // 스타일시트 임포트
import DonationStatusBox from "../../components/DonationStatusBox"; // 마이페이지 메뉴 박스 컴포넌트 임포트


/*
Function name: MyStatus
Summary: 사용자의 기부 현황 정보를 표시하는 컴포넌트
Parameter: 총 0개
Return: 총 1개; MyStatus 컴포넌트
Caller: React 애플리케이션의 렌더링 과정
Date: 2024-09-22
Write by: 길정수 
*/
const MyStatus = () => {
  return (
    <div className="my-status">
      {" "}
      {/* 기부 현황 컴포넌트 래퍼 */}
      <div className="my-status__title">나의 기부 현황</div> {/* 제목 표시 */}
      <DonationStatusBox numberOfPeople={1} totalAmount={1000} statusId={123} date={"2024.10.10"} beneficiaryList={["홍길동"]}  />
    </div>
  );
};

export default MyStatus; // MyStatus 컴포넌트 내보내기
