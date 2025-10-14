import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { ResturantContext } from "../../context/Context";

const RestaurantProtected = () => {
  const { isLoggedIn } = useContext(ResturantContext);

  if (!isLoggedIn) {
    return <Navigate to="/restaurant-login" replace />;
  }
  return <Outlet />;
};

export default RestaurantProtected;
