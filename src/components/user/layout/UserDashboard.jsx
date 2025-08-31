import  { useContext } from 'react'
import { UserContext } from '../../../context/Context'

const UserDashboard = () => {
const { location, userData, localRestaurantData } = useContext(UserContext);

  return (
    <div>
        <h1>User Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        {userData && (
          <div>
            <h2>Your Details:</h2>
            <p>Name: {userData.user_name}</p>
            <p>Email: {userData.user_email}</p>
            <p>Phone: {userData.user_mobile_no}</p>
          </div>
        )}
        <p>Your location: {location}</p>

<h1>
        Nearby Restaurants:

</h1>

        {localRestaurantData && localRestaurantData.length > 0 ? (
          <ul>
            {localRestaurantData.map((restaurant) => (
              <li key={restaurant.id}>
                {restaurant.res_name} - {restaurant.city}
              </li>
            ))}
          </ul>
        ) : (
          <p>No nearby restaurants found.</p>
        )}
    </div>
  )
}

export default UserDashboard
