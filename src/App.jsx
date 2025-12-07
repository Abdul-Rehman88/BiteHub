// import { useState } from 'react'
import Layout from './components/layout/Layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Home,Reservation} from './pages/index.jsx'
function App() {
  
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/reservation' element={<Reservation/>} />
        </Routes>
      </Layout>
    </Router>
 )
}

export default App
