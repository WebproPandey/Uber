import React from 'react'
import { Route, Routes } from 'react-router-dom'
import  Home from './Pages/Home'
import UserLogin from './Pages/UserLogin'
import UserSignup from './Pages/UserSignup'
import CaptainLogin from './Pages/CaptainLogin'
import CaptainSignup from './Pages/CaptainSignup'

const App = () => {
  return (
    <div> 
         <Routes>
           <Route path='/' element={<Home/>  } />
           <Route path='/login' element={<UserLogin/>} />
           <Route path='/Signup' element={<UserSignup/>} />
           <Route path='/Captain-Login' element={<CaptainLogin/>} />
           <Route path='/Captain-Signup' element={<CaptainSignup/>} />
         </Routes>
    </div>
  )
}

export default App