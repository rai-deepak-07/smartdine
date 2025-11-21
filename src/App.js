import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

import RestaurantState from "./context/RestaurantState";
import UserState from "./context/UserState";
import MainState from "./context/MainState";
// import AdminState from "./context/AdminState";

import GeneralLayout from "./components/general/layout/GeneralLayout";
// import AdminLayout from "./components/admin/AdminLayout";
import UserLayout from "./components/user/layout/UserLayout";
import RestaurantLayout from "./components/restaurants/layout/RestaurantLayout";
import NoPage from "./components/error/NoPage";

// import AdminLogin from "./components/admin/AdminLogin";
import UserLogin from "./components/user/UserLogin";
import UserRegister from "./components/user/UserRegister";
import RestaurantLogin from "./components/restaurants/RestaurantLogin";
import RestaurantRegister from "./components/restaurants/RestaurantRegister";
import UserDashboard from "./components/user/layout/UserDashboard";
import LoadingBar from "react-top-loading-bar";
import Top from "./components/master/Top";

import { Toaster } from "react-hot-toast";

import { useContext } from "react";
import { MyStateContext } from "./context/Context";
import Main from "./components/general/Main";
import UserProtected from "./components/user/UserProtected";

import ForgetPassword from "./components/master/ForgetPassword";
import ResetPassword from "./components/master/ResetPassword";
import OtpVerification from "./components/master/OtpVerification";
import ParternsWithUs from "./components/restaurants/partners/ParternsWithUs";
import Upi from "./components/UPI";
import Aos from "aos";
import { useEffect } from "react";

// Restaurant Routes Import
import RestaurantProtected from "./components/restaurants/RestaurantProtected";
import Home from "./components/restaurants/home/Home";
import Dashboard from "./components/restaurants/dashboard/Dashboard";
import OrdersList from "./components/restaurants/orders/OrdersList";
import Menu from "./components/restaurants/menu/Menu";
import Tables from "./components/restaurants/tables/Tables";
import Staff from "./components/restaurants/staff/Staff";
import Bookings from "./components/user/bookings/Bookings";
import AllBooking from "./components/user/bookings/AllBooking";
import Orders from "./components/user/orders/Orders";
import CheckoutOrder from "./components/user/orders/CheckoutOrder";
import RestaurantReg from "./components/restaurants/RestaurantReg";

const App = () => {
  const { progress } = useContext(MyStateContext);
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <BrowserRouter basename="/smartdine">
      <Top />
      <LoadingBar
        color="#E2293F"
        height="3px"
        loaderSpeed="1000"
        shadow={true}
        progress={progress}
      />
      <Toaster position="top-center" reverseOrder={false} />

      <MainState>
        <RestaurantState>
          <UserState>
            <Routes>
              {/* General layout Routes */}
              <Route path="/" element={<GeneralLayout />}>
                <Route index element={<Main />} />

                {/* User Pannel Routes*/}
                <Route path="user-register" element={<UserRegister />} />
                <Route path="user-login" element={<UserLogin />} />

                {/* Restaurant routes */}
                <Route path="restaurant-login" element={<RestaurantLogin />} />
                <Route
                  path="restaurant-register"
                  element={<RestaurantRegister />}
                />
              </Route>

              <Route path="otp-verification" element={<OtpVerification />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="partner-with-us" element={<ParternsWithUs />} />

              <Route
                path="payment"
                element={
                  <Upi
                    upiId="stunningchandankmg3366-1@okicici"
                    name="Chandan Gupta"
                    amount="1.00"
                    note="Payment for Testing"
                  />
                }
              />

              {/* Restaurant Routes */}
              <Route element={<RestaurantProtected />}>
                <Route path="restaurant" element={<RestaurantLayout />}>
                  <Route path="home" element={<Home />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="orders" element={<OrdersList />} />
                  <Route path="menu" element={<Menu />} />
                  <Route path="tables" element={<Tables />} />
                  <Route path="staff" element={<Staff />} />
                </Route>
              </Route>

              <Route element={<UserProtected />}>
                <Route path="user" element={<UserLayout />}>
                  <Route index element={<UserDashboard />} />
                  <Route path="booking" element={<Bookings />} />
                  <Route path="booking-details" element={<AllBooking />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="check-out-order" element={<CheckoutOrder />} />
                </Route>
              </Route>

              {/* Fallback */}
              <Route path="*" element={<RestaurantReg />} />
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
