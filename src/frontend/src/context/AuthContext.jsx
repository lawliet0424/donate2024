import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { mockLogin } from "../api";

const initialUserState = {
  donorId: "",
  donorNickname: "",
  donorPassword: "",
  donorName: "",
  donorEmail: "",
  donorPhoneNumber: "",
  donorProfileImage: "",
  donorAge: "",
  donorFinancialAccount: "",
  donorWalletAddress: "",
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAuth = localStorage.getItem("isAuthenticated");

    if (storedUser && storedAuth === "true") {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const signup = (
    signupName,
    signupEmail,
    signupPhoneNumber,
    signupNickname,
    signupId,
    signupPassword
  ) => {
    // return axios
    //   .post(
    //     "http://localhost:5000/signup/step2",
    //     {
    //       signupName,
    //       signupEmail,
    //       signupPhoneNumber,
    //       signupNickname,
    //       signupId,
    //       signupPassword,
    //     },
    //     { withCredentials: true }
    //   )
    //   .then((response) => {
    //   if (response.data.success) {
    //     console.log("회원가입 성공");}
    //   else {
    //     console.log("회원가입 실패");
    //     return Promise.reject("회원가입에 실패했습니다.");
    //   }
    //    });
    // .catch((error) => {
    //   console.error("회원가입 중 오류 발생:", error);
    //   return Promise.reject(error);
    // });
    console.log(
      `Name: ${signupName}\nEmail: ${signupEmail}\nPhone: ${signupPhoneNumber}\nNickname: ${signupNickname}\nID: ${signupId}\nPassword: ${signupPassword}`
    );
  };

  const login = (loginId, loginPassword) => {
    // return axios
    //   .post(
    //     "http://localhost:5000/login",
    //     { loginId, loginPassword },
    //     { withCredentials: true }
    //   )
    //   .then((response) => {
    //     setUser(response.data);
    //     setIsAuthenticated(true);
    //   });
    //   .catch((error) => {
    //     console.error("Failed to login:", error);
    //   });
    return mockLogin(loginId, loginPassword).then((userData) => {
      setUser(userData);
      setIsAuthenticated(true);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isAuthenticated", "true");

      return userData;
    });
  };

  const logout = () => {
    // return axios
    //   .post("http://localhost:5000/logout", {}, { withCredentials: true })
    //   .then(() => {
    //     setUser(null);
    //     setIsAuthenticated(false);
    //   });
    setUser(null);
    setIsAuthenticated(false);

    localStorage.clear();
  };

  const updateUserInfo = (updatedData) => {
    // setUser((prevUser) => ({
    //   ...prevUser,
    //   ...updatedData,
    // }));
    //
    // axios
    // .post("http://localhost:5000//myinfo", updatedData, { withCredentials: true })
    // .then((response) => {
    //   // 서버에서 최신 데이터를 받아 상태 업데이트
    //   setUser(response.data);
    // })
    // .catch((error) => {
    //   console.error("Failed to update user info:", error);
    //   // 에러 처리 로직 추가
    // });
    setUser((prevUser) => {
      const newUser = { ...prevUser, ...updatedData };
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signup, login, logout, updateUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
