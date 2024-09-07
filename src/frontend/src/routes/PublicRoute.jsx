import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoute = ({ element, restricted }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && restricted) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, restricted, navigate]);

  if (isAuthenticated && restricted) {
    return null;
  }

  return element;
};

export default PublicRoute;
