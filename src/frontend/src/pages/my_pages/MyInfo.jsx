import React, { useState, useEffect, useContext } from "react";
import profileImage from "../../assets/defaultProfile.png";
import { AuthContext } from "../../context/AuthContext";
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

const MyInfo = () => {
  const { user, updateUserInfo } = useContext(AuthContext);
  const [image, setImage] = useState(user.donorProfileImage || profileImage);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingSubInfo, setIsEditingSubInfo] = useState(false);

  const [profileData, setProfileData] = useState({
    donorNickname: user.donorNickname,
    donorAge: user.donorAge || "",
    donorFinancialAccount: user.donorFinancialAccount || "",
    walletAddressLink: `https://www.etherscan.io/address/${user.donorWalletAddress}`,
    donorWalletAddress: user.donorWalletAddress,
  });

  const [subInfo, setSubInfo] = useState({
    donorId: user.donorId,
    donorPassword: user.donorPassword,
    donorName: user.donorName,
    donorPhone: formatPhoneNumber(user.donorPhone || ""),
    donorEmail: user.donorEmail,
  });

  const [profileErrors, setProfileErrors] = useState({
    donorNickname: "",
    donorAge: "",
    donorFinancialAccount: "",
  });

  const [subInfoErrors, setSubInfoErrors] = useState({
    donorPassword: "",
    donorName: "",
    donorPhone: "",
    donorEmail: "",
  });

  useEffect(() => {
    setProfileData({
      donorNickname: user.donorNickname,
      donorAge: user.donorAge || "",
      donorFinancialAccount: user.donorFinancialAccount || "",
      walletAddressLink: `https://www.etherscan.io/address/${user.donorWalletAddress}`,
      donorWalletAddress: user.donorWalletAddress,
    });
    setSubInfo({
      donorId: user.donorId,
      donorPassword: user.donorPassword,
      donorName: user.donorName,
      donorPhone: formatPhoneNumber(user.donorPhone || ""),
      donorEmail: user.donorEmail,
    });
  }, [user]);

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

  const validateSubInfo = (data) => {
    let errors = {
      donorPassword: validatePassword(data.donorPassword),
      donorName: validateName(data.donorName),
      donorPhone: validatePhoneNumber(data.donorPhone),
      donorEmail: validateEmail(data.donorEmail),
    };
    return errors;
  };

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

  const handleEditClick = (section) => {
    if (section === "profile") {
      setIsEditingProfile(true);
    } else if (section === "sub") {
      setIsEditingSubInfo(true);
    }
  };

  return (
    <div className="MyInfo">
      <div className="title">회원 정보</div>

      <div className="myProfileInfo">
        <div className="myProfileInfoTitle">
          프로필
          <button
            onClick={() =>
              isEditingProfile
                ? handleSaveClick("profile")
                : handleEditClick("profile")
            }
          >
            {isEditingProfile ? "저장" : "수정"}
          </button>
        </div>
        <div className="myProfileInfoImg">
          <div className="myProfileImgText">이미지</div>
          <img
            className="myProfileImage"
            src={image}
            alt="Profile"
            onClick={() =>
              isEditingProfile && document.getElementById("fileInput").click()
            }
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
          <div className="myProfileTest">
            <div className="myProfileLine">
              <div className="myProfileLineLeft">닉네임</div>
              <div className="myProfileLineRight">
                {isEditingProfile ? (
                  <>
                    <input
                      type="text"
                      name="donorNickname"
                      value={profileData.donorNickname}
                      onChange={(e) => handleInputChange(e, "profile")}
                      className={
                        profileErrors.donorNickname ? "inputInvalid" : ""
                      }
                    />
                    {profileErrors.donorNickname && (
                      <div className="errorMessage">
                        {profileErrors.donorNickname}
                      </div>
                    )}
                  </>
                ) : (
                  <div>{profileData.donorNickname}</div>
                )}
              </div>
            </div>
            <div className="myProfileLine">
              <div className="myProfileLineLeft">나이</div>
              <div className="myProfileLineRight">
                {isEditingProfile ? (
                  <>
                    <input
                      type="number"
                      name="donorAge"
                      placeholder="나이를 입력하세요"
                      value={profileData.donorAge}
                      onChange={(e) => handleInputChange(e, "profile")}
                      className={profileErrors.donorAge ? "inputInvalid" : ""}
                    />
                    {profileErrors.donorAge && (
                      <div className="errorMessage">
                        {profileErrors.donorAge}
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <div className={profileData.donorAge ? "" : "default-text"}>
                      {profileData.donorAge || "(선택) 나이를 입력하세요"}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="myProfileLine">
              <div className="myProfileLineLeft">금융계좌</div>
              <div className="myProfileLineRight">
                {isEditingProfile ? (
                  <>
                    <input
                      type="text"
                      name="donorFinancialAccount"
                      placeholder="금융계좌를 입력하세요"
                      value={profileData.donorFinancialAccount}
                      onChange={(e) => handleInputChange(e, "profile")}
                      className={
                        profileErrors.donorFinancialAccount
                          ? "inputInvalid"
                          : ""
                      }
                    />
                    {profileErrors.donorFinancialAccount && (
                      <div className="errorMessage">
                        {profileErrors.donorFinancialAccount}
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    className={
                      profileData.donorFinancialAccount ? "" : "default-text"
                    }
                  >
                    {profileData.donorFinancialAccount ||
                      "(선택) 금융 계좌를 입력하세요"}
                  </div>
                )}
              </div>
            </div>
            <div className="myProfileLine">
              <div className="myProfileLineLeft">지갑주소</div>
              <div className="myProfileLineRight">
                {isEditingProfile ? (
                  <div>
                    <a
                      href={profileData.walletAddressLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {profileData.donorWalletAddress}
                    </a>
                  </div>
                ) : (
                  <div>
                    <a
                      href={profileData.walletAddressLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {profileData.donorWalletAddress}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mySubInfo">
        <div className="mySubInfoTitle">
          가입 정보
          <button
            onClick={() =>
              isEditingSubInfo ? handleSaveClick("sub") : handleEditClick("sub")
            }
          >
            {isEditingSubInfo ? "저장" : "수정"}
          </button>
        </div>
        <div
          className={`mySubInfoContent ${isEditingSubInfo ? "editing" : ""}`}
        >
          <div className="myProfileTest">
            <div className="myProfileLine">
              <div className="myProfileLineLeft">아이디</div>
              <div className="myProfileLineRight">
                {isEditingSubInfo ? (
                  <>
                    <div>{subInfo.donorId}</div>
                  </>
                ) : (
                  <>
                    <div>{subInfo.donorId}</div>
                  </>
                )}
              </div>
            </div>
            <div className="myProfileLine">
              <div className="myProfileLineLeft">비밀번호</div>
              <div className="myProfileLineRight">
                {isEditingSubInfo ? (
                  <>
                    <input
                      type="password"
                      name="donorPassword"
                      value={subInfo.donorPassword}
                      onChange={(e) => handleInputChange(e, "sub")}
                      className={
                        subInfoErrors.donorPassword ? "inputInvalid" : ""
                      }
                    />
                    {subInfoErrors.donorPassword && (
                      <div className="errorMessage">
                        {subInfoErrors.donorPassword}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div>***********</div>
                  </>
                )}
              </div>
            </div>
            <div className="myProfileLine">
              <div className="myProfileLineLeft">이름</div>
              <div className="myProfileLineRight">
                {isEditingSubInfo ? (
                  <>
                    <input
                      type="text"
                      name="donorName"
                      value={subInfo.donorName}
                      onChange={(e) => handleInputChange(e, "sub")}
                      className={subInfoErrors.donorName ? "inputInvalid" : ""}
                    />
                    {subInfoErrors.donorName && (
                      <div className="errorMessage">
                        {subInfoErrors.donorName}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div>{subInfo.donorName}</div>
                  </>
                )}
              </div>
            </div>
            <div className="myProfileLine">
              <div className="myProfileLineLeft">전화번호</div>
              <div className="myProfileLineRight">
                {isEditingSubInfo ? (
                  <>
                    <input
                      type="text"
                      name="donorPhone"
                      value={subInfo.donorPhone}
                      onChange={(e) => handleInputChange(e, "sub")}
                      className={subInfoErrors.donorPhone ? "inputInvalid" : ""}
                    />
                    {subInfoErrors.donorPhone && (
                      <div className="errorMessage">
                        {subInfoErrors.donorPhone}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div>{subInfo.donorPhone}</div>
                  </>
                )}
              </div>
            </div>
            <div className="myProfileLine">
              <div className="myProfileLineLeft">메일</div>
              <div className="myProfileLineRight">
                {isEditingSubInfo ? (
                  <>
                    <input
                      type="text"
                      name="donorEmail"
                      value={subInfo.donorEmail}
                      onChange={(e) => handleInputChange(e, "sub")}
                      className={subInfoErrors.donorEmail ? "inputInvalid" : ""}
                    />
                    {subInfoErrors.donorEmail && (
                      <div className="errorMessage">
                        {subInfoErrors.donorEmail}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div>{subInfo.donorEmail}</div>
                  </>
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
