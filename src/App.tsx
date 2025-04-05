import { Routes, Route } from 'react-router-dom'
import '@/App.css'
import PrivateRoute from '@/utils/PrivateRoute'
import PrivateLayout from '@/layout/PrivateLayout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
// import Home from './pages/Home'
import DashboardPage from '@/pages/DashboardPage'

function App() {
  const isAuthenticated = true // Cuando tengamos la lógica de autenticación cambiamos esto
  
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas protegidas */}
      <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route element={<PrivateLayout contentPadding="0" />}>
          <Route index element={<DashboardPage />} />
          <Route path="home" element={<DashboardPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
