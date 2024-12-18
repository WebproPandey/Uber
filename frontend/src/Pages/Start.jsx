import React from 'react'
import logo  from '../assets/BikeBuddy.png'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='h-screen  w-full bg-[#121212] flex  items-center justify-between flex-col 
    bg-[url(https://i.pinimg.com/736x/c1/5a/19/c15a191dbaf1564c290c780f38e15157.jpg)] bg-cover bg-center
    '>
      <img className='w-[8rem]' src={logo} alt="" />
      <div className='bg-white p-4'>
        <h4 className='text-xl font-bold '>Get Started With BikeBuddy</h4>
        <Link to='/login' className='flex justify-center  items-center w-full bg-black  text-white  capitalize  py-3 mt-5 rounded-md'>Continue</Link>
      </div>
    </div>
  )
}

export default Start