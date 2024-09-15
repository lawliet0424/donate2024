package com.hikdonate.donate.tag.service;

import com.hikdonate.donate.tag.Tag;
import com.hikdonate.donate.tag.repository.TagRepository;
import com.hikdonate.donate.tag.repository.tagResponse.TagInfo;
import com.hikdonate.donate.tag.repository.tagResponse.TagItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    public List<Tag> getTagsByIds(List<Long> tagIds) {
        return tagRepository.findAllById(tagIds);
    }

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
