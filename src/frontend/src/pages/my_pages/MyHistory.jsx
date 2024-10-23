import React, { useEffect } from "react"; // React와 useEffect 임포트
import "./MyHistory.css"; // 스타일시트 임포트
import DonationHistoryBox from "../../components/DonationHistoryBox"; // 마이페이지 메뉴 박스 컴포넌트 임포트
import useHistory from "../../hooks/useHistory"; // 훅 임포트
import Loading from "../error_loading_pages/Loading.jsx";


const MyHistory = () => {
    const { historyInfo, getHistory, loading, error } = useHistory();

     useEffect(() => {
         const fetchHistory = async () => {
             try {
                 await getHistory();
             } catch (err) {
                 console.log(err);
             }
         };
         fetchHistory();
     }, []);

    if (loading) {
        return <Loading />; // 로딩 중 표시
    }

    if (error) {
        return <div>Error loading history: {error.message}</div>; // 에러 발생 시 메시지 표시
    }

    return (
        <div className="my-history">
            <div className="my-history__title">나의 기부 내역</div>
             <div className="my-history__DonationHistoryBox">
                 {historyInfo.map((history) => (
                     <DonationHistoryBox
                         key={history.historyId}
                         numberOfPeople={history.numberOfPeople}
                         totalAmount={history.totalAmount}
                         historyId={history.historyId}
                         date={history.date}
                         beneficiaryList={history.beneficiaryInfo}
                     />
                 ))}
             </div>
        </div>
    );
};

export default MyHistory;
