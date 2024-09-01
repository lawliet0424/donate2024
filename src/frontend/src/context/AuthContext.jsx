import React, { createContext, useState, useEffect } from "react";
import { mockLogin } from "../api";

const initialUserState = {
  donorId: "",
  donorNickname: "",
  donorPassword: "",
  donorName: "",
  donorEmail: "",
  donorPhone: "",
  donorProfileImage: "",
  donorAge: "",
  donorFinancialAccount: "",
  donorWalletAddress: "",
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/profile", { withCredentials: true })
  //     .then((response) => {
  //       setUser(response.data);
  //       setIsAuthenticated(true);
  //     })
  //     .catch(() => {
  //       setUser(null);
  //       setIsAuthenticated(true);
  //     });
  // }, []);
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
    return mockLogin(loginId, loginPassword).then((userData) => {
      setUser(userData);
      setIsAuthenticated(true);

      // 로그인 정보를 로컬 스토리지에 저장
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

    // 로컬 스토리지에서 사용자 정보 제거
    localStorage.clear();
  };

  const updateUserInfo = (updatedData) => {
    // setUser((prevUser) => ({
    //   ...prevUser,
    //   ...updatedData,
    // }));
    // // 실제 API 호출로 업데이트를 서버에 반영하려면 여기에 추가
    // // axios.post('/update-profile', updatedData).then(response => {
    // //   setUser(response.data);
    // // });
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
