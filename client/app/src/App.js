import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { LoginDetailsProvider } from './contextApis/LoginDetailsContext'
import NavbarComponent from './component/NavbarComponent'
import MyLoginform from './page/LoginpageComponent'
import RegisterFormPageComponent from './page/RegisterPageComponent'
import HomepageComponent from './page/HomepageComponent'
import EmailManager from './manage/Emailmanger'

const App = () => {
  return (
    <div>
       <BrowserRouter>
       <LoginDetailsProvider>
         <NavbarComponent/>
          <Routes>
            <Route path='/login' element={<MyLoginform/>} />
            <Route path='/signup' element={<RegisterFormPageComponent/>} />
            <Route path='/email' element={<EmailManager/>} />
            <Route path='/home' element={<HomepageComponent/>} />
          </Routes>
          </LoginDetailsProvider>
       </BrowserRouter>
      
    </div>
  )
}

export default App
