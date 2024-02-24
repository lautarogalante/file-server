import './styles/App.css'
import './styles/DataSection.css'
import './components/AsideBar'
import { PathProvider } from './context/PathProvider'
import MainApp from './components/MainApp'
import { DataProvider } from './context/DataProvider'
import { EventProvider } from './context/EventProvider'
import { DownloadProvider } from './context/DownloadProvider'

function App() {
  return (
    <PathProvider>
      <DataProvider>
        <EventProvider>
          <DownloadProvider> 
            <MainApp/>
          </DownloadProvider>
        </EventProvider>
      </DataProvider>
    </PathProvider>
  )
}
export default App
