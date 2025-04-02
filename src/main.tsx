import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from '@/components/ui/provider.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage.tsx'
import InventoryPage from './pages/InventoryPage.tsx'
// import PrivateRoutes from './routes/PrivateRoutes.jsx'  No lo estoy usando por que sino me lleva a /login

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Aqui va el PrivateRoutes
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: 'inventario',
        element: <InventoryPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
