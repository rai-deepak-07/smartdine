import  { useState, useEffect } from 'react'
import { MainContext } from './Context';
import ApiService from '../apiservice/ApiService';

const MainState = (props) => {

  const [mainData, setMainData] = useState('Deepak')
  const [locations, setLocations] = useState([])

  const getLocations = async () => {
    try {
      const response = await ApiService.get('states-cities/')
      setLocations(response.data)
    } catch (error) {
      console.error('Error fetching locations:', error)
    }
  }

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <MainContext.Provider value={{ mainData, setMainData, locations }}>
      {props.children}
    </MainContext.Provider>
  )
}

export default MainState
