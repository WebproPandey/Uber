import React, { useRef } from "react";
import logo from "../assets/BikeBuddy.png";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocataionSearchPanel from "../components/LocataionSearchPanel";
const Home = () => {
  const [pikup, setPinkup] = useState();
  const [destination, setDestination] = useState();
  const [panelOpen, setPanelOpen] = useState(false);
  const [VehicalPanelOpen ,setVehicalPanelOpen] = useState(false)
  const panelRef = useRef(null);
  const panleCloseRef = useRef(null);
  const VehicalPanelRef = useRef(null);
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
                onClick={() => {setPanelOpen(true)}}
                value={pikup}
                onChange={(e) => setPinkup(e.target.value)}
                className="w-full px-8  py-2 border rounded-md focus:outline-none bg-[#eee] focus:ring-2 focus:ring-black"
                placeholder="Enter pick-up location"
                required
              />
            </div>
            <div className="">
              <input
                type="text"
                onClick={() =>{ setPanelOpen(true)}}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-8 py-2 border rounded-md focus:outline-none bg-[#eee] focus:ring-2 focus:ring-black"
                placeholder="Enter drop-off location"
                required
              />
            </div>
          </form>
        </div>
        <div ref={panelRef} className="h-0 w-full bg-white overflow-x-auto  ">
          <LocataionSearchPanel   setPanelOpen={setPanelOpen} setVehicalPanel={setVehicalPanelOpen} />
        </div>
      </div>
      <div  ref={VehicalPanelRef} className="w-full fixed translate-y-full  bottom-0 bg-gray-100 flex justify-center items-center z-[999] ">  
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className=" text-black text-lg text-start p-4 border-b-2 font-semibold">
           Choose Vehical
        </div>

        <div className="p-4">
          <div className="border active:border-black  rounded-lg mb-4  p-2">
            <div className="flex justify-between items-center   ">
              <div className="img h-12 w-16 ">
                <img className="h-full   w-full object-cover" src="https://i.pinimg.com/736x/5c/be/1d/5cbe1d84b6d750fe1847003cbf9af6cd.jpg" alt="" />
              </div>
              <div className="leading-tight">
              <h3 className="text-sm font-semibold">Buddy Go <span><i className="ri-user-fill"></i> 3</span></h3>
              <p className="text-[4vw] text-gray-500">2 min away • 3 seats</p>
              <p className="text-[4vw] text-gray-500">Affordable, Compact rides</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-green-600">₨ 100</p>
                <p className="text-sm line-through text-gray-400">₨ 130</p>
              </div>
            </div>
          
          </div>

          <div className="border active:border-black  rounded-lg mb-4 p-2">
            <div className="flex justify-between items-center">
              <div className="img h-12 w-16  ">
                <img className=" w-full h-full object-cover" src="https://i.pinimg.com/736x/0f/b0/b0/0fb0b022e23209f8081e40edf62cc9f0.jpg" alt="" />
              </div>
              <div className="leading-tight">
              <h3 className="text-sm font-semibold">Buddy Go <span><i className="ri-user-fill"></i> 1</span></h3>
              <p className="text-[4vw] text-gray-500">2 min away • 1 seats</p>
              <p className="text-[4vw] text-gray-500">Affordable, Compact rides</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-green-600">₨ 64</p>
                <p className="text-sm line-through text-gray-400">₨ 130</p>
              </div>
            </div>
          </div>

          <div className="border  active:border-black  rounded-lg  p-2">
            <div className="flex justify-between items-center">
            <div className="img h-12 w-16  ">
                <img className=" w-full h-full object-contain" src="https://i.pinimg.com/736x/d7/ee/49/d7ee492124189c6cdc08750eaa39a418.jpg" alt="" />
              </div>
              <div className="leading-tight">
              <h3 className="text-sm font-semibold">Buddy Go <span><i className="ri-user-fill"></i> 4</span></h3>
              <p className="text-[4vw] text-gray-500">2 min away • 5 seats</p>
              <p className="text-[4vw] text-gray-500">Affordable, Compact rides</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-green-600">₨ 120</p>
                <p className="text-sm line-through text-gray-400">₨ 150</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
};

export default Home;
