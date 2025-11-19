import { Outlet } from "react-router-dom";
import { UserContext } from "../../../context/Context";
import { useContext } from "react";
import Header from "./Header";

const UserLayout = () => {
  
  // const location = navigator.geolocation.getCurrentPosition(success);
  // const locApi = process.env.REACT_APP_LOCATION_API;

  // function success(position){
  //   const location_url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${locApi}`;
  //   axios.get(location_url).then(response => {
  //     const components = response.data.results[0].address_components;
  //     const city = components.find(c => c.types.includes("administrative_area_level_2"));
  //     if(city){
  //     setuserData(city.long_name);
  //     }
  //   })
  //   .catch(error => {
  //     console.error("error :",error);
  //   });
  // }
  return (
    <>
      <div>
        
        <Header />
        <Outlet />
        
      </div>
    </>
  );
};

export default UserLayout;
