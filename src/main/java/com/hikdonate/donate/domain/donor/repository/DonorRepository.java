package com.hikdonate.donate.domain.donor.repository;

import com.hikdonate.donate.domain.donor.domain.Donor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/*
Interface name: DonorRepository
Summary: 기부자(Donor) 데이터를 저장하고 조회하기 위한 저장소 인터페이스.
         JpaRepository를 확장하여 기본 CRUD 작업을 수행할 수 있음
Written by: 양예현
 */
public interface DonorRepository extends JpaRepository<Donor, String> {
    Optional<Donor> findByDonorId(String donorId);

    // 아이디 중복 확인을 위한 메서드
    boolean existsByDonorId(String donorId);

}
