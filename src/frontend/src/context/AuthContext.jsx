import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { mockGetUserInfo, mockLogin } from "../api";

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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAuth = localStorage.getItem("isAuthenticated");

    if (storedUser && storedAuth === "true") {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const getUserInfo = () => {
    if (isAuthenticated) {
      // 실제 API 호출 코드 (주석 처리됨)
      // return axios
      //   .get("http://localhost:5000/profile", { withCredentials: true })
      //   .then((response) => {
      //     setUser(response.data);
      //     localStorage.setItem("user", JSON.stringify(response.data));
      //     return response.data;
      //   })
      //   .catch((error) => {
      //     console.error("Failed to fetch user info:", error);
      //   });

      // Mock 데이터 사용
      return mockGetUserInfo(user.donorId).then((userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return userData;
      });
    } else {
      return Promise.reject("User is not authenticated");
    }
  };

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
    //   }); 세션아이디
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
    //   }); 세션아이디
    setUser(null);
    setIsAuthenticated(false);

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
