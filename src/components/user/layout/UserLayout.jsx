import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/Context'
import { useContext, useEffect } from 'react';
import axios from 'axios';

const UserLayout = () => {
  const { logout, userData, setuserData } = useContext(UserContext);

  const location = navigator.geolocation.getCurrentPosition(success);
  
  function success(position){
    const location_url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyCb1KdgCcM82qyDXQPND2Mj9FhQVXRoI7Q`
    axios.get(location_url).then(response => {
      const components = response.data.results[0].address_components;
      const city = components.find(c => c.types.includes("administrative_area_level_2"));
      if(city){
      setuserData(city.long_name);
      }
    })
    .catch(error => {
      console.error("error :",error);
    });
  }
  return (
    <>
      <div>
        <h2>User Layout</h2>
        <h2>{userData}</h2>
        <Outlet />
        <button onClick={logout}>Logout</button>
      </div>
    </>
  )
}

export default UserLayout
