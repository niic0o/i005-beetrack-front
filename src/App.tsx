import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppRoutes from './routes/AppRoutes'
import '@/App.css'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
        <AppRoutes />
    </QueryClientProvider>
  )
}

export default App
