import "./Footer.css"; // CSS 파일 임포트

/*
Function name: Footer
Summary: Footer 컴포넌트를 정의하는 함수
Parameter: 총 0개
Return: 총 1개; Footer 컴포넌트 JSX
Caller: App
Date: 2024-09-22
Write by: 길정수
*/

// Footer 컴포넌트 정의
const Footer = () => {
  return (
    <footer className="footer"> {/* footer 태그 사용 */}
      <div className="footer__content"> {/* footer 내용 래핑 */}
        <div>※ 실제 플랫폼이 아닙니다 ※</div> {/* 안내 메시지 */}
        <div>
          이 사이트는 2024년도 홍익대학교 컴퓨터공학과 학생들이 졸업프로젝트를
          목적으로 개발하였습니다. {/* 프로젝트 설명 */}
        </div>
      </div>
    </footer>
  );
};

export default Footer; // Footer 컴포넌트 내보내기
