import React from 'react'
import { MainContext } from '../../../context/Context'
import { useContext } from 'react';

const Home = () => {
    const { mainData } = useContext(MainContext);
    return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Main Data: {mainData}</p>
    </div>
  )
}

export default Home
