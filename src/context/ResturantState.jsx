import React, { useState } from 'react'
import {ResturantContext} from './Context';

const ResturantState = (props) => {

  const [resturantData, setResturantData] = useState(null)

  return (
    <ResturantContext.Provider value={{ resturantData, setResturantData }}>
      {props.children}
    </ResturantContext.Provider>
  )
}

export default ResturantState
