import React, { useLayoutEffect } from "react"; // React와 useEffect 임포트
import "./MyHistoryDetail.css"; // 스타일시트 임포트
import DonationTransactionBox from "../../components/DonationTransactionBox"; // 마이페이지 메뉴 박스 컴포넌트 임포트
import { useParams } from "react-router-dom"; // URL 파라미터 가져오기
import useHistory from "../../hooks/useHistory"; // 훅 임포트
import BubbleTooltip from "../../components/BubbleTooltip"; // 툴팁 컴포넌트 임포트
import { Link } from "react-router-dom";


const MyHistoryDetail = () => {
    const { historyId } = useParams(); // URL에서 historyId 가져오기
    const { historyDetailInfo, getHistoryDetail, loading, error } = useHistory();

     useLayoutEffect(() => {
         const fetchHistoryDetail = async () => {
             try {
                 await getHistoryDetail(historyId);
                 console.log("상세내역 요청완료: ", historyInfo);
             } catch (err) {
                 console.log("상세 내역 로딩 오류:", err);
             }
         };
         fetchHistoryDetail();
     }, []);

    if (loading) {
        return <div>Loading...</div>; // 로딩 중 표시
    }

    if (error) {
        return <div>Error loading history detail: {error.message}</div>; // 에러 발생 시 메시지 표시
    }

  const shortenHistoryId = (wallet) => {
    return `${wallet.substring(0, 15)}...${wallet.substring(wallet.length - 2)}`;
  };

    return (
        <div className="my-history-detail">
            <div className="my-history-detail__title"><Link to="/myhistory" ><div className="my-history-detail__title--main">나의 기부 내역</div></Link> <span className="my-history-detail__title--sign">{">"}</span><Link to={`/myhistory/${historyId}`} className="my-history-detail__title--historyId" title={historyId}>#{shortenHistoryId(historyId)}</Link></div>
            <div className="my-history-detail__DonationTransactionBox">
                 {historyDetailInfo.map((history) => (
                     <DonationTransactionBox
                         key={history.beneficiaryName}
                         beneficiaryName={history.beneficiaryName}
                         amountPerPerson={history.amountPerPerson}
//                          status={history.status}
                         status="Success"
                         walletFrom={history.walletFrom}
                         walletTo={history.walletTo}
                         date={history.date}
                         txLink={history.txLink}
                     />
                 ))}
             </div>
        </div>
    );
};

export default MyHistoryDetail;
