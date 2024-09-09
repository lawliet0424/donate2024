package com.hikdonate.donate.tag.repository.tagResponse;

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
