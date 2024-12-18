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

const App = () => {
  return (
    <div> 
         <Routes>
           <Route path='/' element={<Start/>  } />
           <Route path='/login' element={<UserLogin/>} />
           <Route path='/Signup' element={<UserSignup/>} />
           <Route path='/Captain-Login' element={<CaptainLogin/>} />
           <Route path='/Captain-Signup' element={<CaptainSignup/>} />
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
           </Routes>

    </div>
  )
}

export default App