import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from '@/components/ui/provider.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage.tsx'
import InventoryPage from './pages/InventoryPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: 'inventario',
        element: <InventoryPage />
      },
      // Aquí más rutas privadas
      
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            element: <div>Login Page</div>
          },
          {
            path: 'register',
            element: <div>Register Page</div>
          }
        ]
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
