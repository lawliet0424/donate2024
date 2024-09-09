package com.hikdonate.donate.tag.repository;

import com.hikdonate.donate.tag.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    // 다중 태그 ID 목록 처리
    List<Tag> findAllById(Iterable<Long> ids);
}