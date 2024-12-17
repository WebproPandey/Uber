import React, { useState } from "react";
import logo  from '../assets/BikeBuddy.png'
import { Link } from "react-router-dom";

const UserLogin = () => {
  const  [email , setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData , setUserData]  =   useState({})

  const submitHandler = (e) =>{
    e.preventDefault();
     setUserData({
      email:email,
      password:password
     })     
    setEmail('')
    setPassword('')
    
  }


  return (
    <div className="w-full h-screen bg-[#121212] flex  flex-col justify-between items-center">
       <div className=" rounded-t-lg  flex justify-center items-center mt-4 px-4">
              <img className="w-[12rem] " src={logo} alt="" />
        </div>
      <div className=" h-[80%] w-full bg-white rounded-tl-[50px] p-8">
       <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
       <form  onSubmit={(e) => submitHandler(e)} className="flex flex-col">
        <label className="mb-1 text-gray-700">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="example@gmail.com"
        />
        <label className="mb-1 text-gray-700">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="••••••••"
        />
        <button className="bg-black text-white rounded-lg p-2 hover:bg-gray-800 transition  placeholder:text-base">
          Login
        </button>
       
       </form>
        <p className="text-center text-sm text-gray-500 mt-4">
        Don’t have an account?{" "}
        <Link to='/Signup'  className="text-black font-medium underline">
          Sign Up
        </Link>
        </p>
        <Link to='/Captain-Signup' className="bg-[#10b461] flex justify-center items-center  text-white rounded-lg p-2 w-full hover:bg-gray-800 transition mt-4">
          Sign in as Captain
        </Link>
      </div>
     

     
    </div>
  );
};

export default UserLogin;
