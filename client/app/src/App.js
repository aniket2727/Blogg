import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import NavbarComponent from './component/NavbarComponent'
const App = () => {
  return (
    <div>
       <BrowserRouter>
         <NavbarComponent/>
          <Routes>
            <Route/>
          </Routes>
       </BrowserRouter>
      
    </div>
  )
}

export default App
