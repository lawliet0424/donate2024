package com.hikdonate.donate.domain.donor.service;

import com.hikdonate.donate.domain.donor.domain.Donor;
import com.hikdonate.donate.domain.donor.domain.DonorRole;
import com.hikdonate.donate.domain.donor.domain.DonorDetails;
import com.hikdonate.donate.domain.donor.repository.DonorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
/*
Class name: DonorLoginService
Summary: 기부자(Donor)의 로그인을 구현한 Service
         Spring Security의 UserDetailsService를 구현하는 class
Written by: 양예현
 */
public class DonorDetailsService implements UserDetailsService {

    private final DonorRepository donorRepository;

    /*
    Function name: loadUserByUsername
    Summary: Id로 Donor를 찾는 함수
             Spring Security의 UserDetailsService class의 loadUserByUsername 함수를 override한다.
    Parameter: 총 1개
        String donorId; 사용자가 입력한 Id
    Return: 사용자가 입력한 donorId와 일치하는 Id를 가진 Donor 반환
    Written by: 양예현
     */
    @Override
    public DonorDetails loadUserByUsername(String donorId) throws UsernameNotFoundException {
        Optional<Donor> _donor = this.donorRepository.findByDonorId(donorId);
        if(_donor.isEmpty()) {
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
        }

        Donor donor = _donor.get();

        List<GrantedAuthority> authorities = new ArrayList<>();

        if("admin".equals(donorId)) {
            authorities.add(new SimpleGrantedAuthority(DonorRole.ADMIN.getValue()));
        } else {
            authorities.add(new SimpleGrantedAuthority(DonorRole.USER.getValue()));
        }

//        return new User(donor.getDonorId(), donor.getDonorPassword(), authorities);
        return new DonorDetails(donor);
    }

    public Donor getDonorInfo() {
//        // 현재 인증된 사용자 가져오기
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        // 인증 정보에서 사용자 이름(ID) 가져옴
//        String donorId = authentication.getName();
        // 현재 사용자 id 가져오기
        String donorId = getCurrentDonorId();

        // 사용자 ID로 Donor 조회하기
        return donorRepository.findByDonorId(donorId)
                .orElseThrow(() -> new UsernameNotFoundException("사용자 정보 가져오기 실패"));
    }

    public String getCurrentDonorId() {
        // 현재 인증된 사용자 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 인증 정보에서 사용자 이름(ID) 가져옴
        String donorId = authentication.getName();

        // id 반환
        return donorId;
    }

}