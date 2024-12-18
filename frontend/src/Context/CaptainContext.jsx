import React, { createContext, useContext, useState } from 'react'
export  const CaptainDataContext =  createContext() 

 const CaptainContext = ({children}) => {
   const [Captain , setCaptain] =  useState()
   const [isLoading, setIsLoading] = useState()
   const [error, setError] = useState()

   const updateCaptain =  (captainData) =>{
    setCaptain(captainData)
   }

   const  value ={
    Captain ,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError
   }

 
    return (
      <CaptainDataContext.Provider value={value}>
        {children}
      </CaptainDataContext.Provider>
    ) 
}

export default CaptainContext