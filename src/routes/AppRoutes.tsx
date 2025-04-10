import { Routes, Route } from 'react-router-dom'
import PrivateLayout from '@/layout/PrivateLayout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import DashboardPage from '@/pages/DashboardPage'
import InventoryPage from '@/pages/InventoryPage'
import NotFoundPage from '@/pages/NotFoundPage'
import AccessRoutes from './AccessRoutes'
import ProductScannerPage from '@/pages/ProductScannerPage'
import AddProductPage from '@/pages/AddProductPage'

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
        <Route path="/addproduct" element={<AddProductPage />} />
        <Route path="/addproduct/:barcode" element={<AddProductPage />} />
      </Route>

      {/* Rutas protegidas */}
      <Route element={<AccessRoutes isPrivate={true} />}>
        <Route element={<PrivateLayout contentPadding="0" />}>
          <Route index element={<DashboardPage />} />
          <Route path="home" element={<DashboardPage />} />
          <Route path="inventory" element={<InventoryPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  )
}

export default AppRoutes