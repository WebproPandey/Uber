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
  const panelRef = useRef(null);
  const panleClodeRef = useRef(null);
  const submitHandeler = (e) => {
    e.preventDefault();
  };
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        paddingTop:12
      })
      gsap.to(panleClodeRef.current, {
        display: 'block',
      })
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
      })
      gsap.to(panleClodeRef.current, {
        display: 'none',
      })
    }
  }, [panelOpen]);

  return (
    <div className=" h-screen  w-full relative bg-coverbg-center bg-[url(https://i.pinimg.com/736x/22/1b/42/221b42fa58ead3ffba876fb0d24cc113.jpg)]">
      <div className="w-full flex justify-center items-center  relative  z-[8]">
        <img className="w-[8rem] filter invert" src={logo} alt="" />
      </div>
      <div className="h-screen  w-full absolute flex flex-col  justify-end  top-0 left-0 px-4   bg-white  ">
        <div className=" h-[35%] w-full bg-white  rounded-tl-md rounded-tr-md  py-2 flex flex-col  gap-2 relative">
            <h5 ref={panleClodeRef} onClick={() => {setPanelOpen(false)}} className="text-xl z-[9]  inline-block relative  w-fit "><i className="ri-arrow-down-wide-line inline-block "></i></h5>
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
        <div ref={panelRef} className="h-0 w-full bg-[#dadada] overflow-x-auto ">
          <LocataionSearchPanel/>
        </div>
      </div>
    </div>
  );
};

export default Home;
