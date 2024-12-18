import React, { useState } from 'react'
import { useContext, useEffect } from "react";
import { CaptainDataContext } from "../Context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const CaptainProtectedWraper = ({children}) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { captain  , setCaptain} = useContext(CaptainDataContext);
    const [isLoading ,setIsLoading] = useState(true)
    
    useEffect(() => {
      if (!token) {
        navigate("/Captain-Login");
      }
    }, [token, navigate]);

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
        headers: { Authorization: `Bearer ${token}` }
    }).then(response =>{
        if(response.status === 200){
            setCaptain(response.data.captain);
            setIsLoading(false);
        }
    })
    .catch(error => {
        localStorage.removeItem("token");
        navigate("/Captain-Login");
    });

    
  
   if(isLoading) {
    return <div>Loading...</div>
    }

   return (
    <>
     {children}
    </>
    ) 
    
  
}

export default CaptainProtectedWraper