import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = ({ element, restricted }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

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
