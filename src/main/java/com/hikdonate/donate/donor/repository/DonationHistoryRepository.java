//package com.hikdonate.donate.donor.repository;
//
//import org.apache.ibatis.annotations.Param;
//import org.springframework.data.jpa.repository.Query;
//
//import java.time.LocalDateTime;
//
//public interface DonationHistoryRepository extends JpaRepository<Donation, Long> {
//
//    // 특정 수혜자가 최근 2주간 받은 기부 금액 합산
//    @Query("SELECT SUM(d.amount) FROM Donation d WHERE d.beneficiary.id = :beneficiaryId AND d.timestamp >= :twoWeeksAgo")
//    Long sumDonationsByBeneficiaryAndDate(@Param("beneficiaryId") Long beneficiaryId, @Param("twoWeeksAgo") LocalDateTime twoWeeksAgo);
//}