import { useContext } from 'react';
import { ResturantContext } from '../../../context/Context';
const Dashboard = () => {

  const {restaurantData} = useContext(ResturantContext);
  
  return (
    <div>
        <h1>Restaurant Dashboard</h1>
        {restaurantData && (
          <div>
            <h2>Restaurant: {restaurantData.res_name}</h2>
            <p>Location: {restaurantData.city}</p>
          </div>
        )}
        <p>Manage your restaurant settings and view analytics here.</p>
    </div>
  )
}

export default Dashboard
