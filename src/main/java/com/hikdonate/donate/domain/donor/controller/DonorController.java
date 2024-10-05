package com.hikdonate.donate.domain.donor.controller;

import com.hikdonate.donate.domain.donor.domain.Donor;
import com.hikdonate.donate.domain.donor.dto.DonorLoginForm;
import com.hikdonate.donate.domain.donor.dto.DonorSignUpForm;
import com.hikdonate.donate.domain.donor.dto.DonorSignUpValidationGroups;
import com.hikdonate.donate.domain.donor.service.DonorDetailsService;
import com.hikdonate.donate.domain.donor.service.DonorSignUpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

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

    /*
    Function name: donorSignUpForm1
    Summary: /signup1에 대한 GET 요청을 처리하는 엔드포인트 함수로
             기부자(donor)가 회원가입하기 위한 첫 페이지를 제공
    Parameter: 총 1개
        Model model; view에 데이터를 전달하기 위한 변수
    Date: 2024.09.21
    Written by: 양예현
     */
//    @GetMapping("/signup1")
//    public String donorSignUpForm1(Model model) {
//        if(!model.containsAttribute("donorSignUpForm")){
//            model.addAttribute("donorSignUpForm", new DonorSignUpForm());
//        }
//        return "signup/donor_signup_form1";
//    }

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
    @PostMapping("/signup1")
    public ResponseEntity<String> donorSignUpSubmit1(@Validated(DonorSignUpValidationGroups.SignUpStep1.class)
                                                     @RequestBody DonorSignUpForm donorSignUpForm,
                                                     BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("validation failed");
        }
        return ResponseEntity.ok("Singup step1 success");
    }

    /*
    Function name: donorSignUpForm2
    Summary: /signup2에 대한 GET 요청을 처리하는 엔드포인트 함수
             기부자(donor)가 회원가입하기 위한 두 번째 페이지를 제공
    Parameter: 총 2개
        model; view에 데이터를 전달하기 위한 객체
        donorSignUpForm; 기부자 회원가입 폼 데이터를 @ModelAttribute로 바인딩하여 전달
    Date: 2024.09.21
    Written by: 양예현
     */
//    @GetMapping("/signup2")
//    public String donorSignUpForm2(Model model, @ModelAttribute("donorSignUpForm") DonorSignUpForm donorSignUpForm) {
//        return "signup/donor_signup_form2";
//    }

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
    @PostMapping("/signup2")
    public ResponseEntity<String> donorSignUpSubmit2(@Validated(DonorSignUpValidationGroups.SignUpStep2.class)
                                                     @RequestBody DonorSignUpForm donorSignUpForm,
                                                     BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            bindingResult.getAllErrors().forEach(error -> log.error("Validation error: " + error));
            return ResponseEntity.badRequest().body("validation failed");
        }
        // 아직 아이디 중복 처리 기능을 구현하지 않아서 동일 아이디로 가입을 하면 update 되는 방식으로 작동함
        donorSignUpService.createDonor(donorSignUpForm.getDonorName(), donorSignUpForm.getDonorMail(), donorSignUpForm.getDonorPhoneNumber(),
                donorSignUpForm.getDonorNickname(), donorSignUpForm.getDonorId(), donorSignUpForm.getDonorPassword());
        return ResponseEntity.ok("SignUp step2 success");
    }

    @GetMapping("/myinfo")
    public ResponseEntity<Donor> getDonorInfo() {
        // 현재 인증된 사용자의 정보 가져오기
        Donor donor = donorDetailsService.getDonorInfo();

        return ResponseEntity.ok(donor);
    }

}