import React, { useState } from "react";
import "./MyInfo.css";
import profileImage from "../../assets/basicProfile.png";

const MyInfo = () => {
  const [image, setImage] = useState(profileImage);

  // 상태 관리
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingSubInfo, setIsEditingSubInfo] = useState(false);

  const [profileInfo, setProfileInfo] = useState({
    nickname: "닉네임",
    age: "", // 나이 기본값 비워둠
    financialAccount: "", // 금융계좌 기본값 비워둠
    walletAddress: "https://www.naver.com", // 지갑주소 추가
    walletAddressText: "네이버", // 하이퍼링크 텍스트 추가
  });

  const [subInfo, setSubInfo] = useState({
    name: "이름",
    phone: "전화번호",
    email: "메일",
    id: "아이디",
    password: "비밀번호",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (isEditingProfile) {
      document.getElementById("fileInput").click();
    }
  };

  const handleEditProfileClick = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  const handleEditSubInfoClick = () => {
    setIsEditingSubInfo(!isEditingSubInfo);
  };

  const handleInputChange = (e, section, field) => {
    const { value } = e.target;
    if (section === "profile") {
      setProfileInfo({ ...profileInfo, [field]: value });
    } else {
      setSubInfo({ ...subInfo, [field]: value });
    }
  };

  return (
    <div className="MyInfo">
      <div className="title">회원 정보</div>

      <div className="myProfileInfo">
        <div className="myProfileInfoTitle">
          프로필
          <button onClick={handleEditProfileClick}>
            {isEditingProfile ? "저장" : "수정"}
          </button>
        </div>
        <div className="myProfileInfoImg">
          <div>이미지</div>
          <img
            className="myProfileImage"
            src={image}
            alt="Profile"
            onClick={handleImageClick}
          />
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
        <div
          className={`myProfileInfoContent ${
            isEditingProfile ? "editing" : ""
          }`}
        >
          <div className="myProfileInfoLeft">
            <div>닉네임</div>
            <div>나이</div>
            <div>금융계좌</div>
            <div>지갑주소</div>
          </div>
          <div className="myProfileInfoRight">
            {isEditingProfile ? (
              <>
                <input
                  type="text"
                  value={profileInfo.nickname}
                  onChange={(e) => handleInputChange(e, "profile", "nickname")}
                />
                <input
                  type="text"
                  placeholder="나이를 입력하세요"
                  value={profileInfo.age}
                  onChange={(e) => handleInputChange(e, "profile", "age")}
                />
                <input
                  type="text"
                  placeholder="금융계좌를 입력하세요"
                  value={profileInfo.financialAccount}
                  onChange={(e) =>
                    handleInputChange(e, "profile", "financialAccount")
                  }
                />
                <div>
                  <a
                    href={profileInfo.walletAddress}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profileInfo.walletAddressText}
                  </a>
                </div>
              </>
            ) : (
              <>
                <div>{profileInfo.nickname}</div>
                <div className={profileInfo.age ? "" : "default-text"}>
                  {profileInfo.age || "(선택) 나이를 입력하세요"}
                </div>
                <div
                  className={profileInfo.financialAccount ? "" : "default-text"}
                >
                  {profileInfo.financialAccount ||
                    "(선택) 금융 계좌를 입력하세요"}
                </div>
                <div>
                  <a
                    href={profileInfo.walletAddress}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profileInfo.walletAddressText}
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mySubInfo">
        <div className="mySubInfoTitle">
          가입 정보
          <button onClick={handleEditSubInfoClick}>
            {isEditingSubInfo ? "저장" : "수정"}
          </button>
        </div>
        <div
          className={`mySubInfoContent ${isEditingSubInfo ? "editing" : ""}`}
        >
          <div className="mySubInfoLeft">
            <div>아이디</div>
            <div>비밀번호</div>
            <div>이름</div>
            <div>전화번호</div>
            <div>메일</div>
          </div>
          <div className="mySubInfoRight">
            {isEditingSubInfo ? (
              <>
                <input
                  type="text"
                  value={subInfo.id}
                  onChange={(e) => handleInputChange(e, "sub", "id")}
                />
                <input
                  type="password"
                  value={subInfo.password}
                  onChange={(e) => handleInputChange(e, "sub", "password")}
                />
                <input
                  type="text"
                  value={subInfo.name}
                  onChange={(e) => handleInputChange(e, "sub", "name")}
                />
                <input
                  type="text"
                  value={subInfo.phone}
                  onChange={(e) => handleInputChange(e, "sub", "phone")}
                />
                <input
                  type="text"
                  value={subInfo.email}
                  onChange={(e) => handleInputChange(e, "sub", "email")}
                />
              </>
            ) : (
              <>
                <div>{subInfo.id}</div>
                <div>******</div>
                <div>{subInfo.name}</div>
                <div>{subInfo.phone}</div>
                <div>{subInfo.email}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
