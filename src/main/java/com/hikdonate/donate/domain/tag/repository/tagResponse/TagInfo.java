package com.hikdonate.donate.domain.tag.repository.tagResponse;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class TagInfo {
    private String tagClass;
    private List<TagItem> tagLists;
}