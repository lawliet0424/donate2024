import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { authAxios } from './AuthContext';

// 태그 관련 컨텍스트 생성
export const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]); // 태그 리스트
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태

  /*
    Function name: getTags
    Summary: 서버에서 태그 리스트를 요청하고 상태를 업데이트하는 비동기 함수
    Return: 없음
  */
  const getTags = async () => {
    setLoading(true); // 로딩 시작
    setError(null);  // 에러 초기화
    try {
      // 서버로부터 태그 리스트 요청
      const response = await authAxios.get("/api/donation/step1", { withCredentials: false });
      setTags(response.data); // 태그 상태 업데이트
    } catch (err) {
      console.error("태그 데이터를 가져오는 중 오류 발생:", err);
      setError(err); // 오류 상태 업데이트
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 컴포넌트가 마운트될 때 태그 데이터를 가져옴
  useEffect(() => {
    getTags();
  }, []);

  /*
    Function name: getTagCategories
    Summary: 태그 리스트를 카테고리별로 정리하여 반환하는 함수
    Return: 카테고리별 태그 리스트 객체; 태그가 없으면 빈 객체 반환
  */
  const getTagCategories = () => {
    if (!tags.length) return {}; // 태그가 없을 경우 빈 객체 반환
    return tags.reduce((acc, tag) => {
      acc[tag.tagClass] = tag.tagLists.map((tagItem) => ({
        id: tagItem.id, // 태그 ID
        name: tagItem.name, // 태그 이름
      }));
      return acc; // 누적 객체 반환
    }, {});
  };

  return (
    <TagContext.Provider
      value={{ tags, getTags, getTagCategories, loading, error }} // 제공할 값
    >
      {children} {/* 자식 컴포넌트를 렌더링 */}
    </TagContext.Provider>
  );
};
