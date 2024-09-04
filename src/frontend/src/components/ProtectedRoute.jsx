import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      window.alert("로그인을 먼저 해주세요.");
      navigate("/login", { state: { from: location.pathname } });
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, navigate, location.pathname]);

  if (isLoading) {
    return null; // 페이지가 렌더링되지 않도록 빈 컴포넌트를 반환
  }

  return element;
};

export default ProtectedRoute;
