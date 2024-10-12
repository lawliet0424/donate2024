import React, { createContext, useState, useEffect } from "react";

import axios from "axios";

const authAxios = axios.create();

// 요청 인터셉트로 토큰 추가
authAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { authAxios };

// 초기 사용자 상태 정의
const initialUserState = {
  donorId: "", // 기부자 ID
  donorNickname: "", // 기부자 닉네임
  donorPassword: "", // 기부자 비밀번호
  donorName: "", // 기부자 이름
  donorMail: "", // 기부자 이메일
  donorPhonenumber: "", // 기부자 전화번호
  donorAge: null, // 기부자 나이
  donorAccount: "", // 기부자 금융 계좌
  donorWallet: "", // 기부자 지갑 주소
};

// 인증 컨텍스트 생성
export const AuthContext = createContext();

/*
  Function name: AuthProvider
  Summary: 인증 컨텍스트를 제공하는 컴포넌트
  Parameter: 총 1개
             node children; 자식 컴포넌트를 포함하는 JSX 요소
  Return: 총 1개; 인증 상태를 제공하는 JSX Provider 컴포넌트
*/
export const AuthProvider = ({ children }) => {
  // 사용자 상태 관리
  const [user, setUser] = useState(initialUserState);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 인증 여부 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태

  // 컴포넌트 마운트 시 토큰 확인 및 사용자 정보 가져오기
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          getUserInfo()
            .then(() => {setIsAuthenticated(true);
            })
            .catch(() => {
              localStorage.removeItem("token");
              setIsAuthenticated(false);
            });
        }
      }, []);

  /*
    Function name: signupFirstPage
    Summary: 회원가입 처리 함수
    Parameter: 총 3개
               string signupName; 사용자 이름
               string signupEmail; 사용자 이메일
               string signupPhoneNumber; 사용자 전화번호
    Return: Promise 객체; 검증 처리 결과
  */
  const signupFirstPage = (signupName, signupEmail, signupPhoneNumber) => {
      console.log('signupFirstPage called');
    setLoading(true); // 로딩 시작
    return axios
      .post("/api/donor/signup/step1", {
        signupName,
        signupEmail,
        signupPhoneNumber,
      })
      .then((response) => {
          console.log('서버 응답:', response.data); // 응답 내용을 확인
        // 성공적으로 회원가입 했을 경우
        if (response.data) {
          console.log("검증 성공");
        } else {
          console.log("검증 실패");
          return Promise.reject("검증에 실패했습니다."); // 실패 메시지 반환
        }
      })
      .catch((error) => {
        console.error("검증 중 오류 발생:", error);
        setError(error); // 오류 상태 설정
        return Promise.reject(error);
      })
      .finally(() => {
        setLoading(false); // 로딩 종료
      });
  };

  /*
    Function name: signupSecondPage
    Summary: 회원가입 처리 함수
    Parameter: 총 6개
               string signupName; 사용자 이름
               string signupEmail; 사용자 이메일
               string signupPhoneNumber; 사용자 전화번호
               string signupNickname; 사용자 닉네임
               string signupId; 사용자 ID
               string signupPassword; 사용자 비밀번호
    Return: Promise 객체; 회원가입 처리 결과
  */
  const signupSecondPage = (
    signupName,
    signupEmail,
    signupPhoneNumber,
    signupNickname,
    signupId,
    signupPassword
  ) => {
    setLoading(true); // 로딩 시작
    return axios
      .post("/api/donor/signup/step2", {
        signupName,
        signupEmail,
        signupPhoneNumber,
        signupNickname,
        signupId,
        signupPassword,
      })
      .then((response) => {
        // 성공적으로 회원가입했을 경우
        if (response.status == 200) {
          console.log("회원가입 성공");
        } else {
          console.log("회원가입 실패");
          return Promise.reject("회원가입에 실패했습니다."); // 실패 메시지 반환
        }
      })
      .catch((error) => {
        console.error("회원가입 중 오류 발생:", error);
        setError(error); // 오류 상태 설정
        return Promise.reject(error);
      })
      .finally(() => {
        setLoading(false); // 로딩 종료
      });
  };

/*
    Function name: login
    Summary: 로그인 처리 함수
    Parameter: 총 2개
               string loginId; 로그인 ID
               string loginPassword; 로그인 비밀번호
    Return: Promise 객체; 로그인 처리 결과
  */
