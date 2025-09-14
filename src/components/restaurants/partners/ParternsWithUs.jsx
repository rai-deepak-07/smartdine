import React from 'react'
import Header from './Header'
import Home from './Home'
import Features from './Features'
import Faq from './Faq'
import Footer from '../../general/layout/Footer'

const ParternsWithUs = () => {
  document.title = "Add Restaurant | SmartDine";

  return (
   <>
   <Header/>
   <Home/>
   <Features/>
   <Faq/>
   <Footer/>
   </>
  )
}

export default ParternsWithUs
