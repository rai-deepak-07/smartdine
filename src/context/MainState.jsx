import React, { useState } from 'react'
import {MainContext} from './Context';

const MainState = (props) => {

  const [mainData, setMainData] = useState(null)

  return (
    <MainContext.Provider value={{ mainData, setMainData }}>
      {props.children}
    </MainContext.Provider>
  )
}

export default MainState
