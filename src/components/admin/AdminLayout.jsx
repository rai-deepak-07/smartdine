import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
      <h2>Admin Layout</h2>
      {/* Header Start */}
      <header>
        <h1>Admin Header</h1>
      </header>
      {/* Header End */}

      {/* Main Content Start */}
      <Outlet/>
      {/* Main Content End */}

      {/* Footer Start */}
      <footer>
        <p>© 2023 SmartDine. All rights reserved.</p>
      </footer>
      {/* Footer End */}
    
    
    </div>
  )
}

export default AdminLayout