const login = (loginId, loginPassword) => {
  setLoading(true); // 로딩 시작
  return axios
    .post("/api/donor/login", { id: loginId, password: loginPassword })
    .then((response) => {
      // 로그인 성공 시 JWT 토큰을 로컬 스토리지에 저장
      const token = response.data.token; // 서버에서 반환된 토큰
      localStorage.setItem("token", token);
      setIsAuthenticated(true); // 인증 상태 업데이트

      // 사용자 정보 가져오기
      return getUserInfo(); // getUserInfo 호출하여 사용자 상태 업데이트
    })
    .then(() => {
      console.log("User info loaded successfully");
    })
    .catch((error) => {
      console.error("Failed to login:", error);
      window.alert("아이디 또는 비밀번호를 잘못 입력했습니다."); // 오류 메시지 표시
      setError(error); // 오류 상태 설정
    })
    .finally(() => {
      setLoading(false); // 로딩 종료
    });
};


   /*
      Function name: logout
      Summary: 로그아웃 처리 함수
      Parameter: 없음
      Return: Promise 객체; 로그아웃 처리 결과
    */
    const logout = () => {
      setLoading(true); // 로딩 시작
      return authAxios
  //       .post("/api/logout", {}, { withCredentials: true })
        .post("/api/donor/logout", {})
        .then(() => {
          localStorage.removeItem("token");
  //         setUser(null); // 사용자 정보 초기화
          setUser(initialUserState); // 사용자 정보 초기화
          setIsAuthenticated(false); // 인증 상태 업데이트
        })
        .catch((error) => {
          console.error("Logout failed:", error);
          setError(error); // 오류 상태 설정
        })
        .finally(() => {
          setLoading(false); // 로딩 종료
        });
    };

/*
    Function name: getUserInfo
    Summary: 사용자 정보 조회 함수
    Parameter: 없음
    Return: Promise 객체; 사용자 정보 조회 결과
  */
  const getUserInfo = () => {
    setLoading(true); // 로딩 시작
    return authAxios
      .get("/api/donor/myinfo")
      .then((response) => {
        const {   donorId,
                  donorPassword,
                  donorNickname,
                  donorName,
                  donorMail,
                  donorPhonenumber,
                  donorAge,
                  donorAccount,
                  donorWallet,
                } = response.data;
            console.log("getUserInfo/response.data:", response.data);
                // 필요한 필드로 user 상태 업데이트
                setUser({
                  donorId,
                  donorPassword,
                  donorNickname,
                  donorName,
                  donorMail,
                  donorPhonenumber,
                  donorAge,
                  donorAccount,
                  donorWallet,
                  });
              })
      .catch((error) => {
        console.error("Failed to fetch user info:", error);
        setError(error); // 오류 상태 설정
      })
      .finally(() => {
        setLoading(false); // 로딩 종료
      });
  };


  /*
    Function name: updateUserInfo
    Summary: 사용자 정보 업데이트 함수
    Parameter: 총 1개
               object updatedData; 업데이트할 사용자 정보 데이터
    Return: 없음
  */
  const updateUserInfo = (updatedData) => {
    const prevUser = user; // 현재 상태 저장

    // 사용자에게 즉시 업데이트된 정보를 보여줌
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));

    // 서버에 업데이트 요청
    authAxios
      .put("/api/donor/myinfo", updatedData)
      .then((response) => {
          console.log("Update successful, response data:", response.data);
        setUser(response.data); // 서버에서 받은 최신 데이터로 상태 업데이트
      })
      .catch((error) => {
        console.error("Failed to update user info:", error);
        setUser(prevUser); // 이전 상태로 롤백
        alert("업데이트에 실패했습니다. 다시 시도해 주세요."); // 오류 메시지 표시
      });
  };

  /*
    Function name: checkIdDuplicate
    Summary: 아이디 중복 확인 함수
    Parameter: 총 1개
               string signupId; 중복 확인할 사용자 ID
    Return: Promise 객체; 중복 여부 확인 결과
  */
  const checkIdDuplicate = (signupId) => {
    return axios
      .get("/api/donor/check-id-duplicate", {
        params: { signupId },
      })
      .then((response) => response.data) // 중복 여부 반환
      .catch((error) => {
        console.error("아이디 중복 확인 오류:", error);
        throw error; // 오류 발생 시 에러 던지기
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signupFirstPage,
        signupSecondPage,
        login,
        logout,
        getUserInfo,
        updateUserInfo,
        checkIdDuplicate,
        loading,
        error,
      }}
    >
      {children} {/* 자식 컴포넌트를 렌더링 */}
    </AuthContext.Provider>
  );
};