import React, { useState } from 'react'
import {AdminContext} from './Context';

const AdminState = (props) => {

  const [adminData, setAdminData] = useState(null)

  return (
    <AdminContext.Provider value={{ adminData, setAdminData }}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminState;
