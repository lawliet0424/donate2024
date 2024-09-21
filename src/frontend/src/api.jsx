import mockData from "./db.json";

// 사용자 로그인 처리
export const mockLogin = (id, password) => {
  const user = mockData.userInfo.find(
    (u) => u.donorId === id && u.donorPassword === password
  );
  if (user) {
    return Promise.resolve(user);
  } else {
    return Promise.reject(new Error("Invalid credentials"));
  }
};

// 사용자 정보 가져오기
export const mockGetUserInfo = (donorId) => {
  const user = mockData.userInfo.find((u) => u.donorId === donorId);
  if (user) {
    return Promise.resolve(user);
  } else {
    return Promise.reject(new Error("User not found"));
  }
};

// 사용자 관심사 가져오기
export const mockGetUserInterests = (donorId) => {
  const interests = mockData.userInterests.find((u) => u.donorId === donorId);
  if (interests) {
    return Promise.resolve(interests.interestInfo);
  } else {
    return Promise.reject(new Error("User interests not found"));
  }
};

// 수혜자 정보 가져오기
export const mockGetBeneficiary = (beneficiaryId) => {
  // `beneficiaryId`를 정수형으로 변환합니다.
  const idAsNumber = Number(beneficiaryId);

  // 정수형으로 비교합니다.
  const beneficiary = mockData.beneficiaries.find(
    (b) => b.beneficiaryId === idAsNumber
  );

  if (beneficiary) {
    return Promise.resolve(beneficiary);
  } else {
    return Promise.reject(new Error("Beneficiary not found"));
  }
};

// 태그 정보 가져오기
export const mockGetTags = () => {
  return Promise.resolve(mockData.tagInfo);
};
