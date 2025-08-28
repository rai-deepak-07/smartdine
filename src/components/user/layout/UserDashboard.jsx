import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../context/Context'
import UserApi from '../../../apiservice/UserApi';
// import axios from 'axios';

const UserDashboard = () => {
  const { location} = useContext(UserContext);

const fetchUserDetails = () => {
  const user_id = localStorage.getItem('user_id');
  UserApi.get(`details/${user_id}/`)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error("There was an error fetching the user data!", error);
  });
};


  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div>
        <h1>User Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        <p>Your location: {location}</p>
    </div>
  )
}

export default UserDashboard
