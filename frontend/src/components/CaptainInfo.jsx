import React, { useContext } from 'react'
import { CaptainDataContext } from '../Context/CaptainContext'

const CaptainInfo = () => {
  const {Captain}  =  useContext(CaptainDataContext)
  
  
  return (
    <div>
         <div className='flex justify-between items-center py-2'>
          <div className='DriverImg  flex items-center justify-center '>
            <img className='h-[12vh]  rounded-full  w-[12vh] object-cover' src="https://i.pinimg.com/236x/84/52/8f/84528f46fb35000e745e82f6cc2b4a58.jpg" alt="" />
            <h1 className='text-sm font-bold text-center'>{Captain.fullname.firstname + " " + Captain.fullname.lastname }</h1>
          </div>
          <div>
            <p className='text-center text-black font-bold '>₨ 295.20</p>
            <p className='text-center text-[#dbdbdb]'>Earned</p>
          </div>
          </div>
          <div className='WorkInfo  flex justify-between  items-center w-full  bg-gray-300 rounded-md p-1'>
             <div className="OnineHours   flex  flex-col justify-center items-center  ">
              <div className='flex flex-col justify-center items-start'> <i className="ri-speed-up-line  text-[9vw]"></i>
                10.2</div>
              <h1 className='text-sm font-bold '>Online Hours</h1>
             </div>
             <div className="OnineHours   flex flex-col justify-center items-center">
              <div className='flex flex-col justify-center items-start'> <i className="ri-speed-up-line  text-[9vw]"></i>
                10.2</div>
              <h1 className='text-sm font-bold '>Online Hours</h1>
             </div>
             <div className="OnineHours  flex flex-col justify-center items-center ">
              <div className='flex flex-col justify-center items-start'> <i className="ri-booklet-line text-[9vw]"></i>
                10.2</div>
              <h1 className='text-sm font-bold '>Online Hours</h1>
             </div>
          </div>
    </div>
  )
}

export default CaptainInfo