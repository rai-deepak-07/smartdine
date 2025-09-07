import React, { useContext, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
// import LoadingBar from 'react-top-loading-bar'


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
  }, [LoadingProgress]);
  return (
    <>
      {/* Header Section */}
      <Header />
      {/* Main Content Section */}
      <Outlet />
      
    {/* <div style={{ position: 'relative', width: '100%', height: '5vh' }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '7rem',
          fontWeight: 'bold',
          color: 'rgba(0, 0, 0, 0.1)',
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          // fontFamily: 'monospace',
          letterSpacing: '0.4em',
        }}>
          SMARTDINE
        </div>
      </div> */}

      {/* Footer Section */}
      <Footer />
    </>
  )
}

export default GeneralLayout
