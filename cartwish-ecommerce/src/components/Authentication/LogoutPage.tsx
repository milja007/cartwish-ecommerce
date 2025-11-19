import { useEffect } from "react";

const LogoutPage = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }, []);

  return null;
};

export default LogoutPage;
