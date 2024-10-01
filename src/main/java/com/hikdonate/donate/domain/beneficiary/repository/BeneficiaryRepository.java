package com.hikdonate.donate.domain.beneficiary.repository;

import com.hikdonate.donate.domain.beneficiary.domain.Beneficiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
    Beneficiary findByBeneficiaryWallet(String beneficiary_wallet);

    Beneficiary findByBeneficiaryId(Long beneficiary_id);
}