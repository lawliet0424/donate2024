package com.hikdonate.donate.domain.beneficiary.service;

import com.hikdonate.donate.domain.beneficiary.domain.Beneficiary;
import com.hikdonate.donate.domain.interest.domain.Interest;
import com.hikdonate.donate.domain.tag.domain.TagLink;
import com.hikdonate.donate.domain.tag.dto.tagResponse.TagItem;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ConvertService {

    /*
     Function name: convertToIsInterested
     Summary: Interest 엔티티 정보를 해당 기부자의 관심 등록 여부로 변환
     Parameter: 2개
         Beneficiary beneficiary;
         String current_donor_id;
     Return: 관심 등록 여부
     Caller: BeneficiaryDetailInfoService.getBeneficiaryDetailById
     Date: 2024.10.09
     Written by: 심민서
     */
    public boolean convertToIsInterested(Beneficiary beneficiary, String current_donor_id) {
        Set<Interest> interest_list = beneficiary.getLikedByDonors();
        for (Interest i : interest_list){
            String interested_donor_id = i.getDonor().getDonorId();
            if (Objects.equals(current_donor_id, interested_donor_id)){
                return true;
            }
        }
        return false;
    }


    /*
     Function name: convertToTagItemList
     Summary: TagLinks 엔티티 정보를 수혜자의 태그 정보로 변환
     Parameter: 1개
         Beneficiary beneficiary;
     Return: List<TagItem>
     Caller: getBeneficiaryDetailById
     Date: 2024.10.09
     Written by: 심민서
     */
    public List<TagItem> convertToTagItemList(Beneficiary beneficiary) {
        Set<TagLink> tagLinks = beneficiary.getTagLinks();

        return tagLinks.stream()
                .map(tagLink -> new TagItem(tagLink.getTag().getTagId(), tagLink.getTagName()))
                .collect(Collectors.toList());
    }
}
