import { useContext } from "react";
import { TagContext } from "../context/TagContext";

// 태그 관련 정보를 제공하는 커스텀 훅
const useTag = () => {
  // TagContext에서 태그 관련 상태 및 함수 가져오기
  const {
    tags, // 모든 태그 목록
    getTags, // 태그를 가져오는 함수
    getTagCategories, // 태그 카테고리를 가져오는 함수
    loading, // 로딩 상태
    error, // 에러 상태
  } = useContext(TagContext); // TagContext 사용

  // 필요한 값들을 반환
  return {
    tags,
    getTags,
    getTagCategories,
    loading,
    error,
  };
};

export default useTag; // 훅 내보내기
