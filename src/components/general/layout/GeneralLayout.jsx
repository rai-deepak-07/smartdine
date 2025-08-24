import React, { useContext, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

import { MyStateContext } from '../../../context/Context'

const GeneralLayout = () => {
  const {LoadingProgress} = useContext(MyStateContext);

  useEffect(() => {
    LoadingProgress(10);
    LoadingProgress(30);
    LoadingProgress(60);
    LoadingProgress(100);
    return () => {
      LoadingProgress(0);
    };
  }, []);
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
