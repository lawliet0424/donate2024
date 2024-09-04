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
    return null;
  }

  return element;
};

export default ProtectedRoute;
