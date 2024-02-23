import './styles/App.css'
import './styles/DataSection.css'
import './components/AsideBar'
import { PathProvider } from './context/PathProvider'
import MainApp from './components/MainApp'
import { DataProvider } from './context/DataProvider'
import { RefProvider } from './context/RefProvider'
import { DownloadProvider } from './context/DownloadProvider'

function App() {
  return (
    <PathProvider>
      <DataProvider>
        <RefProvider>
          <DownloadProvider> 
            <MainApp/>
          </DownloadProvider>
        </RefProvider>
      </DataProvider>
    </PathProvider>
  )
}
export default App
