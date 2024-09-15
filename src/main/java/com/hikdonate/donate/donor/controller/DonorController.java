package com.hikdonate.donate.donor.controller;

import com.hikdonate.donate.donor.service.DonorSignUpService;
import com.hikdonate.donate.donor.Donor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/donor")
public class DonorController {

    private final DonorSignUpService donorSignUpService;

    @GetMapping("/signup")
    public String donorSignUp(@ModelAttribute("donor") Donor donor) {
        return  "donor/donor_signup_form1";
    }
}
