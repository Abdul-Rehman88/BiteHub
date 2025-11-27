import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'

function Layout({children}) {
  return (

    <div className="layout overflow-hidden">
        <Header />
      {children}
        <Footer />
    </div>
  )
}

export default Layout