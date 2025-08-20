import { BrowserRouter, Routes, Route } from "react-router-dom";
import GeneralLayout from "./components/general/layout/GeneralLayout";
import AdminLayout from "./components/admin/AdminLayout";
import UserLayout from "./components/user/layout/UserLayout";
import RestaurantLayout from "./components/restaurants/layout/RestaurantLayout";
import NoPage from "./components/error/NoPage";

import AdminHome from "./components/admin/AdminHome";
import AdminLogin from "./components/admin/AdminLogin";

import RestaurantRegister from "./components/restaurants/RestaurantRegister";
import RestaurantLogin from "./components/restaurants/RestaurantLogin";

import UserLogin from "./components/user/UserLogin";
import UserRegister from "./components/user/UserRegister";
import Dashboard from "./components/restaurants/layout/Dashboard";

const App = () => {
  return (
    <BrowserRouter basename="/smartdine">
      <Routes>
        {/* Routing for General Panel */}
        <Route path="/" element={<GeneralLayout />}>
        </Route>

        {/* Routing for Admin Panel */}
        <Route path="admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
        </Route>

        {/* Routing for User Panel */}
        <Route path="user-login" element={<UserLogin />} />
        <Route path="user-register" element={<UserRegister />} />
        <Route path="/user" element={<UserLayout />}>
        </Route>
        

        {/* Routing for Restaurant Panel */}
        <Route path="restaurant-login" element={<RestaurantLogin />} />
        <Route path="restaurant-register" element={<RestaurantRegister />} />
        <Route path="/restaurant" element={<RestaurantLayout />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App