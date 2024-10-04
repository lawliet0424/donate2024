package com.hikdonate.donate.domain.tag.repository;

import com.hikdonate.donate.domain.tag.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    // 다중 태그 ID 목록 처리
    List<Tag> findAllById(Iterable<Long> ids);
}