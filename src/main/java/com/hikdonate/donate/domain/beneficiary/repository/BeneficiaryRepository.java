package com.hikdonate.donate.domain.beneficiary.repository;

import com.hikdonate.donate.domain.beneficiary.domain.Beneficiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/*
 * Class name: BeneficiaryRepository
 * Summary: Beneficiary 정보 검색을 위한 JPA Repository
 * Date: 2024.09.30
 * Write by: 심민서
 */
@Repository
public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
    Beneficiary findByBeneficiaryWallet(String beneficiary_wallet);

    Beneficiary findByBeneficiaryId(Long beneficiary_id);
}