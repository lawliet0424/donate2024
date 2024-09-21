package com.hikdonate.donate.domain.transaction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/*
 * Class name: Transaction
 * Summary: MongoDB의 collection을 만들어주기 위한 클래스
 * Date: 2024.07.28
 * Write by: 양예현
 * P.S.: collection의 field 구성은 개발 중에 달라질 수 있음
 *       MongoDB
 */
@Data
@Document(collection = "Transaction")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Transaction {
    @Id
    private String blockNumber;

    private String timestamp;

    private String donor_wallet;

    private String beneficiary_wallet;

    private int amount;

}
