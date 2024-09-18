import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { LoginDetailsProvider } from './contextApis/LoginDetailsContext'
import NavbarComponent from './component/NavbarComponent'
import Footer from './component/FooterComponent'
import MyLoginform from './page/LoginpageComponent'
import RegisterFormPageComponent from './page/RegisterPageComponent'
import HomepageComponent from './page/HomepageComponent'
import EmailManager from './manage/Emailmanger'
import Accountpage from './page/Accountpage'
import Createpost from './page/Createpost'
import Postpage from './page/Postpage'


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
            <Route path='/account' element={<Accountpage/>} />
            <Route path='/createpost' element={<Createpost/>} />
            <Route path='/postpage' element={<Postpage/>} />
          </Routes>
          <Footer/>
          </LoginDetailsProvider>
       </BrowserRouter>
      
    </div>
  )
}

export default App
