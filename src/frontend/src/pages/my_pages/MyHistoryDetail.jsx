import "./MyHistoryDetail.css"; // 스타일시트 임포트
import DonationHistoryBox from "../../components/DonationHistoryBox"; // 마이페이지 메뉴 박스 컴포넌트 임포트
import DonationTransactionBox from "../../components/DonationTransactionBox"; // 마이페이지 메뉴 박스 컴포넌트 임포트
import { useParams } from "react-router-dom"; // URL 파라미터 가져오기



/*
Function name: MyHistoryDetail
Summary: 사용자의 기부 현황 정보를 표시하는 컴포넌트
Parameter: 총 0개
Return: 총 1개; MyHistoryDetail 컴포넌트
Caller: React 애플리케이션의 렌더링 과정
Date: 2024-09-22
Write by: 길정수
*/
const MyHistoryDetail = () => {
      const { historyId } = useParams(); // URL에서 historyId 가져오기
//       const { beneficiaryInfo, getSelectedBeneficiaries, loading, error } = useBeneficiary(); // 수혜자 관련 훅 사용
//
//
//       useEffect(() => {
//         if (!location.state || !location.state.fromSecondStep) {
//           window.alert("잘못된 접근입니다. 홈으로 이동합니다.");
//           navigate("/");
//           return;
//         }
//
//         const fetchBeneficiaries = async () => {
//           try {
//               await getSelectedBeneficiaries(
//                  location.state.selectedTags,
//                  location.state.numberOfPeople
//                  );
//               } catch (err) {
//                   console.log(err);
//               }
//         };
//
//         fetchBeneficiaries();
//       }, []);
//
//         if (loading) {
//           return <div>Loading...</div>; // 로딩 중 표시
//         }
//
//         if (error) {
//           return <div>Error loading beneficiary: {error.message}</div>; // 에러 발생 시 메시지 표시
//         }

  return (
    <div className="my-history-detail">
        <div className="my-history-detail__title">나의 기부 현황 > #{historyId}</div> {/* 제목 표시 */}
                <div className="my-history-detail__history">
{/*                   {beneficiaryInfo.map((beneficiary) => ( */}
{/*                     <BeneficiaryBox */}
{/*                       key={beneficiary.beneficiaryId} */}
{/*                       beneficiaryId={beneficiary.beneficiaryId} // 수혜자 ID */}
{/*                       selectedTags={location.state.selectedTags} // 선택된 태그 전달 */}
{/*                     /> */}
{/*                   ))} */}
                </div>
      <DonationTransactionBox beneficiaryName={"홍길동"} amountPerPerson={1000} status={"Success"} walletFrom={"0xsdfdjhkjhf"} walletTo={"0xeejrkelrj"} date={"Oct-10-2024 10:16:20 AM UTC"}  />
    </div>
  );
};

export default MyHistoryDetail;
