import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import DashboardPage from '@/pages/DashboardPage'
import InventoryPage from '@/pages/InventoryPage'
import NotFoundPage from '@/pages/NotFoundPage'
import AccessRoutes from './AccessRoutes'
import ProductScannerPage from '@/pages/ProductScannerPage'
import ProfilePage from '@/pages/ProfilePage'
import PrivateLayout from '@/layout/PrivateLayout'
import SalesPage from '@/pages/SalesPage'
import StatsPage from '@/pages/StatsPage'
import ProductPage from '@/pages/ProductPage'

const AppRoutes = () => {
  return (
     <Routes>
      {/* Rutas públicas */}
      <Route element={<AccessRoutes isPrivate={false} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Rutas privadas sin layout */}
      <Route element={<AccessRoutes isPrivate={true} />}>
        <Route path="productscanner" element={<ProductScannerPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/barcode/:barcode" element={<ProductPage />} />
        <Route path="/products/id/:id" element={<ProductPage />} />

      </Route>

      {/* Rutas protegidas */}
      <Route element={<AccessRoutes isPrivate={true} />}>
        <Route element={<PrivateLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="home" element={<DashboardPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={"/404"} replace />} />
    </Routes>
  )
}

export default AppRoutes