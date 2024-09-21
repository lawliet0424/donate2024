package com.hikdonate.donate.domain.tag.service;

import com.hikdonate.donate.domain.tag.domain.Tag;
import com.hikdonate.donate.domain.tag.repository.TagRepository;
import com.hikdonate.donate.domain.tag.dto.tagResponse.TagInfo;
import com.hikdonate.donate.domain.tag.dto.tagResponse.TagItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


/*
Class name: TagService
Summary: 태그 검증 및 조회
Date: 2024.09.10
Written by: 심민서
 */
@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;

    public void validateTags(List<Long> tagIds) /*throws CustomException*/ {
        if (tagIds == null || tagIds.isEmpty()) {
//            throw new CustomException("No tags selected.");
            //****************
            // 태그가 DB에 존재하는지 확인하는 검증 로직 추가하기
            //****************
        }

        assert tagIds != null;
        List<Tag> tags = tagRepository.findAllById(tagIds);
        if (tags.size() != tagIds.size()) {
//            throw new CustomException("Some tags are invalid.");
        }
    }


    /*
    Function name: getTagsByIds
    Summary: 태그 아이디로 태그 조회
    Parameter: 총 1개;
            List<Long> tagIds; 조회할 태그 아이디 목록
    Return: 총 1개; 태그
    Caller: 없음
    Date: 2024.9.10
    Write by: 심민서
    */
    public List<Tag> getTagsByIds(List<Long> tagIds) {
        return tagRepository.findAllById(tagIds);
    }


    /*
    Function name: getAllTags
    Summary: 프론트엔드 step1을 위한 태그&카테고리 모두 반환 함수
    Parameter: 없음
    Return: 총 1개; 현재 존재하는 태그 정보 리스트를 카테고리 별로 그룹화하여 반환
    Caller: DonationListUpController
    Date: 2024.9.10
    Write by: 심민서
    */
    public List<TagInfo> getAllTags() {
        List<Tag> tags = tagRepository.findAll();

        Map<String, List<TagItem>> groupedTags = tags.stream()
                .collect(Collectors.groupingBy(
                        Tag::getTagClassification,
                        Collectors.mapping(tag -> new TagItem(tag.getTagId(), tag.getTagName()), Collectors.toList())
                ));

        List<TagInfo> tagInfos = groupedTags.entrySet().stream()
                .map(entry -> {
                    TagInfo tagInfo = new TagInfo();
                    tagInfo.setTagClass(entry.getKey());
                    tagInfo.setTagLists(entry.getValue());
                    return tagInfo;
                })
                .collect(Collectors.toList());

        return tagInfos;
    }
}
