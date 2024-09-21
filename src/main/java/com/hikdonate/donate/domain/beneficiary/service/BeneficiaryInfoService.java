package com.hikdonate.donate.domain.beneficiary.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BeneficiaryInfoService {
//
//    private final BeneficiaryRepository beneficiaryRepository;
//    private final DonationRepository donationRepository;
//    private final TagLinkRepository tagLinkRepository;
//
//    // 선택된 태그에 해당되는 인원수만큼의 수혜자 정보 가져오기
//    public List<TaggedBeneficiaryContainer> getBeneficiariesByTags(TagBasedSuggestionRequest request) {
//        // 최근 2주간의 날짜 계산
//        LocalDateTime twoWeeksAgo = LocalDateTime.now().minusWeeks(2);
//
//        // 태그에 해당하는 수혜자들 필터링
//        List<Beneficiary> beneficiaries = beneficiaryRepository.findByTags(request.getTagIds());
//
//        // 기부 금액을 기준으로 정렬하기 위한 임시 리스트
//        List<BeneficiaryWithDonation> beneficiariesWithDonations = beneficiaries.stream()
//                .map(beneficiary -> {
//                    // 최근 2주간 수혜자가 받은 기부 금액을 계산
//                    Long totalDonations = donationRepository.sumDonationsByBeneficiaryAndDate(beneficiary.getId(), twoWeeksAgo);
//                    return new BeneficiaryWithDonation(beneficiary, totalDonations);
//                })
//                .sorted(Comparator.comparingLong(BeneficiaryWithDonation::getTotalDonations))  // 기부 금액 적은 순으로 정렬
//                .limit(request.getNumberOfBeneficiaries())  // 요청받은 인원수만큼 제한
//                .collect(Collectors.toList());  // 리스트로 수집
//
//        // 기부 금액 정보를 제거한 후 DTO로 변환
//        List<TaggedBeneficiaryContainer> sortedBeneficiaries = beneficiariesWithDonations.stream()
//                .map(bwd -> {
//                    List<TagResponse> tagResponses = bwd.getBeneficiary().getTags().stream()
//                            .map(tag -> new TagResponse(tag.getTagId(), tag.getName()))
//                            .collect(Collectors.toList());
//                    return new TaggedBeneficiaryContainer(bwd.getBeneficiary(), tagResponses);
//                })
//                .collect(Collectors.toList());  // 리스트로 수집
//
//        return sortedBeneficiaries;
//    }
}