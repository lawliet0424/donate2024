package com.hikdonate.donate.domain.transaction.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

/*
 * Class name: Transaction
 * Summary: MongoDB의 collection을 만들어주기 위한 클래스
 * Date: 2024.07.28
 * Write by: 양예현
 * P.S.: collection의 field 구성은 개발 중에 달라질 수 있음
 *       MongoDB
 */
@Data
@Document(collection = "transaction")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Slf4j
public class Transaction {
    @Id
    private String id;
    private Long timeStamp;
    private String donorWallet;
    private String beneficiariesWallet;
    private int amount;
    private String transactionHash;
//    private String status;

}
