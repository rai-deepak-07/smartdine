import  { useState } from 'react'
import { MainContext } from './Context';

const MainState = (props) => {

  const [mainData, setMainData] = useState('Deepak')

  return (
    <MainContext.Provider value={{ mainData, setMainData }}>
      {props.children}
    </MainContext.Provider>
  )
}

export default MainState
