import React, { useState } from 'react'
import {AdminContext} from './Context';

const AdminState = (props) => {

   const access_token = localStorage.getItem("admin_access_token");
    const status = access_token? true : false;
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(status);

  const [adminData, setAdminData] = useState("");

  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, setIsAdminLoggedIn, adminData, setAdminData }}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminState;
