import React from 'react'

const LocataionSearchPanel = (props) => {  
  const  location = [
    {
    location: '24B, near kapoor\'s cafe ,Sheriyan Codeing Scholl , bhopal',
    },
    {
      location: '14B,T-Satal , near Andand Nager  , bhopal',
    },
    {
      location: '24B, near mohan\'s cafe ,  bhopal',
    }
  
  ] 


  return (
    <div className='flex flex-col justify-start  items-start gap-5'>
       {location.map((data,index) =>{
        return(
         <div
          key={index}
          onClick={
            () => {
              props.setVehicalPanel(true)
              props.setPanelOpen(false)
            }
          }
         className='flex w-full justify-start items-center gap-4 active:border-[#222] border p-2 rounded-lg '>
          <h2 className='bg-[#eee]  rounded-full px-3 py-2 flex justify-center items-center'>
            <i className="ri-map-pin-line text-[5vw]"></i>
          </h2>
          <h2 className='font-medium tracking-tighter leading-tight'>{data.location}</h2>
          </div>
        )
       })}

     
   
     
     
    </div>
  )
}

export default LocataionSearchPanel