import AppRoutes from './routes/AppRoutes'
import '@/App.css'
import PrivateRoute from '@/utils/PrivateRoute'
import PrivateLayout from '@/layout/PrivateLayout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
// import Home from './pages/Home'
import DashboardPage from '@/pages/DashboardPage'
import InventoryPage from '@/pages/InventoryPage'

function App() {
  
  return (
    <AppRoutes />
  )
}

export default App
