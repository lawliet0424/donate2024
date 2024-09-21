package com.hikdonate.donate.domain.donor.application;

import com.hikdonate.donate.domain.donor.dao.DonorRepository;
import com.hikdonate.donate.domain.donor.domain.Donor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
/*
Class name: DonorSignUpService
Summary: 기부자(Donor)의 회원가입을 구현한 service 코드
Date: 2024.08.26
Written by: 양예현
 */
public class DonorSignUpService {

    private final DonorRepository donorRepository;
    private final PasswordEncoder passwordEncoder;

    /*
    Function name: createDonor
    Summary: 사용자(기부자)가 입력한 내용(이름, 이메일, 전화번호, 닉네임, id, 비밀번호)에 따라 Donor를 생성하여 회원가입
    Parameter: 총 6개
        String donorName; 사용자가 입력한 이름
        String donorMail; 사용자가 입력한 이메일
        String donorPhoneNumber; 사용자가 입력한 전화번호
        String donorNickname; 사용자가 입력한 닉네임
        String donorId; 사용자가 입력한 id
        String donorPassword; 사용자가 입력한 비밀번호
    Return: 사용자의 입력을 바탕으로 생성된 donor 객체
    Date: 2024.08.26
    Written by: 양예현
     */
    public Donor createDonor (String donorName, String donorMail, String donorPhonenumber,
                         String donorNickname, String donorId, String donorPassword) {
        Donor donor = new Donor();
        donor.setDonorName(donorName);
        donor.setDonorMail(donorMail);
        donor.setDonorPhonenumber(donorPhonenumber);
        donor.setDonorNickname(donorNickname);;
        donor.setDonorId(donorId);
        donor.setDonorPassword(passwordEncoder.encode(donorPassword));

        this.donorRepository.save(donor);

        return donor;
    }
}
