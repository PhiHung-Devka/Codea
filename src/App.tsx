import { AppInitializer } from './packages/stores/addressVN/use-addressVN.store'
import AppRoutes from './routes/routes'

function App() {

  return (
    <>
      <AppInitializer />
      <AppRoutes />
    </>
  )
}

export default App;