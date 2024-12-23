import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/BikeBuddy.png";


const Riding = () => {
  return (
    <div className=" h-screen  w-full relative ">
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
      <div className="h-full w-full flex justify-end  items-end bg-coverbg-center bg-[url('https://i.pinimg.com/736x/22/1b/42/221b42fa58ead3ffba876fb0d24cc113.jpg')]">
      <div className='flex flex-col justify-start  items-center bg-white px-2 '>
          
        <div className='w-full border-y-2   flex justify-start  items-center py-2  relative '>
            <div  className="relative w-1/2 flex  justify-start  items-center  ">
            <div className="img
               w-[20vh]  ">
              <img className="h-full   w-full object-cover" src="https://i.pinimg.com/736x/fd/b8/a7/fdb8a74336509e493ba98f5743d21e3c.jpg" alt="" />
            </div>
            </div>
            <div className="CaptainInfo h-full  flex flex-col  justify-center items-end">
              <h2 className='text-[4vw] text-[#bdbdbd]'>CaptainName</h2>
              <h1 className='text-[6vw]  font-bold'> UP-70-tb-7200</h1>
              <h2  className='text-[5vw] text-black tracking-tighter'>Baja RE, AutoRickshaw</h2>
               <span><i className="ri-star-fill"></i>4.5</span>
            </div>
        </div>
         <div className='Destiationlocation w-full flex  justify-start items-center gap-2 '>
            <div className="">
            <i className="text-[5vw] ri-square-fill"></i>
            </div>
            <div className='border-b-2 py-2'>
              <h1 className='font-semibold'>Third Wave Coffee</h1>
              <p className='leading-tight tracking-tighter'>17th cross Rd , PWD Quarters ,1st Sector ,HSR Layout. Bangaluru , Karnataka</p>
            </div>
         </div>
         <div className='Cash w-full flex  justify-start items-center gap-2 '>
            <div className="">
              <i className="-[5vw] ri-bank-card-2-fill"></i>
            </div>
            <div className=' py-2'>
              <h1 className='font-semibold'>₨ 120.20</h1>
              <h1 className='leading-tight tracking-tighter'> Case Case</h1>
            </div>
         </div>
         <button 
           className='w-full  text-center bg-green-500 text-white  font-bold capitalize py-2 rounded-lg'>
              Make a Payment
           </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
