import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
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
