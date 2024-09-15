package com.hikdonate.donate.interest;

import com.hikdonate.donate.beneficiary.Beneficiary;
import com.hikdonate.donate.donor.Donor;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/*
 * Class name: Interest
 * Summary: DB 테이블 설정을 위한 JPA entity class
 * Date: 2024.07.19
 * Write by: 양예현
 * P.S.: DB 관련 endpoint 설정 및 password과 같은 보안 설정은 계속 업데이트 예정
 *       ERD 및 DB에 대한 전체적인 내용은 노션 페이지 참고
 */
@Entity
@Getter
@Setter
public class Interest {

    @EmbeddedId
    private InterestId interest_id;

    @ManyToOne
    @MapsId("donor_id")
    @JoinColumn(name = "donor_id")
    private Donor donor;

    @ManyToOne
    @MapsId("beneficiary_id")
    @JoinColumn(name = "beneficiary_id")
    private Beneficiary beneficiary;

    @Column(nullable = false)
    private LocalDateTime like_date;
}
