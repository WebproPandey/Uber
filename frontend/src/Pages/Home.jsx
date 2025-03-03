import React, { useRef } from "react";
import logo from "../assets/BikeBuddy.png";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from 'axios';
import "remixicon/fonts/remixicon.css";
import LocataionSearchPanel from "../components/LocataionSearchPanel";
import VehicalPanel from "../components/VehicalPanel";
import ConforVehicalPanel from "../components/ConforVehicalPanel";
import LookingForDriver from "../components/LookingForDriver";
import WatingForDriver from "../components/WatingForDriver";
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [VehicalPanelOpen ,setVehicalPanelOpen] = useState(false)
  const [ConformVehicalOpen , setConformVehicalOpen ] = useState(false)
  const [VehicalFound , setVehicalFound] =  useState(false)
  const [WatingForDrivers , setWatingForDrivers] =  useState(false)
  const [pickupSuggestions , setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField ,setActiveField] = useState(null)

  const panelRef = useRef(null);
  const panleCloseRef = useRef(null);
  const VehicalPanelRef = useRef(null);
  const ConformVehicalRef = useRef(null)
  const VehicalFoundRef = useRef(null)  
  const WatingForDeiverRef =  useRef(null) 



  const handlePickupChange =  async (e) =>{
    setPickup(e.target.value)
    try {
      const response =  await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {params:{input: e.target.value },
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      setPickupSuggestions(response.data.autoSuggestions);
    console.log(response.data.autoSuggestions);

      
    } catch (error) {
      console.log(error.message);
      
    }
  }

  const handleDestinationChange =  async (e) =>{
    setDestination(e.target.value)
    try {
      const response =  await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {params:{input: e.target.value},
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      setDestinationSuggestions(response.data.autoSuggestions);
      console.log(response.data.autoSuggestions);
      
      
    } catch (error) {
      console.log(error.message);
    }
  }


  const submitHandeler = (e) => {
    e.preventDefault();
  };
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding:12
      })
      gsap.to(panleCloseRef.current, {
        display: 'block',
      })
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding:0
      })
      gsap.to(panleCloseRef.current, {
        display: 'none',
      })
    }
  }, [panelOpen]);

  useGSAP(()=>{
    if(VehicalPanelOpen){
      gsap.to(VehicalPanelRef.current,{
        transform:'translateY(0%)'
      })
    }
    else{
      gsap.to(VehicalPanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[VehicalPanelOpen])

  useGSAP(()=>{
    if(ConformVehicalOpen){
      gsap.to(ConformVehicalRef.current,{
        transform:'translateY(0%)'
      })
    }
    else{
      gsap.to(ConformVehicalRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[ConformVehicalOpen])
  
  useGSAP(()=>{
    if(VehicalFound){
      gsap.to(VehicalFoundRef.current,{
        transform:'translateY(0%)'
      })
    }
    else{
      gsap.to(VehicalFoundRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[VehicalFound])
  useGSAP(()=>{
    if(WatingForDrivers){
      gsap.to(WatingForDeiverRef.current,{
        transform:'translateY(0%)'
      })
    }
    else{
      gsap.to(WatingForDeiverRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[WatingForDrivers])

  return (
    <div className=" h-screen  w-full relative bg-coverbg-center bg-[url('https://i.pinimg.com/736x/22/1b/42/221b42fa58ead3ffba876fb0d24cc113.jpg')]">
      <div className="w-full flex justify-center items-center  relative  z-[8]">
        <img className="w-[8rem] filter invert" src={logo} alt="" />
      </div>
      <div className="h-screen  w-full absolute flex flex-col  justify-end  top-0 left-0      ">
        <div className=" h-[35%] w-full bg-white  rounded-tl-md rounded-tr-md  px-4 py-2 flex flex-col  gap-2 relative">
            <h5 ref={panleCloseRef} onClick={() => {setPanelOpen(false)}} className="text-xl z-[9]  inline-block relative  w-fit "><i className="ri-arrow-down-wide-line inline-block "></i></h5>
            <h1 className="text-2xl font-bold text-black">Find a trip</h1>
          <form
            onSubmit={(e) => submitHandeler(e)}
            className="w-full max-w-[400px]   rounded-lg flex flex-col  gap-4 relative "
          >
            <div className="line absolute top-[50%] -translate-y-1/2 left-4 h-10 w-1 border-dashed border-2 border-gray-900 before:absolute before:content-[''] before:w-3 before:h-3 before:bg-red-500 before:rounded-full before:top-[-15px] before:left-[-6px] after:absolute after:content-[''] after:w-3 after:h-3 after:bg-green-500 after:rounded-full after:bottom-[-15px] after:left-[-6px]"></div>
            <div className="">
              <input
                type="text"
                onClick={() => {setPanelOpen(true)
                  setActiveField('pickup')

                }}
                value={pickup}
                onChange={handlePickupChange}
                className="w-full px-8  py-2 border rounded-md focus:outline-none bg-[#eee] focus:ring-2 focus:ring-black"
                placeholder="Enter pick-up location"
                required
              />
            </div>
            <div className="">
              <input
                type="text"
                onClick={() =>{ setPanelOpen(true)
                  setActiveField('destination')
                }}
                value={destination}
                onChange={handleDestinationChange}
                className="w-full px-8 py-2 border rounded-md focus:outline-none bg-[#eee] focus:ring-2 focus:ring-black"
                placeholder="Enter drop-off location"
                required
              />
            </div>
          </form>
        </div>
        <div ref={panelRef} className="h-0 w-full bg-white overflow-x-auto  z-[9999] ">
          <LocataionSearchPanel   
           suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
           setPanelOpen={setPanelOpen}
           setVehiclePanel={setVehicalPanelOpen}
           setPickup={setPickup}
           setDestination={setDestination}
           activeField={activeField}
          />
        </div>
        
      </div>
      <div  ref={VehicalPanelRef} className="w-full fixed translate-y-full  bottom-0 bg-white rounded-md flex justify-center items-center z-10 ">  
       <VehicalPanel  setVehicalPanelOpen={setVehicalPanelOpen} setConformVehicalOpen={setConformVehicalOpen} />
     </div>
     <div  ref={ConformVehicalRef} className="w-full fixed translate-y-full  bottom-0  bg-white rounded-md flex justify-center items-center z-10 ">  
        <ConforVehicalPanel setConformVehicalOpen={setConformVehicalOpen}  setVehicalFound={setVehicalFound}/>
     </div>
     <div ref={VehicalFoundRef}  className="w-full fixed   bottom-0  bg-white rounded-md flex justify-center items-center z-10 ">  
       <LookingForDriver setVehicalFound={setVehicalFound} />
     </div>
     <div  ref={WatingForDeiverRef} className="w-full fixed   bottom-0 translate-y-full  bg-white rounded-md flex justify-center items-center z-10 ">  
        <WatingForDriver WatingForDrivers={WatingForDrivers}  />
     </div>


    </div>
  );
};

export default Home;
