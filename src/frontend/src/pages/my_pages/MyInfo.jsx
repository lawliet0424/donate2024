import React, { useState, useEffect } from "react";
import defaultProfileImage from "../../assets/defaultProfile.png";
import "./MyInfo.css";
import {
  formatPhoneNumber,
  validateName,
  validateEmail,
  validatePhoneNumber,
  validateNickname,
  validatePassword,
  validateAge,
  validateFinancialAccount,
} from "../../utils/FormatValidate";
import useAuth from "../../hooks/useAuth";

/*
Function name: MyInfo
Summary: 사용자의 정보를 표시하는 컴포넌트
Parameter: 총 0개
Return: 총 1개; MyInfo 컴포넌트
Caller: React 애플리케이션의 렌더링 과정
Date: 2024-09-22
Write by: 길정수 
*/

const MyInfo = () => {
  const { user, getUserInfo, updateUserInfo } = useAuth();
  const [image, setImage] = useState(defaultProfileImage); // 프로필 이미지 상태
  const [isEditingProfile, setIsEditingProfile] = useState(false); // 프로필 편집 상태
  const [isEditingSubInfo, setIsEditingSubInfo] = useState(false); // 가입 정보 편집 상태

  // 프로필 데이터 초기화
  const [profileData, setProfileData] = useState({
    donorNickname: user.donorNickname,
    donorAge: user.donorAge || null,
    donorAccount: user.donorAccount || "",
    walletAddressLink: `https://www.etherscan.io/address/${user.donorWallet}`,
    donorWallet: user.donorWallet,
  });

  // 가입 정보 데이터 초기화
  const [subInfo, setSubInfo] = useState({
    donorId: user.donorId,
    donorPassword: user.donorPassword,
    donorName: user.donorName,
    donorPhonenumber: formatPhoneNumber(user.donorPhonenumber || ""),
    donorMail: user.donorMail,
  });

  // 에러 메시지 상태
  const [profileErrors, setProfileErrors] = useState({
    donorNickname: "",
    donorAge: "",
    donorAccount: "",
  });

  const [subInfoErrors, setSubInfoErrors] = useState({
    donorPassword: "",
    donorName: "",
    donorPhonenumber: "",
    donorMail: "",
  });

  useEffect(() => {
    const initialize = async () => {
      try {
        await getUserInfo(); // 사용자 정보 가져오기
        console.log("user:", user);
      } catch (err) {
        console.error("Failed to fetch user info:", err); // 사용자 정보 가져오기 실패 시 에러 로그
      }
    initialize(); // 초기화 함수 실행
  }}, []);

  useEffect(() => {
    // 사용자 정보 업데이트 시, 상태를 최신화
    setProfileData({
      donorNickname: user.donorNickname,
      donorAge: user.donorAge || null,
      donorAccount: user.donorAccount || "",
      walletAddressLink: `https://www.etherscan.io/address/${user.donorWallet}`,
      donorWallet: user.donorWallet,
    });
    setSubInfo({
      donorId: user.donorId,
      donorPassword: user.donorPassword,
      donorName: user.donorName,
      donorPhonenumber: formatPhoneNumber(user.donorPhonenumber || ""),
      donorMail: user.donorMail,
    });
  }, [user]);

  // 프로필 데이터 유효성 검사
  const validateProfileData = (data) => {
    let errors = {
      donorNickname: validateNickname(data.donorNickname),
      donorAge: validateAge(data.donorAge),
      donorAccount: validateFinancialAccount(
        data.donorAccount
      ),
    };
    return errors;
  };

  // 가입 정보 유효성 검사
  const validateSubInfo = (data) => {
    let errors = {
      donorPassword: validatePassword(data.donorPassword),
      donorName: validateName(data.donorName),
      donorPhonenumber: validatePhoneNumber(data.donorPhonenumber),
      donorMail: validateEmail(data.donorMail),
    };
    return errors;
  };

  // 프로필 이미지 변경 핸들러
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
//         updateUserInfo({ profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // 입력 값 처리
  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section === "profile") {
      setProfileData((prev) => {
        const newProfileData = { ...prev, [name]: value };
        setProfileErrors(validateProfileData(newProfileData));
        return newProfileData;
      });
    } else if (section === "sub") {
      const formattedValue =
        name === "phone" ? formatPhoneNumber(value) : value;
      setSubInfo((prev) => {
        const newSubInfo = { ...prev, [name]: formattedValue };
        setSubInfoErrors(validateSubInfo(newSubInfo));
        return newSubInfo;
      });
    }
  };

  // 저장 버튼 클릭 시 유효성 검사 후 업데이트
  const handleSaveClick = (section) => {
    if (section === "profile") {
      const errors = validateProfileData(profileData);
      if (!Object.values(errors).some((error) => error)) {
        updateUserInfo(profileData);
        setIsEditingProfile(false);
      } else {
        setProfileErrors(errors);
      }
    } else if (section === "sub") {
      const errors = validateSubInfo(subInfo);
      if (!Object.values(errors).some((error) => error)) {
        updateUserInfo(subInfo);
        setIsEditingSubInfo(false);
      } else {
        setSubInfoErrors(errors);
      }
    }
  };

  // 수정 버튼 클릭 시 편집 모드로 전환
  const handleEditClick = (section) => {
    if (section === "profile") {
      setIsEditingProfile(true);
    } else if (section === "sub") {
      setIsEditingSubInfo(true);
    }
  };

  return (
    <div className="my-info">
      <div className="my-info__title">회원 정보</div>

      <div className="my-info__profile">
        <div className="my-info__title--sub">
          프로필
          <button
            className="my-info__button"
            onClick={() =>
              isEditingProfile
                ? handleSaveClick("profile")
                : handleEditClick("profile")
            }
          >
            {isEditingProfile ? "저장" : "수정"}
          </button>
        </div>
        <div className="my-info__content">
          <div className="my-info__text">
            <div className="my-info__line">
              <div className="my-info__line--left">이미지</div>
              <div className="my-info__line--right">
                {isEditingProfile ? (
                  <>
                    <img
                      className="my-info__profile--img"
                      src={image}
                      alt="Profile"
                      onClick={() =>
                        isEditingProfile &&
                        document.getElementById("my-info__input--file").click()
                      }
                    />
                    <input
                      id="my-info__input--file"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </>
                ) : (
                  <img
                    className="my-info__profile--img"
                    src={image}
                    alt="Profile"
                  />
                )}
              </div>
            </div>

            {/* 닉네임 */}
            <div className="my-info__line">
              <div className="my-info__line--left">닉네임</div>
              <div className="my-info__line--right">
                {isEditingProfile ? (
                  <>
                    <input
                      type="text"
                      name="donorNickname"
                      value={profileData.donorNickname}
                      onChange={(e) => handleInputChange(e, "profile")}
                      className={
                        profileErrors.donorNickname
                          ? "my-info__input--invalid"
                          : "my-info__input"
                      }
                    />
                    {profileErrors.donorNickname && (
                      <div className="my-info__message--error">
                        {profileErrors.donorNickname}
                      </div>
                    )}
                  </>
                ) : (
                  <div>{profileData.donorNickname}</div>
                )}
              </div>
            </div>

            {/* 나이 */}
            <div className="my-info__line">
              <div className="my-info__line--left">나이</div>
              <div className="my-info__line--right">
                {isEditingProfile ? (
                  <>
                    <input
                      type="number"
                      name="donorAge"
                      placeholder="나이를 입력하세요"
                      value={profileData.donorAge}
                      onChange={(e) => handleInputChange(e, "profile")}
                      className={
                        profileErrors.donorAge
                          ? "my-info__input--invalid"
                          : "my-info__input"
                      }
                    />
                    {profileErrors.donorAge && (
                      <div className="my-info__message--error">
                        {profileErrors.donorAge}
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <div
                      className={
                        profileData.donorAge ? "" : "my-info__text--default"
                      }
                    >
                      {profileData.donorAge || "(선택) 나이를 입력하세요"}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 금융 계좌 */}
            <div className="my-info__line">
              <div className="my-info__line--left">금융계좌</div>
              <div className="my-info__line--right">
                {isEditingProfile ? (
                  <>
                    <input
                      type="text"
                      name="donorAccount"
                      placeholder="금융 계좌를 입력하세요"
                      value={profileData.donorAccount}
                      onChange={(e) => handleInputChange(e, "profile")}
                      className={
                        profileErrors.donorAccount
                          ? "my-info__input--invalid"
                          : "my-info__input"
                      }
                    />
                    {profileErrors.donorAccount && (
                      <div className="my-info__message--error">
                        {profileErrors.donorAccount}
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <div
                      className={
                        profileData.donorAccount
                          ? ""
                          : "my-info__text--default"
                      }
                    >
                      {profileData.donorAccount ||
                        "(선택) 금융 계좌를 입력하세요"}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 지갑 주소 */}
            <div className="my-info__line">
              <div className="my-info__line--left">지갑 주소</div>
              <div className="my-info__line--right">
                <a
                  href={profileData.walletAddressLink}
                  className="my-info__wallet-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profileData.donorWallet}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 가입 정보 섹션 */}
      <div className="my-info__profile">
        <div className="my-info__title--sub">
          가입 정보
          <button
            className="my-info__button"
            onClick={() =>
              isEditingSubInfo ? handleSaveClick("sub") : handleEditClick("sub")
            }
          >
            {isEditingSubInfo ? "저장" : "수정"}
          </button>
        </div>
        <div className="my-info__content">
          <div className="my-info__text">
            {/* 비밀번호 */}
            <div className="my-info__line">
              <div className="my-info__line--left">비밀번호</div>
              <div className="my-info__line--right">
                {isEditingSubInfo ? (
                  <>
                    <input
                      type="password"
                      name="donorPassword"
                      value={subInfo.donorPassword}
                      onChange={(e) => handleInputChange(e, "sub")}
                      className={
                        subInfoErrors.donorPassword
                          ? "my-info__input--invalid"
                          : "my-info__input"
                      }
                    />
                    {subInfoErrors.donorPassword && (
                      <div className="my-info__message--error">
                        {subInfoErrors.donorPassword}
                      </div>
                    )}
                  </>
                ) : (
                  <div>********</div>
                )}
              </div>
            </div>

            {/* 이름 */}
            <div className="my-info__line">
              <div className="my-info__line--left">이름</div>
              <div className="my-info__line--right">
                {isEditingSubInfo ? (
                  <>
                    <input
                      type="text"
                      name="donorName"
                      value={subInfo.donorName}
                      onChange={(e) => handleInputChange(e, "sub")}
                      className={
                        subInfoErrors.donorName
                          ? "my-info__input--invalid"
                          : "my-info__input"
                      }
                    />
                    {subInfoErrors.donorName && (
                      <div className="my-info__message--error">
                        {subInfoErrors.donorName}
                      </div>
                    )}
                  </>
                ) : (
                  <div>{subInfo.donorName}</div>
                )}
              </div>
            </div>

            {/* 전화번호 */}
            <div className="my-info__line">
              <div className="my-info__line--left">전화번호</div>
              <div className="my-info__line--right">
                {isEditingSubInfo ? (
                  <>
                    <input
                      type="text"
                      name="donorPhonenumber"
                      value={subInfo.donorPhonenumber}
                      onChange={(e) => handleInputChange(e, "sub")}
                      className={
                        subInfoErrors.donorPhonenumber
                          ? "my-info__input--invalid"
                          : "my-info__input"
                      }
                    />
                    {subInfoErrors.donorPhonenumber && (
                      <div className="my-info__message--error">
                        {subInfoErrors.donorPhonenumber}
                      </div>
                    )}
                  </>
                ) : (
                  <div>{subInfo.donorPhonenumber}</div>
                )}
              </div>
            </div>

            {/* 이메일 */}
            <div className="my-info__line">
              <div className="my-info__line--left">이메일</div>
              <div className="my-info__line--right">
                {isEditingSubInfo ? (
                  <>
                    <input
                      type="text"
                      name="donorMail"
                      value={subInfo.donorMail}
                      onChange={(e) => handleInputChange(e, "sub")}
                      className={
                        subInfoErrors.donorMail
                          ? "my-info__input--invalid"
                          : "my-info__input"
                      }
                    />
                    {subInfoErrors.donorMail && (
                      <div className="my-info__message--error">
                        {subInfoErrors.donorMail}
                      </div>
                    )}
                  </>
                ) : (
                  <div>{subInfo.donorMail}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
