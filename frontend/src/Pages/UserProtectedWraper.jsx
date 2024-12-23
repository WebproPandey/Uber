import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectedWraper = ({children}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user  , setUser} = useContext(UserDataContext);
  const [isLoading ,setIsLoading] = useState(true)
  
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
      headers: { Authorization: `Bearer ${token}` }
  }).then(response =>{
      if(response.status === 200){
        setUser(response.data.user);
          setIsLoading(false);
      }
  })
  .catch(error => {
      localStorage.removeItem("token");
      navigate("/login");
  });

  }, [token]);

 
  

 if(isLoading) {
  return <div>Loading...</div>
  }

 return (
  <>
   {children}
  </>
  ) 
  
  
};

export default UserProtectedWraper;
