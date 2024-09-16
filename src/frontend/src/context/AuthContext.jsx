import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const initialUserState = {
  donorId: "",
  donorNickname: "",
  donorPassword: "",
  donorName: "",
  donorEmail: "",
  donorPhoneNumber: "",
  donorProfileImage: "",
  donorAge: null,
  donorFinancialAccount: "",
  donorWalletAddress: "",
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = (
    signupName,
    signupEmail,
    signupPhoneNumber,
    signupNickname,
    signupId,
    signupPassword
  ) => {
    setLoading(true);
    return axios
      .post("/api/signup/step2", {
        signupName,
        signupEmail,
        signupPhoneNumber,
        signupNickname,
        signupId,
        signupPassword,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("회원가입 성공");
        } else {
          console.log("회원가입 실패");
          return Promise.reject("회원가입에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("회원가입 중 오류 발생:", error);
        setError(error);
        return Promise.reject(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const login = (loginId, loginPassword) => {
    setLoading(true);
    return axios
      .post("/api/login", { loginId, loginPassword }, { withCredentials: true })
      .then((response) => {
        const {
          donorNickname,
          donorName,
          donorPhoneNumber,
          donorEmail,
          donorProfileImage,
        } = response.data;
        setUser({
          donorNickname,
          donorName,
          donorPhoneNumber,
          donorEmail,
          donorProfileImage,
        });
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error("Failed to login:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    setLoading(true);
    return axios
      .post("/api/logout", {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        setIsAuthenticated(false);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getUserInfo = () => {
    setLoading(true);
    return axios
      .get("/api/myinfo", { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch user info:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateUserInfo = (updatedData) => {
    // 현재 상태를 저장해둠 (서버 실패 시 롤백에 사용)
    const prevUser = user;

    // Optimistic UI: 사용자에게 즉시 업데이트된 정보를 보여줌
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));

    // 서버에 업데이트 요청
    axios
      .post("/api/myinfo", updatedData, {
        withCredentials: true,
      })
      .then((response) => {
        // 서버에서 최신 데이터를 받아 상태 업데이트
        setUser(response.data); // 서버에서 받은 최종 데이터로 상태 덮어씌움
      })
      .catch((error) => {
        console.error("Failed to update user info:", error);

        // 에러 발생 시, 이전 상태로 롤백
        setUser(prevUser);

        // 사용자에게 오류 메시지 표시
        alert("업데이트에 실패했습니다. 다시 시도해 주세요.");
      });
  };

  const checkIdDuplicate = (signupId) => {
    return axios
      .get("/api/check-id-duplicate", {
        params: { signupId },
      })
      .then((response) => response.data.isDuplicate)
      .catch((error) => {
        console.error("아이디 중복 확인 오류:", error);
        throw error;
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signup,
        login,
        logout,
        getUserInfo,
        updateUserInfo,
        checkIdDuplicate,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
