package com.hikdonate.donate.domain.transaction.repository;

import com.hikdonate.donate.domain.transaction.Transaction;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;
import java.util.List;

public interface TransactionRepository extends MongoRepository<Transaction, String> {

    // 태그 해당자 선택 알고리즘
    @Aggregation(pipeline = {
            // 태그 해당자의 donation history 가져오기 (최근 2주간)
            "{ '$match': { 'beneficiary_wallet': { '$in': ?0 }, 'timestamp': { '$gte': ?1 } } }",
            // 태그 해당자별로 기부 금액의 총합 구하기 & donation history가 없으면 totalAmount는 0으로 설정
            "{ '$group': { '_id': '$beneficiary_wallet', 'totalAmount': { '$sum': { '$ifNull': ['$amount', 0] } } } }",
            // 기부 금액 총합에 대해 오름차순 정렬
            "{ '$sort': { 'totalAmount': 1 } }",
            // 상위 태그 해당자에 대한 정보만 남기기 (N명)
            "{ '$limit': ?2 }",
            // 상위 태그 해당자들의 wallet address를 리스트로 전달
            "{ '$project': { 'beneficiary_wallet': '$_id', '_id': 0 } }"
    })
    List<String> findTopBeneficiariesWalletAddressByDonation(List<String> beneficiaryWallets, Date fromDate, int numOfBeneficiary);


    // 특정 Donor의 donation history 가져오기 (전체)
    @Query("{'donor_wallet': ?0}")
    List<Transaction> findAllDonorDonationHistory(String donorWalletAddress);

    Transaction save(Transaction transaction);
}
