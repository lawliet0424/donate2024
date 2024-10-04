/*
Function name: formatPhoneNumber
Summary: 전화번호 형식을 지정하는 함수
Parameter: 총 1개
           string value; 변환할 전화번호
Return: 총 1개; 형식이 지정된 전화번호 문자열
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
export const formatPhoneNumber = (value) => {

  // value가 null 또는 undefined일 경우 빈 문자열로 대체
  if (!value) return "";

  const numbersOnly = value.replace(/\D/g, ""); // 숫자만 추출
  let formattedPhoneNumber = numbersOnly;

  if (numbersOnly.length > 3 && numbersOnly.length <= 7) {
    formattedPhoneNumber = numbersOnly.replace(/(\d{3})(\d+)/, "$1-$2"); // 3-4 자리 분리
  } else if (numbersOnly.length > 7) {
    formattedPhoneNumber = numbersOnly.replace(
      /(\d{3})(\d{4})(\d+)/,
      "$1-$2-$3" // 3-4-4 자리 분리
    );
  }

  return formattedPhoneNumber; // 형식이 지정된 전화번호 반환
};

/*
Function name: formatamountPerPerson
Summary: 1인당 금액을 포맷하는 함수
Parameter: 총 1개
           number value; 포맷할 금액
Return: 총 1개; 포맷된 금액
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
export const formatamountPerPerson = (value) => {
  if (value % 1 === 0) {
    return value; // 정수일 경우 그대로 반환
  }
  return Math.floor(value); // 소수점 이하 버림
};

/*
Function name: validateName
Summary: 이름 유효성을 검사하는 함수
Parameter: 총 1개
           string name; 검사할 이름
Return: 총 1개; 유효성 검사 결과 메시지
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
export const validateName = (name) => {
  if (name.trim() === "") {
    return "이름을 입력해주세요."; // 이름이 비어있을 경우 메시지 반환
  }
  return ""; // 유효성 통과
};

/*
Function name: validateEmail
Summary: 이메일 유효성을 검사하는 함수
Parameter: 총 1개
           string email; 검사할 이메일
Return: 총 1개; 유효성 검사 결과 메시지
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
export const validateEmail = (email) => {
  if (email.trim() === "") return "이메일을 입력해주세요."; // 이메일이 비어있을 경우 메시지 반환
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 정규식
  return emailRegex.test(email) ? "" : "올바른 이메일을 입력해주세요."; // 정규식 검사 결과 반환
};

/*
Function name: validatePhoneNumber
Summary: 전화번호 유효성을 검사하는 함수
Parameter: 총 1개
           string phoneNumber; 검사할 전화번호
Return: 총 1개; 유효성 검사 결과 메시지
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
export const validatePhoneNumber = (phoneNumber) => {
  if (phoneNumber.trim() === "") return "전화번호를 입력해주세요."; // 전화번호가 비어있을 경우 메시지 반환
  const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/; // 전화번호 정규식
  return phoneRegex.test(phoneNumber) ? "" : "올바른 전화번호를 입력해주세요."; // 정규식 검사 결과 반환
};

/*
Function name: validateNickname
Summary: 닉네임 유효성을 검사하는 함수
Parameter: 총 1개
           string nickname; 검사할 닉네임
Return: 총 1개; 유효성 검사 결과 메시지
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
export const validateNickname = (nickname) => {
  if (!nickname) {
    return "닉네임을 입력해주세요."; // 닉네임이 비어있을 경우 메시지 반환
  } else if (!/^([ㄱ-ㅎ가-힣]{2,5}|[a-zA-Z]{2,5})$/.test(nickname)) {
    if (nickname.length < 2 || nickname.length > 5) {
      return "닉네임은 2~5글자이어야 합니다."; // 길이 검사
    } else {
      return "닉네임은 한글로만 또는 영문(대소문자)으로만 이루어져야 합니다."; // 형식 검사
    }
  }
  return ""; // 유효성 통과
};

/*
Function name: validateId
Summary: 아이디 유효성을 검사하는 함수
Parameter: 총 1개
           string id; 검사할 아이디
Return: 총 1개; 유효성 검사 결과 메시지
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
export const validateId = (id) => {
  if (!id) {
    return "아이디를 입력해주세요."; // 아이디가 비어있을 경우 메시지 반환
  } else if (!/^[a-z0-9]{4,16}$/.test(id)) {
    if (id.length < 4 || id.length > 16) {
      return "아이디는 4~16자이어야 합니다."; // 길이 검사
    } else {
      return "아이디는 영문 소문자와 숫자로만 이루어져야 합니다."; // 형식 검사
    }
  }
  return ""; // 유효성 통과
};

/*
Function name: validatePassword
Summary: 비밀번호 유효성을 검사하는 함수
Parameter: 총 1개
           string password; 검사할 비밀번호
Return: 총 1개; 유효성 검사 결과 메시지
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
export const validatePassword = (password) => {
  if (!password) {
    return "비밀번호를 입력해주세요."; // 비밀번호가 비어있을 경우 메시지 반환
  } else if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{10,}$/.test(password)) {
    if (password.length < 10) {
      return "비밀번호는 10자 이상이어야 합니다."; // 길이 검사
    } else {
      return "비밀번호는 영문(대소문자 포함)과 숫자를 모두 포함해야 합니다."; // 형식 검사
    }
  }
  return ""; // 유효성 통과
};

/*
Function name: validateAge
Summary: 나이 유효성을 검사하는 함수
Parameter: 총 1개
           any age; 검사할 나이
Return: 총 1개; 유효성 검사 결과 메시지
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
export const validateAge = (age) => {
  if (age && isNaN(age)) {
    return "나이는 숫자여야 합니다."; // 나이가 숫자가 아닐 경우 메시지 반환
  }
  return ""; // 유효성 통과
};

/*
Function name: validateFinancialAccount
Summary: 금융 계좌 유효성을 검사하는 함수
Parameter: 총 1개
           string financialAccount; 검사할 금융 계좌
Return: 총 1개; 유효성 검사 결과 메시지
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
export const validateFinancialAccount = (financialAccount) => {
  if (
    financialAccount &&
    financialAccount.trim().length < 8 &&
    isNaN(financialAccount)
  ) {
    return "금융계좌는 최소 8자 이상이어야 합니다."; // 금융 계좌 길이 검사
  }
  return ""; // 유효성 통과
};

/*
Function name: validateNumberOfPeopleAmount
Summary: 인원 수 및 금액 유효성을 검사하는 함수
Parameter: 총 3개
           number numberOfPeople; 검사할 인원 수
           number amount; 검사할 총 금액
           number amountPerPerson; 검사할 1인당 금액
Return: 총 1개; 유효성 검사 결과 메시지 또는 null
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
export const validateNumberOfPeopleAmount = (
  numberOfPeople,
  amount,
  amountPerPerson
) => {
  if (!numberOfPeople || !amount) {
    return "모든 필드에 값을 입력해주세요."; // 모든 필드 입력 검사
  } else if (formatamountPerPerson(amountPerPerson) < 1000) {
    return "수혜자 한 명당 1,000원 이상 기부되도록 입력 해주세요."; // 1인당 금액 검사
  }
  return null; // 유효성 통과
};
