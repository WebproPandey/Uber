import React, { useState } from "react";
import logo from "../assets/BikeBuddy.png";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      firstName:firstName,
      lastName: lastName,
      email: email,
      password: password,
    })
    console.log(userData);
    
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full h-screen bg-[#121212] flex  flex-col justify-between items-center">
      <div className=" rounded-t-lg  flex justify-center items-center mt-4 px-4">
        <img className="w-[12rem] " src={logo} alt="" />
      </div>
      <div className=" h-[80%] w-full flex flex-col  justify-between   items-center bg-white rounded-tl-[50px] pt-4 px-8 pb-2">
        <h2 className="text-2xl font-bold text-center ">Sign up</h2>
        <form onSubmit={(e) => submitHandler(e)} className="flex flex-col ">
           <label className="mb-1 text-gray-700">What your Name</label>
          <div className="flex w-full gap-2 ">
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-2 mb-1 w-1/2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="First Name"
          />
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-2 w-1/2 mb-1 border rounded focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Last Name"
          />
          </div>

          <label className="mb-1 text-gray-700">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 mb-1 border rounded focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="example@gmail.com"
          />
          <label className="mb-1 text-gray-700">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="••••••••"
          />
          <button className="bg-black text-white rounded-lg p-2 hover:bg-gray-800 transition  placeholder:text-base">
            SignUp
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 ">
          Allready have any Account ?{" "}
          <Link to="/login" className="text-black font-medium underline">
            Login
          </Link>
        </p>
        <p className="text-[8px] leading-tight">By Proceeding,you consent to get calls , WhatApp or SMS messages , including by automated means , from BikeBuddy And its affilates to  the number provided.</p>
      </div>
    </div>
  );
};

export default UserSignup;
