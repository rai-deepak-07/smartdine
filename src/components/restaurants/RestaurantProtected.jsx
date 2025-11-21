import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { RestaurantContext } from "../../context/Context";

const RestaurantProtected = () => {
  const { isLoggedIn } = useContext(RestaurantContext);

  if (!isLoggedIn) {
    return <Navigate to="/restaurant-login" replace />;
  }
  return <Outlet />;
};

export default RestaurantProtected;
