import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/BikeBuddy.png";
import { useContext } from "react";
import { SocketContext } from "../Context/SocketContext";
import LiveTracking from "../components/LiveTracking";


const Riding = ({props}) => {
  const location =    useLocation()
  const {ride} =  location.state ||  {}
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()


  socket.on("ride-ended", () => {
    navigate('/home')
})


  return (
    <div className=" h-screen  w-full relative flex flex-col justify-end items-center ">
        <div className="h-full  w-full  absolute  top-0  left-0">
        <LiveTracking/>
        </div>
      <div className="flex  items-center justify-between w-full px-2 py-1 absolute  top-0  left-0 ">
        <div className="w-full flex justify-start items-center  relative  z-[8]">
          <img className="w-[8rem] filter invert" src={logo} alt="" />
        </div>
        <div className="flex justify-center items-center w-fit   ">
        <Link to='/home' className=" inline-block  h-fit  w-fit    items-center">
           <i className="text-[6vw] ri-home-9-fill"></i>
        </Link>
        </div>
      </div>
      
      <div className='flex flex-col h-fit items-center  justify-end bg-white px-2  relative  z-10'>
          
        <div className='w-full border-y-2   flex justify-start  items-center py-2 px-2 relative '>
            <div  className="relative w-1/2 flex  justify-start  items-center  ">
            <div className="img
               w-[20vh]  ">
              <img className="h-full   w-full object-cover" src="https://i.pinimg.com/736x/fd/b8/a7/fdb8a74336509e493ba98f5743d21e3c.jpg" alt="" />
            </div>
            </div>
            <div className="CaptainInfo h-full  w-1/2 flex flex-col  justify-center items-end">
              <h2 className='text-[4vw] text-[#bdbdbd]'>{ride.captain.fullname.firstname}</h2>
              <h1 className='text-[6vw]  font-bold'> {ride.captain.vehicle.plate}</h1>
              <h2  className='text-[5vw] text-black tracking-tighter'>{ride.captain.vehicle.vehicleType}</h2>
               <span><i className="ri-star-fill"></i>4.5</span>
            </div>
        </div>
         <div className='Destiationlocation w-full flex  justify-start items-center gap-2 '>
            <div className="">
            <i className="text-[5vw] ri-square-fill"></i>
            </div>
            <div className='border-b-2 py-2'>
              <h1 className='font-semibold'>Third Wave Coffee</h1>
              <p className='leading-tight tracking-tighter'>{ride.destination}</p>
            </div>
         </div>
         <div className='Cash w-full flex  justify-start items-center gap-2 '>
            <div className="">
              <i className="-[5vw] ri-bank-card-2-fill"></i>
            </div>
            <div className=' py-2'>
              <h1 className='font-semibold'>₨ {ride.fare}</h1>
              <h1 className='leading-tight tracking-tighter'> Case Case</h1>
            </div>
         </div>
         <button 
           className='w-full  text-center bg-green-500 text-white  font-bold capitalize py-2 rounded-lg'>
              Make a Payment
           </button>
        </div>
    </div>
  );
};

export default Riding;
