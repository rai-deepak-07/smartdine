import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const GeneralLayout = () => {
  return (
    <>
      {/* Header Section */}
      <Header />

      {/* Main Content Section */}
      <Outlet />
      
      {/* Footer Section */}
      <Footer />
    </>
  )
}

export default GeneralLayout
