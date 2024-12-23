import React from 'react'
import { Link } from 'react-router-dom';

const ConfirmRidePopup = (props) => {
  return (
    <div>
        <div className="w-full h-screen  shadow-lg flex flex-col gap-4 justify-start items-center py-4 px-4 overflow-hidden ">
        {/* <div onClick={() =>{
            props.setConfirmRidePopUpPanel(true);
        }}>
          <i className="text-2xl   ri-arrow-down-wide-line"></i>
        </div> */}
        <div className=" w-full text-black text-lg text-start   ">
          <h1 className="font-bold">Confirm This  Ride  to Start!</h1>
        </div>
        <div className="flex flex-col gap-4 justify-start  items-center ">
          <div className="flex border-b-2   w-full  justify-between items-center bg-yellow-300 p-1 rounded-md">
          <div className="Captainiamge flex justify-center gap-2 items-center py-2">
           <img className='h-[10vh]  rounded-full  w-[10vh] object-cover' src="https://i.pinimg.com/236x/84/52/8f/84528f46fb35000e745e82f6cc2b4a58.jpg" alt="" />
           <h1>CaptainName</h1>
          </div>
          <h1 className="font-bold">2.2KM</h1>
          </div>

          <div className="Currentlocation w-full flex  justify-start items-center gap-2 ">
            <div className="">
              <i className="text-[5vw] ri-map-pin-range-fill"></i>
            </div>
            <div className="border-b-2 py-2">
              <h1 className="font-semibold">562/11-A</h1>
              <p>KailKondrahalli,Bengaluru, Karnataka</p>
            </div>
          </div>
          <div className="Destiationlocation w-full flex  justify-start items-center gap-2 ">
            <div className="">
              <i className="text-[5vw] ri-square-fill"></i>
            </div>
            <div className="border-b-2 py-2">
              <h1 className="font-semibold">Third Wave Coffee</h1>
              <p className="leading-tight tracking-tighter">
                17th cross Rd , PWD Quarters ,1st Sector ,HSR Layout. Bangaluru
                , Karnataka
              </p>
            </div>
          </div>
          <div className="Cash w-full flex  justify-start items-center gap-2 ">
            <div className="">
              <i className="-[5vw] ri-bank-card-2-fill"></i>
            </div>
            <div className=" py-2">
              <h1 className="font-semibold">₨ 120.20</h1>
              <h1 className="leading-tight tracking-tighter"> Case Case</h1>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <button  onClick={() =>{
                props.setConfirmRidePopUpPanel(false)
                props.setRidePopUpPanel(false)
              }}
            className="w-full  text-center text-white  bg-red-500   font-bold capitalize py-2 rounded-lg">
              Cancel
            </button>
            <Link 
            className="w-full  text-center bg-green-500 text-white  font-bold capitalize py-2 rounded-lg">
              Confirm
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopup