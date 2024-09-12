import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import NavbarComponent from './component/NavbarComponent'
import MyLoginform from './page/LoginpageComponent'
import RegisterFormPageComponent from './page/RegisterPageComponent'
import EmailManager from './manage/Emailmanger'

const App = () => {
  return (
    <div>
       <BrowserRouter>
         <NavbarComponent/>
          <Routes>
            <Route path='/login' element={<MyLoginform/>} />
            <Route path='/signup' element={<RegisterFormPageComponent/>} />
            <Route path='/email' element={<EmailManager/>} />
          </Routes>
       </BrowserRouter>
      
    </div>
  )
}

export default App
