import { Routes, Route } from 'react-router-dom'
import PrivateLayout from '@/layout/PrivateLayout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import DashboardPage from '@/pages/DashboardPage'
import InventoryPage from '@/pages/InventoryPage'
import PrivateRoutes from './PrivateRoutes'

const AppRoutes = () => {
  return (
     <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas protegidas */}
      <Route element={<PrivateRoutes />}>
        <Route element={<PrivateLayout contentPadding="0" />}>
          <Route index element={<DashboardPage />} />
          <Route path="home" element={<DashboardPage />} />
          <Route path="inventario" element={<InventoryPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes