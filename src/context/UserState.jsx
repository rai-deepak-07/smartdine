import { useState } from 'react'
import { UserContext } from './Context';

const UserState = (props) => {

  const access_token = localStorage.getItem("user_access_token");
  // const status = access_token ? true : false;
  const status = true;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(status);
  const [userData, setUserData] = useState("");
  
  return (
    <UserContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn, userData, setUserData }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
