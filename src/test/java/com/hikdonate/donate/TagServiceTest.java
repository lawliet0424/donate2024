//package com.hikdonate.donate;
//
//import com.hikdonate.donate.tag.Tag;
//import com.hikdonate.donate.tag.repository.TagRepository;
//import com.hikdonate.donate.tag.repository.tagResponse.TagInfo;
//import com.hikdonate.donate.tag.repository.tagResponse.TagItem;
//import com.hikdonate.donate.tag.repository.tagResponse.TagResponse;
//import com.hikdonate.donate.tag.service.TagService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.util.Arrays;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.mockito.Mockito.when;
//
//class TagServiceTest {
//
//    @Mock
//    private TagRepository tagRepository;
//
//    @InjectMocks
//    private TagService tagService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this); // Mockito 초기화
//    }
//
//    @Test
//    void testValidateTags() {
//        // Given: 태그 ID 목록
//        List<Long> tagIds = Arrays.asList(1L, 2L);
//
//        // Mock: 해당 태그가 존재한다고 가정
//        Tag tag1 = new Tag();
//        tag1.setTagId(1L);
//        tag1.setTagName("Tag 1");
//
//        Tag tag2 = new Tag();
//        tag2.setTagId(2L);
//        tag2.setTagName("Tag 2");
//
//        when(tagRepository.findAllById(tagIds)).thenReturn(Arrays.asList(tag1, tag2));
//
//        // When: 태그 검증 실행
//        tagService.validateTags(tagIds);
//
//        // Then: 태그가 정상적으로 반환되었는지 검증
//        assertThat(tagRepository.findAllById(tagIds)).hasSize(2);
//    }
//
//    @Test
//    void testGetTagsByIds() {
//        // Given: 태그 ID 목록
//        List<Long> tagIds = Arrays.asList(1L, 2L);
//
//        // Mock: 해당 태그가 존재한다고 가정
//        Tag tag1 = new Tag();
//        tag1.setTagId(1L);
//        tag1.setTagName("Tag 1");
//
//        Tag tag2 = new Tag();
//        tag2.setTagId(2L);
//        tag2.setTagName("Tag 2");
//
//        when(tagRepository.findAllById(tagIds)).thenReturn(Arrays.asList(tag1, tag2));
//
//        // When: 태그 ID로 태그들을 가져옴
//        List<Tag> result = tagService.getTagsByIds(tagIds);
//
//        // Then: 반환된 태그 검증
//        assertThat(result).hasSize(2);
//        assertThat(result.get(0).getTagName()).isEqualTo("Tag 1");
//        assertThat(result.get(1).getTagName()).isEqualTo("Tag 2");
//    }
//
//    @Test
//    void testGetAllTags() {
//        // Given: 여러 개의 태그가 존재한다고 가정
//        Tag tag1 = new Tag();
//        tag1.setTagId(1L);
//        tag1.setTagName("Tag 1");
//        tag1.setTagClassification("Class 1");
//
//        Tag tag2 = new Tag();
//        tag2.setTagId(2L);
//        tag2.setTagName("Tag 2");
//        tag2.setTagClassification("Class 1");
//
//        Tag tag3 = new Tag();
//        tag3.setTagId(3L);
//        tag3.setTagName("Tag 3");
//        tag3.setTagClassification("Class 2");
//
//        when(tagRepository.findAll()).thenReturn(Arrays.asList(tag1, tag2, tag3));
//
//        // When: 모든 태그들을 가져옴
//        TagResponse result = tagService.getAllTags();
//
//        // Then: 반환된 TagResponse 검증
//        assertThat(result).isNotNull();
//        assertThat(result.getTagInfo()).hasSize(2); // Class 1, Class 2 두 개의 분류가 있음
//
//        // Class 1에 태그가 2개 있는지 확인
//        Map<String, List<TagItem>> groupedTags = result.getTagInfo().stream()
//                .collect(Collectors.toMap(TagInfo::getTagClass, TagInfo::getTagLists));
//
//        assertThat(groupedTags.get("Class 1")).hasSize(2);
//        assertThat(groupedTags.get("Class 2")).hasSize(1);
//    }
//}
