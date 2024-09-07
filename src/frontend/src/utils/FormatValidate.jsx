export const formatPhoneNumber = (value) => {
  const numbersOnly = value.replace(/\D/g, "");
  let formattedPhoneNumber = numbersOnly;

  if (numbersOnly.length > 3 && numbersOnly.length <= 7) {
    formattedPhoneNumber = numbersOnly.replace(/(\d{3})(\d+)/, "$1-$2");
  } else if (numbersOnly.length > 7) {
    formattedPhoneNumber = numbersOnly.replace(
      /(\d{3})(\d{4})(\d+)/,
      "$1-$2-$3"
    );
  }

  return formattedPhoneNumber;
};

export const formatamountPerPerson = (value) => {
  if (value % 1 === 0) {
    return value;
  }
  return Math.floor(value);
};

export const validateName = (name) => {
  if (name.trim() === "") {
    return "이름을 입력해주세요.";
  }
  return "";
};

export const validateEmail = (email) => {
  if (email.trim() === "") return "이메일을 입력해주세요.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? "" : "올바른 이메일을 입력해주세요.";
};

export const validatePhoneNumber = (phoneNumber) => {
  if (phoneNumber.trim() === "") return "전화번호를 입력해주세요.";
  const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
  return phoneRegex.test(phoneNumber) ? "" : "올바른 전화번호를 입력해주세요.";
};

export const validateNickname = (nickname) => {
  if (!nickname) {
    return "닉네임을 입력해주세요.";
  } else if (!/^([ㄱ-ㅎ가-힣]{2,5}|[a-zA-Z]{2,5})$/.test(nickname)) {
    if (nickname.length < 2 || nickname.length > 5) {
      return "닉네임은 2~5글자이어야 합니다.";
    } else {
      return "닉네임은 한글로만 또는 영문(대소문자)으로만 이루어져야 합니다.";
    }
  }
  return "";
};

export const validateId = (id) => {
  if (!id) {
    return "아이디를 입력해주세요.";
  } else if (!/^[a-z0-9]{4,16}$/.test(id)) {
    if (id.length < 4 || id.length > 16) {
      return "아이디는 4~16자이어야 합니다.";
    } else {
      return "아이디는 영문 소문자와 숫자로만 이루어져야 합니다.";
    }
  }
  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return "비밀번호를 입력해주세요.";
  } else if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{10,}$/.test(password)) {
    if (password.length < 10) {
      return "비밀번호는 10자 이상이어야 합니다.";
    } else {
      return "비밀번호는 영문(대소문자 포함)과 숫자를 모두 포함해야 합니다.";
    }
  }
  return "";
};

export const validateAge = (age) => {
  if (age && isNaN(age)) {
    return "나이는 숫자여야 합니다.";
  }
  return "";
};

export const validateFinancialAccount = (financialAccount) => {
  if (
    financialAccount &&
    financialAccount.trim().length < 8 &&
    isNaN(financialAccount)
  ) {
    return "금융계좌는 최소 8자 이상이어야 합니다.";
  }
  return "";
};

export const validateNumberOfPeopleAmount = (
  numberOfPeople,
  amount,
  amountPerPerson
) => {
  if (!numberOfPeople || !amount) {
    return "모든 필드에 값을 입력해주세요.";
  } else if (formatamountPerPerson(amountPerPerson) < 1000) {
    return "수혜자 한 명당 1,000원 이상 기부되도록 입력 해주세요.";
  }
  return null;
};
