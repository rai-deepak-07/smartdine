import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { ResturantContext } from '../../../context/Context'
import { useContext, useEffect } from 'react';

const RestaurantLayout = () => {
  const { isRestaurantLoggedIn, setIsRestaurantLoggedIn, resturantData, setResturantData } = useContext(ResturantContext);

  const navigate = useNavigate();
  const location = useLocation();

  // Function for handling restaurant logout
  const handelLogOut = () => {
        localStorage.removeItem("restaurant_access_token")
        localStorage.removeItem("restaurant_refresh_token")
        localStorage.removeItem("restaurant_res_reg_id")
        let logOut = setInterval(() => {
            setIsRestaurantLoggedIn(false)
            navigate('/restaurant-login')
            return clearInterval(logOut)
        }, 1500);
  }

  useEffect(() => {
    if (!isRestaurantLoggedIn) {
      alert(isRestaurantLoggedIn);
      navigate('/restaurant-login' , { state: { from: location } });
    }
    return () => {   
    };
  }, []);

  return (
    isRestaurantLoggedIn && (
      <div>
        <h2>Restaurant Layout</h2>
        <Outlet />

        <button onClick={handelLogOut}>Logout</button>
      </div>
    )
  )
}

export default RestaurantLayout
