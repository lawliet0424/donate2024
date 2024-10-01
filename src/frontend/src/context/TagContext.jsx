import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// 태그 관련 컨텍스트 생성
export const TagContext = createContext();

/*
  Function name: TagProvider
  Summary: 태그 데이터를 관리하고 제공하는 컨텍스트 프로바이더
  Parameter: 총 1개
             node children; 자식 컴포넌트를 포함하는 JSX 요소
  Return: 총 1개; 태그 데이터를 제공하는 JSX Provider 컴포넌트
  Date: 2024.09.21
  Write by: 길정수
*/
export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]); // 태그 리스트
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태

  /*
    Function name: getTags
    Summary: 서버에서 태그 리스트를 요청하고 상태를 업데이트하는 비동기 함수
    Return: 없음
  */
  const getTags = () => {
    setLoading(true); // 로딩 시작
   axios
   .get("/api/donation/step1", { withCredentials: false })
   .then((response) => { // 서버에서 태그 요청
      setTags(response.data); // 태그 상태 업데이트
    } )
    .catch ((err) => {
      setError(err); // 오류 발생 시 상태 업데이트
      console.log(err);
      })
      .finally(()=>{
      setLoading(false); // 로딩 종료
    });
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
