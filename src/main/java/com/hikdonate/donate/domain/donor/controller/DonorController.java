package com.hikdonate.donate.domain.donor.controller;

import com.hikdonate.donate.domain.beneficiary.dto.BeneficiarySimpleResponse;
import com.hikdonate.donate.domain.donor.domain.Donor;
import com.hikdonate.donate.domain.donor.dto.DonorLoginForm;
import com.hikdonate.donate.domain.donor.dto.DonorSignUpForm;
import com.hikdonate.donate.domain.donor.dto.DonorSignUpValidationGroups;
import com.hikdonate.donate.domain.donor.service.DonorDetailsService;
import com.hikdonate.donate.domain.donor.service.DonorSignUpService;
import com.hikdonate.donate.domain.interest.service.InterestedBeneficiariesService;
//
import com.hikdonate.donate.domain.donor.dto.DonorUpdateDto;
import com.hikdonate.donate.domain.donor.service.DonorInfoUpdateService;
//
import com.hikdonate.donate.domain.transaction.dto.DonationDetail;
import com.hikdonate.donate.domain.transaction.dto.DonationSummary;
import com.hikdonate.donate.domain.transaction.service.DonationDetailService;
import com.hikdonate.donate.domain.transaction.service.DonationSummaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/donor")
@Slf4j
//@SessionAttributes("donorSignUpForm")
/*
Class name: DonorController
Summary: 기부자(Donor) 측 Controller
Written by: 양예현
 */
public class DonorController {

    private final DonorSignUpService donorSignUpService;
    private final DonorDetailsService donorDetailsService;
    private final InterestedBeneficiariesService interestedBeneficiariesService;
    private final DonorInfoUpdateService donorInfoUpdateService;
    private final DonationSummaryService donationSummaryService;
    private final DonationDetailService donationDetailService;

    // DonorSignUpForm 가져오기
    @ModelAttribute("donorSignUpForm")
    public DonorSignUpForm donorSignUpForm() {
        return new DonorSignUpForm();
    }

    // DonorLoginForm 가져오기
    @ModelAttribute("donorLoginForm")
    public DonorLoginForm donorLoginForm() {
        return new DonorLoginForm();
    }

    @GetMapping("/check-id-duplicate")
    public ResponseEntity<Boolean> checkDupId(@RequestParam String signupId) {
        boolean isDuplicate = donorSignUpService.isDuplicateId(signupId);
        return ResponseEntity.ok(isDuplicate);
    }

    /*
    Function name: donorSignUpSubmit1
    Summary: /signup1에 대한 POST 요청을 처리하는 엔드포인트 함수
             기부자(donor)의 회원가입 첫 페이지에서 제출된 데이터를 검증하고 처리
    Parameter: 총 2개
        donorSignUpForm; @ModelAttribute로 바인딩된 기부자 회원가입 폼 데이터
        bindingResult: 입력 데이터의 유효성 검사 결과를 담는 객체
    Date: 2024.09.21
    Written by: 양예현
     */
    @PostMapping("/signup/step1")
    public ResponseEntity<String> donorSignUpSubmit1(@Validated(DonorSignUpValidationGroups.SignUpStep1.class)
                                                     @RequestBody DonorSignUpForm donorSignUpForm,
                                                     BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            bindingResult.getAllErrors().forEach(error -> log.error("Validation error: " + error));
            return ResponseEntity.badRequest().body("validation failed");
        }
        return ResponseEntity.ok("Signup step1 success");
    }

    /*
    Function name: donorSignUpSubmit2
    Summary: /signup2에 대한 POST 요청을 처리하는 엔드포인트 함수
             기부자(donor)의 회원가입 두 번째 페이지에서 제출된 데이터를 검증하고 처리
    Parameter: 총 2개
        donorSignUpForm; @ModelAttribute로 바인딩된 기부자 회원가입 폼 데이터
        bindingResult: 입력 데이터의 유효성 검사 결과를 담는 객체
    Date: 2024.09.21
    Written by: 양예현
     */
    @PostMapping("/signup/step2")
    public ResponseEntity<String> donorSignUpSubmit2(@Validated(DonorSignUpValidationGroups.SignUpStep2.class)
                                                     @RequestBody DonorSignUpForm donorSignUpForm,
                                                     BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            bindingResult.getAllErrors().forEach(error -> log.error("Validation error: " + error));
//            System.out.println();
            return ResponseEntity.badRequest().body("validation failed");
        }

        try {
            donorSignUpService.createDonor(donorSignUpForm.getSignupName(), donorSignUpForm.getSignupEmail(), donorSignUpForm.getSignupPhoneNumber(),
                    donorSignUpForm.getSignupNickname(), donorSignUpForm.getSignupId(), donorSignUpForm.getSignupPassword());
            return ResponseEntity.ok("SignUp step2 success");
        } catch (Exception e) {
            log.error("Error during signup step2: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }


    }

    @GetMapping("/myinfo")
    public ResponseEntity<Donor> getDonorInfo() {
        // 현재 인증된 사용자의 정보 가져오기
        Donor donor = donorDetailsService.getDonorInfo();

        return ResponseEntity.ok(donor);
    }

    //
    @PutMapping("/myinfo")
    public ResponseEntity<String> updateDonorInfo(@RequestBody DonorUpdateDto donorUpdateDto) {
        log.info("Received update request for donor: {}", donorUpdateDto);
        try {
            Donor donor = donorInfoUpdateService.updateDonorInfo(
                    donorUpdateDto.getDonorId(),
                    donorUpdateDto.getDonorPassword(),
                    donorUpdateDto.getDonorMail(),
                    donorUpdateDto.getDonorName(),
                    donorUpdateDto.getDonorNickname(),
                    donorUpdateDto.getDonorAge(),
                    donorUpdateDto.getDonorPhonenumber(),
                    donorUpdateDto.getDonorAccount(),
                    donorUpdateDto.getDonorWallet(),
                    donorUpdateDto.getLikedBeneficiaries());
            return ResponseEntity.ok("ok");
        } catch (Exception e) {
            log.error("Donor update error: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }
    //


    @GetMapping("/myinterest")
    public List<BeneficiarySimpleResponse> donor_interests(){
        return interestedBeneficiariesService.getInterestedBeneficiaries();
    }

    /*
    Function name: donorDonationSummaryHistory
    Summary: 현재 로그인한 기부자의 전체 트랜잭션 id에 대한 요약 정보 가져오기
    Parameter: None
    Return: List<DonationSummary>
    Date: 2024.10.22
    Written by: 조현지
    */
    @GetMapping("/myhistory")
    public List<DonationSummary> donorDonationSummaryHistory() {
        Donor donor = donorDetailsService.getDonorInfo();
        String donorWalletAddr = donor.getDonorWallet();
        return donationSummaryService.summaryDonorDonationHistory(donorWalletAddr);
    }

    @GetMapping("/myhistory/{historyId}")
    public List<DonationDetail> donorDonationDetailHistory(@PathVariable String historyId) {
        return donationDetailService.allTransactionDetailHistory(historyId);
    }

}