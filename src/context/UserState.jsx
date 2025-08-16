import React, { useState } from 'react'
import {UserContext} from './Context'; 

const UserState = (props) => {

    const [userData, setUserData] = useState(null)

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
        {props.children}
    </UserContext.Provider>
  )
}

export default UserState
