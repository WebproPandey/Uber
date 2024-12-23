import React, { useRef, useState } from 'react'
import logo from "../assets/BikeBuddy.png";
import { Link } from 'react-router-dom';
import CaptainInfo from '../components/CaptainInfo';
import RidePopUp from '../components/RidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidePopup from '../components/ConfirmRidePopup';

const CaptainHome = () => {

const [RidePopUpPanel , setRidePopUpPanel] = useState(true)
const [ConfirmRidePopUpPanel , setConfirmRidePopUpPanel] = useState(false)
const RidePopUpPanelRef  = useRef(null)
const ConfirmRidePopUpPanelRef = useRef(null)

useGSAP(()=>{
  if(RidePopUpPanel){
    gsap.to(RidePopUpPanelRef.current,{
      transform:'translateY(0%)'
    })
  }
  else{
    gsap.to(RidePopUpPanelRef.current,{
      transform:'translateY(100%)'
    })
  }
},[RidePopUpPanel])

useGSAP(()=>{
  if(ConfirmRidePopUpPanel){
    gsap.to(ConfirmRidePopUpPanelRef.current,{
      transform:'translateY(0%)'
    })
  }
  else{
    gsap.to(ConfirmRidePopUpPanelRef.current,{
      transform:'translateY(100%)'
    })
  }
},[ConfirmRidePopUpPanel])
 
  

  return (
     <div className=" h-screen  w-full relative bg-coverbg-center bg-[url('https://i.pinimg.com/736x/22/1b/42/221b42fa58ead3ffba876fb0d24cc113.jpg')]">
      <div className="flex  items-center justify-between w-full px-2 py-1  ">
        <div className="w-full flex justify-start items-center  relative  z-[8]">
          <img className="w-[8rem] filter invert" src={logo} alt="" />
        </div>
        <div className="flex justify-center items-center w-fit bg-white px-2  py-1 rounded-full   ">
        <Link to='/captains/logout' className=" inline-block  h-fit  w-fit    items-center">
          <i className="text-[6vw] ri-logout-circle-r-line"></i>
        </Link>
        </div>
      </div>
      <div className='w-full fixed  bottom-0   bg-white px-2 py-4 flex flex-col  gap-4 '>
        <CaptainInfo />
      </div>
      <div ref={RidePopUpPanelRef} className="w-full fixed   bottom-0  -translate-y-full bg-white rounded-md flex justify-center items-center z-[1000] ">  
        <RidePopUp setRidePopUpPanel={setRidePopUpPanel}  setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
      </div>
      <div ref={ConfirmRidePopUpPanelRef} className="w-full fixed   bottom-0  -translate-y-full bg-white rounded-md flex justify-center items-center z-[1000] ">  
        <ConfirmRidePopup setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}  />
      </div>


    </div>
  )
}

export default CaptainHome