import { useContext, useEffect } from "react";
import { UserDataContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const UserProtectedWraper = ({children}) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!token) {
        navigate("/login");
      }
    }, [token, navigate]);
  
    if (!token) {
        navigate("/login");
    }
  
    return <>{children}</>;
  
};

export default UserProtectedWraper;
