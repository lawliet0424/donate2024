package com.hikdonate.donate.domain.tag.dto.tagResponse;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TagItem {
    private Long id;
    private String name;

    public TagItem(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
