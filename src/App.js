import { BrowserRouter, Routes, Route } from "react-router-dom";
import GeneralLayout from "./components/general/GeneralLayout";
import AdminLayout from "./components/admin/AdminLayout";
import UserLayout from "./components/user/UserLayout";
import RestaurantLayout from "./components/restaurants/RestaurantLayout";
import NoPage from "./components/error/NoPage";
import AdminHome from "./components/admin/AdminHome";
import AdminLogin from "./components/admin/AdminLogin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routing for General Panel */}
        <Route path="/" element={<GeneralLayout />}>
        </Route>

        {/* Routing for Admin Panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="login" element={<AdminLogin />} />
        </Route>

        {/* Routing for User Panel */}
        <Route path="/user" element={<UserLayout />}>
        </Route>
        

        {/* Routing for Restaurant Panel */}
        <Route path="/restaurant" element={<RestaurantLayout />}>
        </Route>

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App