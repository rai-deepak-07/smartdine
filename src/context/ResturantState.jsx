import React, { useState } from 'react'
import {ResturantContext} from './Context';

const ResturantState = (props) => {

  const access_token = localStorage.getItem("restaurant_access_token");
  const status = access_token? true : false;
  const [isRestaurantLoggedIn, setIsRestaurantLoggedIn] = useState(status);

  const [resturantData, setResturantData] = useState("");

  return (
    <ResturantContext.Provider value={{ isRestaurantLoggedIn, setIsRestaurantLoggedIn, resturantData, setResturantData }}>
      {props.children}
    </ResturantContext.Provider>
  )
}

export default ResturantState
