import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Driverlogo from "../assets/DriverLogo.png";
import { CaptainDataContext } from "../Context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePalte, setVehiclePalte] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const { Captain, setCaptain } = useContext(CaptainDataContext);
  const navigte = useNavigate()

  const submitHandler =  async (e) => {
    e.preventDefault();
    const CaptainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePalte,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      }
    }
    const response =  await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register` ,CaptainData)
    if(response.status === 201){
      const data =  response.data
      localStorage.setItem("token", data.token);
      navigte("/captain-home")
    } 
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePalte("");
    setVehicleCapacity("");
    setVehicleType("");
  };
  return (
    <div className="w-full h-screen bg-white flex  flex-col justify-between items-center">
      <div className=" rounded-t-lg w-full h-[20%]  flex justify-center items-center pt-12">
        <img className=" w-full  object-cover" src={Driverlogo} alt="" />
      </div>
      <div className=" h-fit w-full bg-[#121212] flex flex-col  justify-between items-center rounded-tl-[50px] pt-6  px-6 pb-2">
        <h2 className="text-2xl font-bold text-center  text-white">Sign up</h2>
        <form onSubmit={(e) => submitHandler(e)} className="flex flex-col">
          <label className="mb-1 text-white">What your Name</label>
          <div className="flex w-full gap-2 ">
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-2 mb-2 w-1/2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
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
            className="p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="example@gmail.com"
          />
          <label className="mb-1 text-white">Password</label>
          <input
            type="password"
            required
            value={password}
            minLength={8} 
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="••••••••"
          />
          <label className="mb-1 text-white">Vehical Information</label>
          <div className="grid grid-cols-2 w-full gap-2 mb-2 ">
            <input
              type="text"
              required
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="p-2 mb-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="VehicleColor"
            />
            <input
              type="number"
              required
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className="p-2 w-full mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="VehicleCapacity"
            />
            <input
              type="text"
              required
              value={vehiclePalte}
              onChange={(e) => setVehiclePalte(e.target.value)}
              className="p-2 mb-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="VehiclePalte"
            />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="p-2 w-full mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="" disabled className="text-gray-400">
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="motorcycle">Bike</option>
              <option value="auto">Moto</option>
            </select>
          </div>
          <button className="bg-white text-black rounded-lg p-2 font-semibold hover:bg-gray-800 transition  placeholder:text-base">
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-white my-4">
          Captain have any Account ?{" "}
          <Link
            to="/Captain-Login"
            className="text-blue-500 font-medium underline"
          >
            Login
          </Link>
        </p>
        <p className="text-[8px] leading-tight text-white">
          This Site is Protected by reCAPTCHA and the{" "}
          <span>Google Privacy Policy</span>
          and <span>Terms of Service apply .</span>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignUp;
