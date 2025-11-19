import { useEffect } from "react";
import { logout } from "../../services/userServices";

const LogoutPage = () => {
  useEffect(() => {
    window.location.href = "/";
    logout();
  }, []);

  return null;
};

export default LogoutPage;
