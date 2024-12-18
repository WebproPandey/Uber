import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Driverlogo from '../assets/DriverLogo.png'

const CaptainLogin = () => {
   const  [email , setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [CaptainData , setCaptainData]  =   useState({})
  
    const submitHandler = (e) =>{
      e.preventDefault();
      setCaptainData({
        email:email,
        password:password
       })     
      setEmail('')
      setPassword('')
      
    }
  
  return (
    <div className="w-full h-screen bg-white flex  flex-col justify-between items-center">
    <div className=" rounded-t-lg w-full h-[20%]  flex justify-center items-center pt-12">
        <img className=" w-full  object-cover" src={Driverlogo} alt="" />
    </div>
    <div className=" h-[80%] w-full bg-[#121212] flex flex-col justify-between items-center rounded-tl-[50px] px-6 pt-6  pb-2">
     <h2 className="text-2xl font-bold text-center  text-white">Login</h2>
     <form  onSubmit={(e) => submitHandler(e)} className="flex flex-col  w-full">
      <label className="mb-1 text-white">Email</label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="example@gmail.com"
      />
      <label className="mb-1 text-white">Password</label>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="••••••••"
      />
      <button className="bg-white text-black font-semibold rounded-lg p-2 hover:bg-gray-800 transition  placeholder:text-base">
        Login
      </button>
     
     </form>
      <p className="text-center text-sm text-white mt-4">
        join a feet?{" "}
      <Link to='/Captain-Signup'  className="text-blue-500 font-medium underline">
        Register as a Captain
      </Link>
      </p>
      <Link to='/login' className="bg-[#b48810] flex justify-center items-center  text-black font-semibold rounded-lg p-2 w-full hover:bg-gray-800 transition mt-4">
        Sign in as User
      </Link>
    </div>
   

   
  </div>  )
}

export default CaptainLogin