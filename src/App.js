import { BrowserRouter, Routes, Route } from "react-router-dom";

import RestaurantState from "./context/RestaurantState";
import UserState from "./context/UserState";
import MainState from "./context/MainState";
import AdminState from "./context/AdminState";

import GeneralLayout from "./components/general/layout/GeneralLayout";
import AdminLayout from "./components/admin/AdminLayout";
import UserLayout from "./components/user/layout/UserLayout";
import RestaurantLayout from "./components/restaurants/layout/RestaurantLayout";
import NoPage from "./components/error/NoPage";

import AdminLogin from "./components/admin/AdminLogin";
import UserLogin from "./components/user/UserLogin";
import UserRegister from "./components/user/UserRegister";
import RestaurantLogin from "./components/restaurants/RestaurantLogin";
import RestaurantRegister from "./components/restaurants/RestaurantRegister";
import Dashboard from "./components/restaurants/layout/Dashboard";
import LoadingBar from 'react-top-loading-bar'
import { Toaster } from "react-hot-toast";


import { use, useContext } from "react";
import { MyStateContext } from "./context/Context";
import { useEffect } from "react";
import Home from "./components/general/home/Home";
import RestaurantProtected from "./components/restaurants/RestaurantProtected";
import UserProtected from "./components/user/UserProtected";

const App = () => {

  const { progress } = useContext(MyStateContext);

  return (
    <BrowserRouter basename="/smartdine">

      <LoadingBar color='#E2293F' height="3px" loaderSpeed="1000" shadow={true} progress={progress} />
      <Toaster position="top-center" reverseOrder={false} />
      
      <MainState>
        <RestaurantState>
          <UserState>
            <Routes>

              {/* General layout Routes */}
              <Route path="/" element={<GeneralLayout />}>
                <Route index element={<Home />} />
              </Route>

              {/* Restaurant routes */}
              <Route path="restaurant-login" element={<RestaurantLogin />} />
              <Route path="restaurant-register" element={<RestaurantRegister />} />

              <Route element={<RestaurantProtected />}>
                <Route path="restaurant" element={<RestaurantLayout />}>
                  <Route index element={<Dashboard />} />
                  {/* ... other valid restaurant routes */}
                </Route>
              </Route>


              {/* User Pannel Routes*/}
              <Route path="user-login" element={<UserLogin />} />
              <Route path="user-register" element={<UserRegister />} />
              <Route element={<UserProtected />}>
                <Route path="user" element={<UserLayout />} >
                </Route>
              </Route>

              {/* Fallback */}
              <Route path="*" element={<NoPage />} />
            </Routes>
          </UserState>
        </RestaurantState>
      </MainState>

      {/* Wrap admin routes in Admin context */}
      {/* <AdminState>
        <Routes>
          <Route path="admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />} >
          
          </Route>
        </Routes>
      </AdminState> */}

    </BrowserRouter>
  );
};

export default App;
