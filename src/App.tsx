import './App.css'
import { Outlet } from 'react-router-dom'
import PrivateLayout from '@/components/layout/PrivateLayout'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation();
  const isAuthRoute = location.pathname.includes('/auth');

  return isAuthRoute ? <Outlet /> : <PrivateLayout><Outlet /></PrivateLayout>;
}

export default App
