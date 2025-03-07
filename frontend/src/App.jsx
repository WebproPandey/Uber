import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import UserLogin from './Pages/UserLogin'
import UserSignup from './Pages/UserSignup'
import CaptainLogin from './Pages/CaptainLogin'
import CaptainSignup from './Pages/CaptainSignup'
import Start from './Pages/Start'
import UserProtectedWraper from './Pages/UserProtectedWraper'
import UserLogout from './Pages/UserLogout'
import CaptainHome from './Pages/CaptainHome'
import CaptainProtectedWraper from './Pages/CaptainProtectedWraper'
import CaptainLogout from './Pages/CaptainLogout'
import Riding from './Pages/Riding'
import CaptainRiding from './Pages/CaptainRiding'

const App = () => {
  return (
    <div> 
         <Routes>
           <Route path='/' element={<Start/>  } />
           <Route path='/login' element={<UserLogin/>} />
           <Route path='/Signup' element={<UserSignup/>} />
           <Route path='/Captain-Login' element={<CaptainLogin/>} />
           <Route path='/Captain-Signup' element={<CaptainSignup/>} />
           <Route path='/riding' element={<Riding/>} /> 
           <Route path='/captain-riding' element={<CaptainRiding/>}  />
           <Route path='/home' element={
             <UserProtectedWraper>
              <Home/>
             </UserProtectedWraper>
           } />
           <Route path='/users/logout' element={
             <UserProtectedWraper>
              <UserLogout/>
             </UserProtectedWraper>
           } />
           <Route path='/captain-Home' element={
            <CaptainProtectedWraper>
              <CaptainHome/>
            </CaptainProtectedWraper>
           } />
           <Route path='captains/logout' element={
             <CaptainProtectedWraper>
              <CaptainLogout/>
            </CaptainProtectedWraper>
           } />
          
           </Routes>

    </div>
  )
}

export default App