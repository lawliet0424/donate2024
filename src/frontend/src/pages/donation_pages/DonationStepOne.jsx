import "./DonationStepOne.css"; // CSS 파일 임포트
import React, { useState, useEffect } from "react"; // React 및 필요한 훅 임포트
import { useNavigate, useLocation } from "react-router-dom"; // React Router의 navigate 및 location 훅 임포트
import DonationStepsBar from "../../components/DonationStepsBar"; // 기부 단계 바 컴포넌트 임포트
import TagBox from "../../components/TagBox"; // 태그 박스 컴포넌트 임포트
import ColoredButton from "../../components/ColoredButton"; // 색상 버튼 컴포넌트 임포트
import useTag from "../../hooks/useTag"; // 태그 훅 임포트

/*
Function name: DonationStepOne
Summary: 기부 첫 번째 단계 페이지 컴포넌트
Parameter: N/A
Return: 총 1개; 기부 첫 번째 단계 페이지 컴포넌트
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
const DonationStepOne = () => {
  const { getTags, getTagCategories, loading, error } = useTag(); // 태그 관련 훅 사용
  const [selectedTags, setSelectedTags] = useState(new Set()); // 선택된 태그 상태
  const [categories, setCategories] = useState({}); // 카테고리 상태

  const navigate = useNavigate(); // navigate 훅 사용
  const location = useLocation(); // 현재 위치 가져오기

  useEffect(() => {
    const initialize = async () => {
      if (location.state?.selectedTags) {
        setSelectedTags(new Set(location.state.selectedTags)); // 이전 단계에서 선택된 태그 설정
      }
      try {
        await getTags(); // 태그 가져오기
        const updatedCategories = await getTagCategories(); // 카테고리 업데이트
        setCategories(updatedCategories); // 카테고리 상태 업데이트
      } catch (err) {
        console.error("Failed to fetch tags:", err); // 태그 가져오기 실패 시 에러 로그
      }
    };
    initialize(); // 초기화 함수 실행
  }, []);

  const handleTagClick = (tagId) => {
    setSelectedTags((prevSelectedTags) => {
      const newSelectedTags = new Set(prevSelectedTags); // 기존 선택된 태그 복사
      if (newSelectedTags.has(tagId)) {
        newSelectedTags.delete(tagId); // 이미 선택된 태그는 삭제
      } else {
        newSelectedTags.add(tagId); // 선택되지 않은 태그는 추가
      }
      return newSelectedTags; // 새로운 선택된 태그 반환
    });
  };

  const onNextButtonClicked = () => {
    navigate("/donation/step2", {
      state: {
        fromFirstStep: true,
        selectedTags: Array.from(selectedTags), // 선택된 태그 배열로 변환
      },
    });
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중 표시
  }

  if (error) {
    return <div>Error loading tags: {error.message}</div>; // 에러 발생 시 메시지 표시
  }

  return (
    <div className="donation-step-one">
      <DonationStepsBar currentStep={1} /> {/* 현재 단계 표시 */}
      <div className="donation-step-one__tags">
        {Object.keys(categories).map((category) => (
          <div key={category} className="donation-step-one__section">
            <div className="donation-step-one__category">{category}</div>{" "}
            {/* 카테고리 제목 */}
            {categories[category].map((tag) => (
              <TagBox
                key={tag.id}
                tagName={tag.name} // 태그 이름
                isTagSelected={selectedTags.has(tag.id)} // 태그 선택 여부
                onTagClick={() => handleTagClick(tag.id)} // 태그 클릭 핸들러
              />
            ))}
          </div>
        ))}
      </div>
      <ColoredButton
        text={"다음"} // 버튼 텍스트
        colorScheme={"orange"} // 버튼 색상
        onClick={onNextButtonClicked} // 다음 단계로 이동 핸들러
        className={"donation-step-one__button"} // 버튼 클래스
      />
    </div>
  );
};

export default DonationStepOne; // DonationStepOne 컴포넌트 내보내기