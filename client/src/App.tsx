import './styles/App.css'
import './styles/DataSection.css'
import './components/AsideBar'
import { PathProvider } from './components/context/PathProvider'
import MainApp from './components/MainApp'
import { DataProvider } from './components/context/DataProvider'
import { RefProvider } from './components/context/RefProvider'

function App() {
  return (
    <PathProvider>
      <DataProvider>
        <RefProvider>
          <MainApp/>
        </RefProvider>
      </DataProvider>
    </PathProvider>
  )
}
export default App
