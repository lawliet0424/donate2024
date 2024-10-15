import React, { useEffect } from "react"; // React와 useEffect 임포트
import "./MyHistoryDetail.css"; // 스타일시트 임포트
import DonationHistoryBox from "../../components/DonationHistoryBox"; // 마이페이지 메뉴 박스 컴포넌트 임포트
import DonationTransactionBox from "../../components/DonationTransactionBox"; // 마이페이지 메뉴 박스 컴포넌트 임포트
import { useParams } from "react-router-dom"; // URL 파라미터 가져오기
import useHistory from "../../hooks/useHistory"; // 훅 임포트

const MyHistoryDetail = () => {
    const { historyId } = useParams(); // URL에서 historyId 가져오기
    const { historyInfo, getHistoryDetail, loading, error } = useHistory();

//     useEffect(() => {
//         const fetchHistoryDetail = async () => {
//             try {
//                 await getHistoryDetail();
//             } catch (err) {
//                 console.log(err);
//             }
//         };
//         fetchHistoryDetail();
//     }, []);

    if (loading) {
        return <div>Loading...</div>; // 로딩 중 표시
    }

    if (error) {
        return <div>Error loading history detail: {error.message}</div>; // 에러 발생 시 메시지 표시
    }

    return (
        <div className="my-history-detail">
            <div className="my-history-detail__title">나의 기부 내역 <span className="my-history-detail__historyId"> {'>'} No.{historyId}</span></div> {/* 제목 표시 */}
{/*             <div className="my-history-detail__DonationTransactionBox"> */}
{/*                 {historyInfo.map((history) => ( */}
{/*                     <DonationTransactionBox */}
{/*                         key={history.beneficiaryName} */}
{/*                         beneficiaryName={history.beneficiaryName} */}
{/*                         amountPerPerson={history.amountPerPerson} */}
{/*                         status={history.status} */}
{/*                         walletFrom={history.walletFrom} */}
{/*                         walletTo={history.walletTo} */}
{/*                         date={history.date} */}
{/*                         txLink={history.txLink} */}
{/*                     /> */}
{/*                 ))} */}
{/*             </div> */}
            <DonationTransactionBox
                beneficiaryName={"홍길동"}
                amountPerPerson={1000}
                status={"Success"}
                walletFrom={"0xsdfdjhkjhf"}
                walletTo={"0xeejrkelrj"}
                date={"Oct-10-2024 10:16:20 AM UTC"}
                txLink={"https://testnet.bscscan.com/tx/0x7e7f5c8879b9dd1d4b22d37a272e6aa20b737b17136660a6d7e28ef4811b9345"}
            />
        </div>
    );
};

export default MyHistoryDetail;
