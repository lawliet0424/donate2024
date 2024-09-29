package com.hikdonate.donate.domain.tag.repository;

import com.hikdonate.donate.domain.beneficiary.domain.Beneficiary;
import com.hikdonate.donate.domain.beneficiary.repository.BeneficiaryRepository;
import com.hikdonate.donate.domain.tag.domain.Tag;
import com.hikdonate.donate.domain.tag.domain.TagLink;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;


@DataJpaTest
class TagLinkRepositoryTest {

    @Autowired
    private TagLinkRepository tagLinkRepository;
    @Autowired
    private BeneficiaryRepository beneficiaryRepository;
    @Autowired
    private TagRepository tagRepository;

    private Beneficiary beneficiary;
    private Tag tag;

    @BeforeEach
    void setUp() {


        // 수혜자와 태그를 초기화하여 데이터베이스에 저장
        beneficiary = new Beneficiary();
        beneficiary.setBeneficiaryName("John Doe");
        beneficiary.setBeneficiaryNickname("Johnny");
        beneficiary.setBeneficiaryAge(30);
        beneficiary.setBeneficiaryGender("Male");
        beneficiary.setBeneficiaryAccount("account1");
        beneficiary.setBeneficiaryWallet("wallet1");

        // 데이터베이스에 수혜자 저장
        beneficiary = beneficiaryRepository.save(beneficiary);

        tag = new Tag();
        tag.setTagName("test_tag_name");
        tag.setTagClassification("test_tag_class");

        // 데이터베이스에 태그 저장
        tag = tagRepository.save(tag);

        // TagLink 생성 및 저장
        TagLink tagLink = new TagLink(beneficiary, tag, "Johnny", "test_tag_name", "test_tag_class");
        tagLinkRepository.save(tagLink);
    }

    @Test
    void testFindByBeneficiary() {
        List<TagLink> tagLinks = tagLinkRepository.findByBeneficiary(beneficiary);
        assertThat(tagLinks).isNotEmpty();
        assertThat(tagLinks.get(0).getBeneficiary()).isEqualTo(beneficiary);
    }

    @Test
    void testFindBeneficiariesByTagIds() {
        List<Beneficiary> beneficiaries = tagLinkRepository.findBeneficiariesByTagIds(List.of(tag.getTagId()));
        assertThat(beneficiaries).isNotEmpty();
        assertThat(beneficiaries.get(0)).isEqualTo(beneficiary);
    }
}