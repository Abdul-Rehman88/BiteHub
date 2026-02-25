// import { useState } from 'react'
import Layout from './components/layout/Layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Home,Reservation, Menu,Cart} from './pages/index.jsx'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/reservation' element={<Reservation/>} />
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/cart' element={<Cart/>}/>
          </Routes>
        </Layout>
      </Router>
    </>
 
)
}

export default App
