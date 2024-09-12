import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import NavbarComponent from './component/NavbarComponent'
import MyLoginform from './page/LoginpageComponent'
import RegisterFormPageComponent from './page/RegisterPageComponent'


const App = () => {
  return (
    <div>
       <BrowserRouter>
         <NavbarComponent/>
          <Routes>
            <Route path='/login' element={<MyLoginform/>} />
            <Route path='/signup' element={<RegisterFormPageComponent/>} />
          </Routes>
       </BrowserRouter>
      
    </div>
  )
}

export default App
