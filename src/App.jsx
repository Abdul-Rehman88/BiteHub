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
  //     <div className="App bg-[#FFF8F1]  min-h-screen flex justify-center items-center">
  //       <h1>hello</h1>
  //       #FFF8F1 background
  //       #F5F5F5 background
  //       #222222 text
  //       #1A1A1A heading
  //       #424242 subheading
  //       #1A1A1A  , #FFB703 buttons
        
  //       </div>
  //
)

}

export default App
