import React from 'react'

const LookingForDriver = (props ) => {
  return (
    <div>
         <div className='w-full h-screen shadow-lg flex flex-col justify-start items-center py-4 px-4 overflow-hidden '>
          <div onClick={() =>  {props.setVehicalFound(false)}}>
            <i   className="text-2xl   ri-arrow-down-wide-line"></i>
          </div>
          <div className=" w-full text-black text-lg text-start   ">
             <h1 className='font-bold'> Looking for Driver </h1>
          </div>
          <div className='flex flex-col justify-start  items-center '>
          
            <div className='w-full border-b-2  flex justify-center  items-center py-2'>
              <div className="img  w-22  ">
                <img className="h-full   w-full object-cover" src="https://i.pinimg.com/736x/5c/be/1d/5cbe1d84b6d750fe1847003cbf9af6cd.jpg" alt="" />
              </div>
            </div>
           <div className='Currentlocation w-full flex  justify-start items-center gap-2 '>
              <div className="">
                <i className="text-[5vw] ri-map-pin-range-fill"></i>
              </div>
              <div className='border-b-2 py-2'>
                <h1 className='font-semibold'>562/11-A</h1>
                <p>{props?.pickup}</p>
              </div>
           </div>
           <div className='Destiationlocation w-full flex  justify-start items-center gap-2 '>
              <div className="">
              <i className="text-[5vw] ri-square-fill"></i>
              </div>
              <div className='border-b-2 py-2'>
                <h1 className='font-semibold'>Third Wave Coffee</h1>
                <p className='leading-tight tracking-tighter'>{props?.destination}</p>
              </div>
           </div>
           <div className='Cash w-full flex  justify-start items-center gap-2 '>
              <div className="">
                <i className="-[5vw] ri-bank-card-2-fill"></i>
              </div>
              <div className=' py-2'>
                <h1 className='font-semibold'>₨ {props.fare[props.vehicleType]}</h1>
                <h1 className='leading-tight tracking-tighter'> Case Case</h1>
              </div>
           </div>
          </div>

        </div>
    </div>
  )
}

export default LookingForDriver