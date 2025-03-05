import React, { useRef, useState, useEffect, useContext } from "react";
import logo from "../assets/BikeBuddy.png";
import { Link } from "react-router-dom";
import CaptainInfo from "../components/CaptainInfo";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { SocketContext } from "../Context/SocketContext";
import { CaptainDataContext } from "../Context/CaptainContext";
import axios from "axios";

const CaptainHome = () => {
  const [RidePopUpPanel, setRidePopUpPanel] = useState(true);
  const [ConfirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const RidePopUpPanelRef = useRef(null);
  const ConfirmRidePopUpPanelRef = useRef(null);
  const [ride ,setRide] = useState(null)

  const { socket } = useContext(SocketContext);
  const { Captain } = useContext(CaptainDataContext);

  useEffect(() => {

    if (Captain && Captain._id) {
      console.log(Captain)
      socket.emit("join", {
        userId: Captain._id,
        userType: "captain",
      });
    }

    const updateLocation = () => {
      if (navigator.geolocation && Captain && Captain._id) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            socket.emit("update-location-captain", {
              userId: Captain._id,
              location:{
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            }
            });
            // console.log("Location sent:", position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation()
    // return () => clearInterval(locationInterval); 
  }, [Captain, socket]); 

  socket.on('new-ride' ,(data) =>{
    console.log("data:",data)
    setRide(data)
    setRidePopUpPanel(true)
  })
  async function confirmRide (){
   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
    rideId:ride._id,
    captainId:Captain._id,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
   setRidePopUpPanel(false)
   setConfirmRidePopUpPanel(true)
  }


  useGSAP(() => {
    gsap.to(RidePopUpPanelRef.current, {
      transform: RidePopUpPanel ? "translateY(0%)" : "translateY(100%)",
    });
  }, [RidePopUpPanel]);

  useGSAP(() => {
    gsap.to(ConfirmRidePopUpPanelRef.current, {
      transform: ConfirmRidePopUpPanel ? "translateY(0%)" : "translateY(100%)",
    });
  }, [ConfirmRidePopUpPanel]);

  return (
    <div className="h-screen w-full relative bg-cover bg-center bg-[url('https://i.pinimg.com/736x/22/1b/42/221b42fa58ead3ffba876fb0d24cc113.jpg')]">
      <div className="flex items-center justify-between w-full px-2 py-1">
        <div className="w-full flex justify-start items-center relative z-[8]">
          <img className="w-[8rem] filter invert" src={logo} alt="" />
        </div>
        <div className="flex justify-center items-center w-fit bg-white px-2 py-1 rounded-full">
          <Link to="/captains/logout" className="inline-block h-fit w-fit items-center">
            <i className="text-[6vw] ri-logout-circle-r-line"></i>
          </Link>
        </div>
      </div>
      <div className="w-full fixed bottom-0 bg-white px-2 py-4 flex flex-col gap-4">
        <CaptainInfo />
      </div>
      <div ref={RidePopUpPanelRef} className="w-full fixed bottom-0 -translate-y-full bg-white rounded-md flex justify-center items-center z-[1000]">
        <RidePopUp 
        ride={ride}
        setRidePopUpPanel={setRidePopUpPanel}
        setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        confirmRide={confirmRide}
        />
      </div>
      <div ref={ConfirmRidePopUpPanelRef} className="w-full fixed bottom-0 -translate-y-full bg-white rounded-md flex justify-center items-center z-[1000]">
        <ConfirmRidePopup setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;
