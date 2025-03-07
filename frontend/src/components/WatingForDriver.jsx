import React from 'react'

const WatingForDriver = (props) => {
  return (
    <div>
        <div className='w-full shadow-lg flex flex-col justify-start items-center py-2 px-4 overflow-hidden '>
          <div onClick={() =>  {
            props.setWaitingForDriver(true)
            }}
            >
            <i   className="text-2xl   ri-arrow-down-wide-line"></i>
          </div>
          <div className=" w-full flex justify-between items-center pb-2  ">
             <h1 className='font-bold text-black'> Meet at the Pickup Point </h1>
             <div className='bg-black px-2  py-1 text-white'>Min</div>
          </div>
          <div className='flex flex-col justify-start  items-center '>
          
            <div className='w-full border-y-2   flex justify-start  items-center py-2  relative '>
              <div  className="relative w-1/2 flex  justify-start  items-center  ">
              <div className='DriverImg   h-[12vh] w-[12vh] rounded-full overflow-hidden bg-red-200 absolute '>
                 <img className='h-full   w-full object-cover' src="https://i.pinimg.com/236x/84/52/8f/84528f46fb35000e745e82f6cc2b4a58.jpg" alt="" />
              </div>
              <div className="img
                 w-[20vh]  ">
                <img className="h-full   w-full object-cover" src="https://i.pinimg.com/736x/fd/b8/a7/fdb8a74336509e493ba98f5743d21e3c.jpg" alt="" />
              </div>
              </div>
              <div className="CaptainInfo h-full  flex flex-col  justify-center items-end">
                <h2 className='text-[4vw] text-[#bdbdbd] capitalize'>{props.ride?.captain.fullname.firstname}</h2>
                <h1 className='text-[6vw]  font-bold capitalize'> {props.ride?.captain.vehicle.plate}</h1>
                <h2  className='text-[5vw] text-black tracking-tighter'>{props.ride?.captain?.vehicle?.vehicleType}</h2>
                 <span>{props.ride?.otp}</span>
              </div>
            </div>
           <div className='Currentlocation w-full flex  justify-start items-center gap-2 '>
              <div className="">
                <i className="text-[5vw] ri-map-pin-range-fill"></i>
              </div>    
              <div className='border-b-2 py-2'>
                <h1 className='font-semibold'>562/11-A</h1>
                <p>{props.ride?.pickup}</p>
              </div>
           </div>
           <div className='Destiationlocation w-full flex  justify-start items-center gap-2 '>
              <div className="">
              <i className="text-[5vw] ri-square-fill"></i>
              </div>
              <div className='border-b-2 py-2'>
                <h1 className='font-semibold'>Third Wave Coffee</h1>
                <p className='leading-tight tracking-tighter'>{props.ride?.destination}</p>
              </div>
           </div>
           <div className='Cash w-full flex  justify-start items-center gap-2 '>
              <div className="">
                <i className="-[5vw] ri-bank-card-2-fill"></i>
              </div>
              <div className=' py-2'>
                <h1 className='font-semibold'>₨{props.ride?.fare}</h1>
                <h1 className='leading-tight tracking-tighter'> Case Case</h1>
              </div>
           </div>
          </div>

        </div>
    </div>
  )
}

export default WatingForDriver