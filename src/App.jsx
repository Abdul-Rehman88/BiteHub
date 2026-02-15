// import { useState } from 'react'
import Layout from './components/layout/Layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Home,Reservation, Menu} from './pages/index.jsx'
function App() {
  
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/reservation' element={<Reservation/>} />
          <Route path='/menu' element={<Menu/>}/>
        </Routes>
      </Layout>
    </Router>
 )
}

export default App
