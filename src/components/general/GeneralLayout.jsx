import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const GeneralLayout = () => {
  return (
    <>
      <Header />
      <div>
        <h2>General Layout</h2>
      </div>
      <Outlet />
      <Footer />
    </>
  )
}

export default GeneralLayout
