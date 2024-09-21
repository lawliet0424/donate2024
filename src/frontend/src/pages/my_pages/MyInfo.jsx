import React, { useState, useEffect } from "react";
import profileImage from "../../assets/defaultProfile.png";
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
  const { user, updateUserInfo } = useAuth();
  const [image, setImage] = useState(user.donorProfileImage || profileImage); // 프로필 이미지 상태
  const [isEditingProfile, setIsEditingProfile] = useState(false); // 프로필 편집 상태
  const [isEditingSubInfo, setIsEditingSubInfo] = useState(false); // 가입 정보 편집 상태

  // 프로필 데이터 초기화
  const [profileData, setProfileData] = useState({
    donorNickname: user.donorNickname,
    donorAge: user.donorAge || null,
    donorFinancialAccount: user.donorFinancialAccount || "",
    walletAddressLink: `https://www.etherscan.io/address/${user.donorWalletAddress}`,
    donorWalletAddress: user.donorWalletAddress,
  });

  // 가입 정보 데이터 초기화
  const [subInfo, setSubInfo] = useState({
    donorId: user.donorId,
    donorPassword: user.donorPassword,
    donorName: user.donorName,
    donorPhoneNumber: formatPhoneNumber(user.donorPhoneNumber || ""),
    donorEmail: user.donorEmail,
  });

  // 에러 메시지 상태
  const [profileErrors, setProfileErrors] = useState({
    donorNickname: "",
    donorAge: "",
    donorFinancialAccount: "",
  });

  const [subInfoErrors, setSubInfoErrors] = useState({
    donorPassword: "",
    donorName: "",
    donorPhoneNumber: "",
    donorEmail: "",
  });

  useEffect(() => {
    // 사용자 정보 업데이트 시, 상태를 최신화
    setProfileData({
      donorNickname: user.donorNickname,
      donorAge: user.donorAge || null,
      donorFinancialAccount: user.donorFinancialAccount || "",
      walletAddressLink: `https://www.etherscan.io/address/${user.donorWalletAddress}`,
      donorWalletAddress: user.donorWalletAddress,
    });
    setSubInfo({
      donorId: user.donorId,
      donorPassword: user.donorPassword,
      donorName: user.donorName,
      donorPhoneNumber: formatPhoneNumber(user.donorPhoneNumber || ""),
      donorEmail: user.donorEmail,
    });
  }, [user]);

  // 프로필 데이터 유효성 검사
  const validateProfileData = (data) => {
    let errors = {
      donorNickname: validateNickname(data.donorNickname),
      donorAge: validateAge(data.donorAge),
      donorFinancialAccount: validateFinancialAccount(
        data.donorFinancialAccount
      ),
    };
    return errors;
  };

  // 가입 정보 유효성 검사
  const validateSubInfo = (data) => {
    let errors = {
      donorPassword: validatePassword(data.donorPassword),
      donorName: validateName(data.donorName),
      donorPhoneNumber: validatePhoneNumber(data.donorPhoneNumber),
      donorEmail: validateEmail(data.donorEmail),
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
        updateUserInfo({ profileImage: reader.result });
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
                      name="donorFinancialAccount"
                      placeholder="금융 계좌를 입력하세요"
                      value={profileData.donorFinancialAccount}
                      onChange={(e) => handleInputChange(e, "profile")}
                      className={
                        profileErrors.donorFinancialAccount
                          ? "my-info__input--invalid"
                          : "my-info__input"
                      }
                    />
                    {profileErrors.donorFinancialAccount && (
                      <div className="my-info__message--error">
                        {profileErrors.donorFinancialAccount}
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <div
                      className={
                        profileData.donorFinancialAccount
                          ? ""
                          : "my-info__text--default"
                      }
                    >
                      {profileData.donorFinancialAccount ||
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
                  {profileData.donorWalletAddress}
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
                      name="donorPhoneNumber"
                      value={subInfo.donorPhoneNumber}
                      onChange={(e) => handleInputChange(e, "sub")}
                      className={
                        subInfoErrors.donorPhoneNumber
                          ? "my-info__input--invalid"
                          : "my-info__input"
                      }
                    />
                    {subInfoErrors.donorPhoneNumber && (
                      <div className="my-info__message--error">
                        {subInfoErrors.donorPhoneNumber}
                      </div>
                    )}
                  </>
                ) : (
                  <div>{subInfo.donorPhoneNumber}</div>
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
                      name="donorEmail"
                      value={subInfo.donorEmail}
                      onChange={(e) => handleInputChange(e, "sub")}
                      className={
                        subInfoErrors.donorEmail
                          ? "my-info__input--invalid"
                          : "my-info__input"
                      }
                    />
                    {subInfoErrors.donorEmail && (
                      <div className="my-info__message--error">
                        {subInfoErrors.donorEmail}
                      </div>
                    )}
                  </>
                ) : (
                  <div>{subInfo.donorEmail}</div>
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
