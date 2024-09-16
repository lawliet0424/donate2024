import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const {
    user,
    isAuthenticated,
    signup,
    login,
    logout,
    getUserInfo,
    updateUserInfo,
    checkIdDuplicate,
  } = useContext(AuthContext);

  return {
    user,
    isAuthenticated,
    signup,
    login,
    logout,
    getUserInfo,
    updateUserInfo,
    checkIdDuplicate,
  };
};

export default useAuth;
