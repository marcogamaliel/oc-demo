import './App.scss'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppRoutes } from './routes.app'
import { RecoilRoot } from 'recoil'

const queryClient  = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <AppRoutes />
        </RecoilRoot>
      </QueryClientProvider>
    </div>
  )
}

export default App
