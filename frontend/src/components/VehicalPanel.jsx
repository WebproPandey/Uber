import React from 'react'

const VehicalPanel = (props) => {
  return (
    <div>
        <div className="w-full  shadow-lg rounded-lg overflow-hidden">
          <div className="flex justify-center items-center  ">
            <div onClick={() => 
                {props.setVehicalPanelOpen(false)}}>
              <i   className="text-2xl   ri-arrow-down-wide-line"></i>
            </div>
           </div>
        <div className=" text-black text-lg text-start px-4 border-b-2 font-semibold">
           Choose Vehical
        </div>

        <div className="p-4">
          <div onClick={()=>{
            props.setConformVehicalOpen(true)
            props.selectVehicle('auto')
          }} className="border active:border-black  rounded-lg mb-4  p-2">
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
                <p className="text-sm font-semibold text-green-600">₨ {props.fare.auto}</p>
                <p className="text-sm line-through text-gray-400">₨ 130</p>
              </div>
            </div>
          
          </div>

          <div onClick={()=>{
            props.setConformVehicalOpen(true)
            props.selectVehicle('moto')

          }} 
          className="border active:border-black  rounded-lg mb-4 p-2">
            <div className="flex justify-between items-center">
              <div className="img h-12 w-16  ">
                <img className=" w-full h-full object-cover" src="https://i.pinimg.com/736x/0f/b0/b0/0fb0b022e23209f8081e40edf62cc9f0.jpg" alt="" />
              </div>
              <div className="leading-tight">
              <h3 className="text-sm font-semibold">Buddy Go <span><i className="ri-user-fill"></i> 1</span></h3>
              <p className="text-[4vw] text-gray-500">2 min away • 1 seats</p>
              <p className="text-[4vw] text-gray-500">Affordable, Compact rides</p>
              </div>
              <div className="text-right bg-slate-100">
                <p className="text-sm font-semibold text-green-600">₨ {props.fare.moto}</p>
                <p className="text-sm line-through text-gray-400">₨ 130</p>
              </div>
            </div>
          </div>

          <div onClick={()=>{
            props.setConformVehicalOpen(true)
            props.selectVehicle('car')

          }} 
          className="border  active:border-black  rounded-lg  p-2">
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
                <p className="text-sm font-semibold text-green-600">₨ {props.fare.car}</p>
                <p className="text-sm line-through text-gray-400">₨ 150</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default VehicalPanel