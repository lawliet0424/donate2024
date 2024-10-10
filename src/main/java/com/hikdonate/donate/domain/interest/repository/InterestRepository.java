package com.hikdonate.donate.domain.interest.repository;

import com.hikdonate.donate.domain.interest.domain.Interest;
import com.hikdonate.donate.domain.interest.domain.InterestId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/*
Interface name: InterestRepository
Summary: 관심 정보(Interest) 데이터를 저장하고 조회하기 위한 저장소 인터페이스.
         JpaRepository를 확장하여 기본 CRUD 작업을 수행할 수 있음
Written by: 심민서
 */
public interface InterestRepository extends JpaRepository<Interest, InterestId> {
    @Override
    Optional<Interest> findById(InterestId interestId);
}
