import "./MyPage.css";
import MyPageMenuBox from "../../components/MyPageMenuBox";
import profileImage from "../../assets/basicProfile.png";

const MyPage = () => {
  return (
    <div className="MyPage">
      <div className="title">마이페이지</div>
      <div className="MyPageContent">
        <div className="userInfo">
          <img className="myProfileImage" src={profileImage} alt="Profile" />
          <div className="nickname">닉네임</div>
        </div>

        <MyPageMenuBox menuName={"회원정보"} myPageType={"/myinfo"} />
        <MyPageMenuBox
          menuName={"나의 관심 수혜자"}
          myPageType={"/myinterest"}
        />
        <MyPageMenuBox menuName={"나의 기부 현황"} myPageType={"/mystatus"} />
      </div>
    </div>
  );
};

export default MyPage;
