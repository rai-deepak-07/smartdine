import  { useState } from 'react'
import { MainContext } from './Context';
import ApiService from '../apiservice/ApiService';
import { useEffect } from 'react';

const MainState = (props) => {

  const [mainData, setMainData] = useState('Deepak')
  const [locations, setLocations] = useState([])

  const getLocations = async () => {
    console.log(locations);
    
    try {
      const response = await ApiService.get('states-cities/')
      setLocations(response.data)
    } catch (error) {
      console.error('Error fetching locations:', error)
    }
  }

  // useEffect(() => {
  //   getLocations();
  // }, []);

  return (
    <MainContext.Provider value={{ mainData, setMainData, locations, getLocations }}>
      {props.children}
    </MainContext.Provider>
  )
}

export default MainState
