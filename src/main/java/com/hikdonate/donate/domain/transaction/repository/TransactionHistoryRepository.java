package com.hikdonate.donate.domain.transaction.repository;

import com.hikdonate.donate.domain.transaction.dto.DonationSummary;
import com.hikdonate.donate.domain.transaction.domain.Transaction;
import com.hikdonate.donate.domain.transaction.dto.TransactionDetail;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TransactionHistoryRepository extends MongoRepository<Transaction, String> {

    /*
    Function name: findTopBeneficiariesWalletAddressByDonation
    Summary: 태그에 해당되는 수혜자 리스트 중 N명 선택 알고리즘
    Parameter: 3개
        List<String> beneficiaryWallets : 태그에 해당되는 수혜자 리스트
        String fromDate : 현재 시각으로부터 2주 전의 시각
        int numOfBeneficiary : 선택하고자하는 N명의 수혜자
    Return: List<String>
    Caller: BeneficiaryInfoService
    Date: 2024.10.1
    Written by: 조현지
    
    Edit by: 양예현
    Edit date: 2024.10.13
    Summary: 중복 함수 제거
    */
    @Aggregation(pipeline = {
            // 태그 해당자의 donation history 가져오기 (최근 2주간)
            "{ '$match': { 'beneficiariesWallet': { '$in': ?0 }, 'timeStamp': { '$gte': ?1 } } }",
            // 태그 해당자별로 기부 금액의 총합 구하기 & donation history가 없으면 totalAmount는 0으로 설정
            "{ '$group': { '_id': '$beneficiariesWallet', 'totalAmount': { '$sum': { '$ifNull': ['$amount', 0] } } } }",
            // 기부 금액 총합에 대해 오름차순 정렬
            "{ '$sort': { 'totalAmount': 1 } }",
            // 상위 태그 해당자들의 wallet address를 리스트로 전달
            "{ '$project': { 'beneficiariesWallet': '$_id', '_id': 0 } }"
    })
    List<String> findTopBeneficiariesWalletAddressByDonation(List<String> beneficiaryWallets, String fromDate);

    /*
    Function name: findAllDonorDonationHistory
    Summary: 현재 로그인한 기부자의 전체 기부 내역 조회
    Parameter: 1개
        String donorWalletAddress : 기부자의 wallet address
    Return: List<DonationSummary>
    Caller: DonationSummaryService
    Date: 2024.10.22
    Written by: 조현지
    */
    @Aggregation(pipeline = {
            // 현재 로그인한 기부자의 기부 내역만 가져오기
            "{ '$match': { 'donorWallet': ?0 }  }",
            // 기부별로 요약 정보 산출
            "{ '$group': { '_id': { 'historyId': '$transactionHash', 'date': { '$dateToString': { 'format': '%Y-%m-%d', 'date': { '$toDate': { '$multiply': ['$timeStamp', 1000] } } } } }, 'totalAmount': { '$sum': '$amount' }, 'numberOfPeople': { '$sum': 1 }, 'beneficiaryList' : { '$push': '$beneficiariesWallet' } } }",
            // 기부 요약 정보를 리스트로 전달
            "{ '$project': { 'historyId': '$_id.historyId', 'date': '$_id.date', 'numberOfPeople': 1, 'totalAmount': 1, 'beneficiaryList': 1 } }"
    })
    List<DonationSummary> findAllDonorDonationHistory(String donorWalletAddress);

    @Aggregation(pipeline = {
            "{ '$match': { 'transactionHash': ?0 } }",
            "{ '$project': { 'amountPerPerson': '$amount', 'walletFrom': '$donorWallet', 'walletTo': '$beneficiariesWallet', 'date': { '$dateToString': { 'format': '%Y-%m-%d %H:%M:%S', 'date': { '$toDate': { '$multiply': ['$timeStamp', 1000] } } } } } }"
    })
    List<TransactionDetail> findAllTransactionByTransactionHash(String transactionHash);

//    Transaction save(Transaction transaction);
}
