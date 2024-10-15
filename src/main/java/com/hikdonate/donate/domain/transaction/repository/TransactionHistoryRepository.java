package com.hikdonate.donate.domain.transaction.repository;

import com.hikdonate.donate.domain.transaction.domain.Transaction;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

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
            "{ '$match': { 'beneficiary_wallet': { '$in': ?0 }, 'timestamp': { '$gte': ?1 } } }",
            // 태그 해당자별로 기부 금액의 총합 구하기 & donation history가 없으면 totalAmount는 0으로 설정
            "{ '$group': { '_id': '$beneficiary_wallet', 'totalAmount': { '$sum': { '$ifNull': ['$amount', 0] } } } }",
            // 기부 금액 총합에 대해 오름차순 정렬
            "{ '$sort': { 'totalAmount': 1 } }",
            // 상위 태그 해당자들의 wallet address를 리스트로 전달
            "{ '$project': { 'beneficiary_wallet': '$_id', '_id': 0 } }"
    })
    List<String> findTopBeneficiariesWalletAddressByDonation(List<String> beneficiaryWallets, String fromDate);
    /*
    특정 Donor의 donation history 가져오기 (전체) <-- 기부 내역 조회 기능 만들 때 사용할 예정
    */
    @Query("{'donor_wallet': ?0}")
    List<Transaction> findAllDonorDonationHistory(String donorWalletAddress);

//    Transaction save(Transaction transaction);
}
