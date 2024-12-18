import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Driverlogo from '../assets/DriverLogo.png'


const CaptainSignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [CaptainData, setCaptainData] = useState({});
  
    const submitHandler = (e) => {
      e.preventDefault();
      setCaptainData({
        fullname:{
          firstName:firstName,
          lastName: lastName,
        },
        email: email,
        password: password,
      })
      console.log(CaptainData);
      
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    };
  return (
    <div className="w-full h-screen bg-white flex  flex-col justify-between items-center">
    <div className=" rounded-t-lg w-full h-[20%]  flex justify-center items-center pt-12">
          <img className=" w-full  object-cover" src={Driverlogo} alt="" />
       </div>
    <div className=" h-[80%] w-full bg-[#121212] flex flex-col  justify-between items-center rounded-tl-[50px] pt-6  px-6 pb-2">
      <h2 className="text-2xl font-bold text-center  text-white">Sign up</h2>
      <form onSubmit={(e) => submitHandler(e)} className="flex flex-col">
        <label className="mb-1 text-white">What your Name</label>
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
            className="p-2 w-1/2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Last Name"
          />
          </div>
        <label className="mb-1 text-white">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 mb-1 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="example@gmail.com"
        />
        <label className="mb-1 text-white">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-1 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="••••••••"
        />
        <button className="bg-white text-black rounded-lg p-2 font-semibold hover:bg-gray-800 transition  placeholder:text-base">
          Create Account
        </button>
      </form>
      <p className="text-center text-sm text-white mt-4">
        Captain have any Account ?{" "}
        <Link to="/Captain-Login" className="text-blue-500 font-medium underline">
          Login
        </Link>
      </p>
      <p className="text-[8px] leading-tight text-white">
          This Site is Protected by reCAPTCHA and the  <span>Google Privacy Policy</span>  
          and  <span>Terms of Service apply .</span> 
        </p>
    </div>
  </div>
  )
}

export default CaptainSignUp