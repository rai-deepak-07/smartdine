import React, { useState } from 'react'
import { MyStateContext } from './Context';


const MyStates = (props) => {

    // Top Loading State and State Manage via Fuction
    const h = "deepak" 
    const [progress, setProgress] = useState(0);
    const LoadingProgress = (value) => {
        setProgress(value)
    }


    return (
        <MyStateContext.Provider value={{ progress, LoadingProgress, h}}>
            {props.children}
        </MyStateContext.Provider>
    )
}

export default MyStates;
