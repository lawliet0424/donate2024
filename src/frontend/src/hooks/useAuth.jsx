import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { user, isAuthenticated, signup, login, logout, updateUserInfo } =
    useContext(AuthContext);

  return {
    user,
    isAuthenticated,
    signup,
    login,
    logout,
    updateUserInfo,
  };
};

export default useAuth;
