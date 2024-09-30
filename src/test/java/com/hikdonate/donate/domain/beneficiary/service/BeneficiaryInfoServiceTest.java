package com.hikdonate.donate.domain.beneficiary.service;

import com.hikdonate.donate.domain.beneficiary.domain.Beneficiary;
import com.hikdonate.donate.domain.beneficiary.repository.BeneficiaryRepository;
import com.hikdonate.donate.domain.tag.domain.Tag;
import com.hikdonate.donate.domain.tag.domain.TagLink;
import com.hikdonate.donate.domain.tag.dto.TaggedBeneficiaryContainer;
import com.hikdonate.donate.domain.tag.dto.tagResponse.TagItem;
import com.hikdonate.donate.domain.tag.repository.TagLinkRepository;
import com.hikdonate.donate.domain.tag.repository.TagRepository;
import com.hikdonate.donate.domain.transaction.repository.TransactionHistoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BeneficiaryInfoServiceTest {

    @Mock
    private TransactionHistoryRepository transactionHistoryRepository;

    @Mock
    private BeneficiaryRepository beneficiaryRepository;

    @Mock
    private TagLinkRepository tagLinkRepository;

    @InjectMocks
    private BeneficiaryInfoService beneficiaryInfoService;

    private List<Beneficiary> mockBeneficiaries;
    private List<TagLink> mockTagLinks;

    @BeforeEach
    void setUp() {
        // 가짜 수혜자와 태그 링크 설정
        Beneficiary beneficiary1 = new Beneficiary();
        beneficiary1.setBeneficiaryWallet("wallet1");

        Beneficiary beneficiary2 = new Beneficiary();
        beneficiary2.setBeneficiaryWallet("wallet2");

        mockBeneficiaries = Arrays.asList(beneficiary1, beneficiary2);

// Tag 엔티티 생성
        Tag tag1 = new Tag();
        tag1.setTagId(1L);
        tag1.setTagName("Tag1");

        Tag tag2 = new Tag();
        tag2.setTagId(2L);
        tag2.setTagName("Tag2");

// TagLink 엔티티에 Tag 설정
        TagLink tagLink1 = new TagLink();
        tagLink1.setTag(tag1); // Tag 객체를 직접 설정

        TagLink tagLink2 = new TagLink();
        tagLink2.setTag(tag2); // Tag 객체를 직접 설정

        mockTagLinks = Arrays.asList(tagLink1, tagLink2);
    }

    @Test
    void testSelectedBeneficiariesList() {
        // 태그 ID 리스트
        List<Long> tagIds = Arrays.asList(1L, 2L);

        // tagLinkRepository에서 반환할 수혜자 리스트 설정
        when(tagLinkRepository.findBeneficiariesByTagIds(anyList())).thenReturn(mockBeneficiaries);

        // transactionHistoryRepository에서 반환할 상위 수혜자 지갑 주소 리스트 설정
        when(transactionHistoryRepository.findTopBeneficiariesWalletAddressByDonation(anyList(), anyString(), anyInt()))
                .thenReturn(Collections.singletonList("wallet1"));

        // beneficiaryRepository에서 반환할 수혜자 설정
        when(beneficiaryRepository.findByBeneficiaryWallet(anyString()))
                .thenReturn(mockBeneficiaries.get(0));

        // tagLinkRepository에서 반환할 TagLink 리스트 설정
        when(tagLinkRepository.findByBeneficiary(mockBeneficiaries.get(0)))
                .thenReturn(mockTagLinks);

        // 서비스 메소드 호출
        List<TaggedBeneficiaryContainer> result = beneficiaryInfoService.selectedBeneficiariesList(tagIds, 1);

        // 결과 검증
        assertEquals(1, result.size());
        assertEquals("wallet1", result.get(0).getBeneficiary().getBeneficiaryWallet());
    }

    @Test
    void testCalculateRecentTwoWeeks() {
        // 2주 전 시간 계산 메소드 호출
        String recentTwoWeeks = beneficiaryInfoService.calculateRecentTwoWeeks();

        // 결과가 null이 아님을 확인
        assertEquals(true, recentTwoWeeks != null && !recentTwoWeeks.isEmpty());
    }
}