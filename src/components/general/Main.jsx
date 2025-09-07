import React from 'react'
import Home from './home/Home'
import AppFeaturesSection from './features/AppFeaturesSection'

const Main = () => {
  return (
    <>
      <Home/>
      <div className='container-fluid py-5'>
        <AppFeaturesSection/> 
      </div>
    </>
  )
}

export default Main
